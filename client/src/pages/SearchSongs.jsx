import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row, Modal } from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_SONG } from '../graphql/mutations';
import { GET_ME } from '../graphql/queries';

const SearchSongs = () => {
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedSongIds, setSavedSongIds] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [saveSong] = useMutation(SAVE_SONG);
  const [getUserData] = useLazyQuery(GET_ME, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const savedIds = data.me.savedSongs.map((song) => song.songId);
      setSavedSongIds(savedIds);
    },
    onError: (error) => {
      console.error('Error fetching saved songs:', error);
    },
  });

  // Fetch saved songs on component mount if the user is logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      getUserData();
    }
  }, [getUserData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput.trim()) {
      setModalContent('Please enter a song or artist name.');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchInput)}&entity=song&limit=25`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        setModalContent('No results found.');
        setShowModal(true);
        return;
      }

      const uniqueResults = new Map();
      data.results.forEach((result) => {
        const uniqueKey = `${result.trackName}-${result.artistName}-${result.collectionName}`.toLowerCase();
        if (!uniqueResults.has(uniqueKey)) {
          uniqueResults.set(uniqueKey, {
            songId: uniqueKey,
            trackName: result.trackName,
            artistName: result.artistName,
            albumName: result.collectionName,
            coverImage: result.artworkUrl100, // Use iTunes album cover
          });
        }
      });

      setSearchedSongs(Array.from(uniqueResults.values()));
    } catch (error) {
      console.error('Error fetching songs:', error);
      setModalContent('An error occurred while searching for songs.');
      setShowModal(true);
    }
  };

  const handleSaveSong = async (song) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      setModalContent('You need to log in to save a song.');
      setShowModal(true);
      return;
    }

    let lyrics = 'Lyrics not available.';
    try {
      const lyricsResponse = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(song.artistName)}/${encodeURIComponent(song.trackName)}`
      );
      if (lyricsResponse.ok) {
        const lyricsData = await lyricsResponse.json();
        lyrics = lyricsData.lyrics || lyrics;
      }
    } catch (error) {
      console.error('Error fetching lyrics:', error);
    }

    try {
      await saveSong({
        variables: {
          songId: song.songId,
          title: song.trackName,
          artist: song.artistName,
          album: song.albumName || 'Unknown Album',
          coverImage: song.coverImage || '', // Default empty string if no cover image
          lyrics,
        },
      });

      setSavedSongIds((prev) => [...prev, song.songId]);
      setModalContent(`"${song.trackName}" has been saved to your playlist!`);
      setShowModal(true);
    } catch (error) {
      console.error('Error saving song:', error);
      setModalContent('An error occurred while saving the song.');
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Songs!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a song or artist"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedSongs.length ? `Viewing ${searchedSongs.length} result(s):` : 'Search for a song to begin'}
        </h2>
        <Row>
          {searchedSongs.map((song) => (
            <Col md="4" key={song.songId}>
              <Card border="dark" className="mb-4">
                {song.coverImage && (
                  <Card.Img variant="top" src={song.coverImage} alt={`${song.trackName} cover`} />
                )}
                <Card.Body>
                  <Card.Title>{song.trackName}</Card.Title>
                  <p className="small">Artist: {song.artistName}</p>
                  <p className="small">Album: {song.albumName || 'Unknown Album'}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedSongIds.includes(song.songId)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveSong(song)}
                    >
                      {savedSongIds.includes(song.songId) ? 'This song is saved!' : 'Save this Song!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchSongs;