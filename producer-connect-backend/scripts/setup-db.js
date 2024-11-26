const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function setupDatabase() {
  // First, connect to default postgres database
  const postgresPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    console.log('Checking if database exists...');
    
    // Check if database exists
    const dbCheckResult = await postgresPool.query(
      "SELECT FROM pg_database WHERE datname = 'producer_connect'"
    );

    if (dbCheckResult.rowCount === 0) {
      console.log('Creating database...');
      await postgresPool.query('CREATE DATABASE producer_connect');
      console.log('Database created successfully');
    } else {
      console.log('Database already exists');
    }

    // Close postgres connection
    await postgresPool.end();

    // Connect to the producer_connect database
    const appPool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: 'producer_connect',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    console.log('Creating schema...');
    
    // Read schema file
    const schemaPath = path.join(__dirname, '../schema.sql');
    console.log('Reading schema from:', schemaPath);
    
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim().length > 0);

    // Execute each statement separately
    for (let statement of statements) {
      await appPool.query(statement + ';');
    }

    console.log('Schema created successfully');
    await appPool.end();
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      where: error.where
    });
    
    if (error.code === '28P01') {
      console.error('\nAuthentication failed. Please check:');
      console.error('1. Your .env file has correct DB_USER and DB_PASSWORD');
      console.error('2. The PostgreSQL user exists and has correct permissions');
      console.error('\nYou can create the user with these commands:');
      console.error('sudo -u postgres psql');
      console.error("CREATE USER producer_user WITH PASSWORD 'producer_password';");
      console.error('ALTER USER producer_user WITH CREATEDB;');
    }
    
    process.exit(1);
  }
}

setupDatabase();
