# Vibez-Tune-Music-App

## Description

The **Vibez Tune Music App** is a web application designed for music enthusiasts to search for songs and artists, explore music details, and create personalized playlists.

The app integrates with the iTunes API to fetch song data and allows users to add their favorite tracks to a playlist, manage the playlist by removing or clearing songs, and persist their selections across sessions using local storage.

Additionally, the Lyrics.ovh API provides access to song lyrics, enabling users to retrieve lyrics for specific tracks by artist and song title. This integration enhances the user experience by allowing them to view and sing along to their favorite songs.

The application features a dark, modern, and responsive UI built with Tailwind CSS and Font Awesome.

## Technologies Used

- **HTML5**: Structure of the web application.
- **CSS3 with Tailwind CSS**: Styling for a dark, modern, and responsive user interface.
- **JavaScript**: Functionality for searching, managing playlists, and interacting with the API.
- **iTunes Search API**: Fetching song and artist data.
- **Lyrics.ovh API**: Fetching lyrics data.
- **Font Awesome**: Icons used throughout the application.
- **Local Storage**: Storing playlist data to persist user selections.
- **React**: Front-end framework for building the user interface.
- **GraphQL**: For querying and mutating data.
- **Node.js and Express.js**: Server-side framework for handling requests.
- **MongoDB with Mongoose**: Database for storing user data and playlists.
- **JWT**: For user authentication and securing API endpoints.

## Features

- **Music Search**: Users can search for songs or artists using the iTunes API.
- **Dynamic Results Display**: Search results are dynamically displayed with album information for easy readability.
- **Add to Playlist**: Users can add songs to their personalized playlist with a single click.
- **View Lyrics**: Users can view a song's lyrics.
- **View Video**: Users can view a song's music video.
- **Manage Playlist**: Users can remove individual songs or clear the entire playlist with dedicated buttons.
- **Persistent Data**: Playlists are saved using local storage, allowing users to maintain their playlists across sessions.
- **Responsive Design**: Fully responsive layout that adapts to different devices and screen sizes.
- **User Authentication**: Secure user authentication using JWT to save playlists across devices.

## Usage

### Search for Music:

1. Enter a song name or artist in the search bar and click the Search button.
2. View the search results dynamically displayed below the search bar.

### Add Songs to Playlist:

1. Click the Add to Playlist button next to any song to add it to your personalized playlist.

### Manage Your Playlist:

1. Navigate to the Playlist page to view all your saved songs.
2. Use the Lyrics button next to any song to view the song's lyrics.
3. Use the Video button next to any song to view the song's music video.
4. Use the Remove button next to any song to remove it from the playlist.
5. Use the Clear Playlist button to remove all songs from your playlist.

## Roadmap

- **Integrate Additional API**: Implement a new API to enhance the application's functionality. Potential integrations could include:
  - **Music Metadata API**: Provide users with in-depth information about tracks, albums, and artists, such as release dates, genres, and chart positions.
  - **Related Songs or Artist API**: Suggest similar songs or artists to users based on their current selections to improve music discovery.
- **Add Interactive Modals**: Display additional information such as artist bios or related songs using modals.
- **User Authentication**: Implement user authentication to allow users to save playlists across devices.
- **Advanced Search Filters**: Provide filters for genre, release date, and popularity.

## Acknowledgments

- iTunes Search API and Lyrics.ovh API for providing music data.
- Tailwind CSS and Font Awesome for the UI design and icons.

## License

This project is licensed under the MIT License.

---

This README now includes all the required elements, such as a unique name, description, technologies used, features, usage instructions, roadmap, acknowledgments, and a license section. Make sure to replace the placeholder link with the actual URL to your deployed application.
