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
  await Trip.insertMany(tripData);
  await Destination.insertMany(destinationData);

  console.log('Database seeded!');
  process.exit(0);
});
