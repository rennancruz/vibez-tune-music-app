const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const songSeeds = require('./songSeeds.json');

db.once('open', async () => {
  try {
    console.log('Starting database cleanup...');
    // Clean the User collection
    await User.deleteMany({});
    console.log('User collection cleared.');

    // Seed users
    console.log('Seeding users...');
    const users = await User.create(userSeeds);
    console.log('Users seeded successfully.');

    // Seed songs for users
    console.log('Seeding songs...');
    for (const songSeed of songSeeds) {
      const { username, songs } = songSeed;

      const user = await User.findOne({ username });
      if (!user) {
        throw new Error(`User "${username}" not found. Check your songSeeds.json.`);
      }

      await User.findByIdAndUpdate(
        user._id,
        {
          $addToSet: { savedSongs: songs },
        },
        { new: true, runValidators: true }
      );
    }
    console.log('Songs seeded successfully.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});