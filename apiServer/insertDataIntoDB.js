import pkg from 'pg';
const { Client } = pkg;
import { GetListEquipmentTypesMOCK, GetListActivityMOCK, GetEquipmentListByTypeMOCK, GetParametersForOperationsMOCK, GetListNonGMPActivityMOCK } from './apiMocks.js';


// Function to connect to the PostgreSQL database and create tables if they don't exist
async function connectToDatabase() {
    const client = new Client({
      user: "dverves",
      host: "localhost",
      database: "br_generator",
      password: "123",
      port: 5432
    });
  
    try {
      await client.connect(); // Connect to the database
      console.log('Connected to the database');
  
      // Create tables if they don't exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS parameters (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS activities (
          id SERIAL PRIMARY KEY,
          equipment VARCHAR(255) NOT NULL,
          operation_type VARCHAR(255) NOT NULL,
          content TEXT
        )
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS equipment (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          code VARCHAR(255) NOT NULL,
          description TEXT
        )
      `);
  
      return client;
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      throw error;
    }
  }
  

// Function to insert parameters into the database
async function insertParameters(parameters) {
  const client = await connectToDatabase(); // Connect to the database
  try {
    await client.query('BEGIN'); // Start a transaction

    // Insert each parameter into the database
    for (const parameter of parameters) {
      await client.query('INSERT INTO parameters (name) VALUES ($1)', [parameter]);
    }

    await client.query('COMMIT'); // Commit the transaction
    console.log('Parameters inserted into the database');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction if an error occurs
    console.error('Error inserting parameters into the database:', error.message);
    throw error;
  } finally {
    await client.end(); // Close the database connection
  }
}

// Function to insert activities into the database
async function insertActivities(activities) {
  const client = await connectToDatabase(); // Connect to the database
  try {
    await client.query('BEGIN'); // Start a transaction

    // Insert each activity into the database
    for (const activity of activities) {
      await client.query('INSERT INTO activities (equipment, operation_type, content) VALUES ($1, $2, $3)', [activity.Equipment, activity.OperationType, activity.Content]);
    }

    await client.query('COMMIT'); // Commit the transaction
    console.log('Activities inserted into the database');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction if an error occurs
    console.error('Error inserting activities into the database:', error.message);
    throw error;
  } finally {
    await client.end(); // Close the database connection
  }
}

// Function to insert equipment into the database
async function insertEquipment(equipment) {
  const client = await connectToDatabase(); // Connect to the database
  try {
    await client.query('BEGIN'); // Start a transaction

    // Insert each equipment into the database
    for (const eq of equipment) {
      await client.query('INSERT INTO equipment (name, code, description) VALUES ($1, $2, $3)', [eq.name, eq.code, eq.description]);
    }

    await client.query('COMMIT'); // Commit the transaction
    console.log('Equipment inserted into the database');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction if an error occurs
    console.error('Error inserting equipment into the database:', error.message);
    throw error;
  } finally {
    await client.end(); // Close the database connection
  }
}

// Main function to fetch data from mock functions and insert into database
async function fetchDataAndInsertIntoDB() {
  try {
    const parameters = await GetParametersForOperationsMOCK(); // Fetch parameters from mock function
    await insertParameters(parameters); // Insert parameters into the database

    const activities = await GetListActivityMOCK(); // Fetch activities from mock function
    await insertActivities(activities); // Insert activities into the database

    const equipmentTypes = ['balances', 'reactor', 'd_filter', 'n_filter', 'm_pump', 'p_pump', 'o_pump', 'oven'];
    for (const equipmentType of equipmentTypes) {
      const equipment = await GetEquipmentListByTypeMOCK(equipmentType); // Fetch equipment from mock function for each type
      await insertEquipment(equipment); // Insert equipment into the database
    }
  } catch (error) {
    console.error('Error fetching data and inserting into database:', error.message);
  }
}

// Call the main function to start fetching data and inserting into the database
fetchDataAndInsertIntoDB();
