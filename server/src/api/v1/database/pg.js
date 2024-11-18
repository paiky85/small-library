import pg from 'pg';
import { dbConfig } from '../../../config/db.conf.js';

const db = new pg.Pool(dbConfig);

// Attempt to connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the PostgreSQL server.');
});

// Handle errors after the initial connection
db.on('error', err => {
  console.error('Database error:', err.message);

  // Handle connection lost error
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Connection lost. Reconnecting...');
    db.connect();
  } else {
    throw err;
  }
});

// Close the connection
// db.end(err => {
//   if (err) {
//     console.error('Error closing the connection:', err.message);
//     return;
//   }
//   console.log('Connection closed.');
// });

export default db;
