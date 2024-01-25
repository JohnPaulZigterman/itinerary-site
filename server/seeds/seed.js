const db = require('../config/connection');
const { User, Trip, Destination } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const tripData = require('./tripData.json');
const destinationData = require('./destinationData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('Trip', 'trips');
  await cleanDB('Destination', 'destinations');
  
  await User.insertMany(userData);
  //await Trip.insertMany(tripData);
  //await Destination.insertMany(destinationData);

  //TODO: Insert code to update relationships between seed data
  for (let i = 0; i < tripData.length; i++) {
    const { _id, user } = await Trip.create(tripData[i]);
    const updateUser = await User.findOneAndUpdate(
      { username: user },
      {
        $addToSet: {
          trips: _id,
        }
      }
    );
  } 

  for (let i = 0; i < destinationData.length; i++) {
    const { _id, trip } = await Destination.create(destinationData[i]);
    const updateUser = await Trip.findOneAndUpdate(
      { city: trip },
      {
        $addToSet: {
          destinations: _id,
        }
      }
    );
  } 

  console.log('Database seeded!');
  process.exit(0);
});
