import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database paths
let DB_PATH;
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

if (process.env.NODE_ENV === 'production') {
  // Production: Use persistent disk mount path
  const DISK_PATH = '/opt/render/project/src/server/db';
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(DISK_PATH)) {
    console.log(`Creating disk directory: ${DISK_PATH}`);
    fs.mkdirSync(DISK_PATH, { recursive: true });
  }
  
  DB_PATH = path.join(DISK_PATH, 'recipes.db');
  console.log(`🌐 Production mode - Using persistent disk: ${DB_PATH}`);
} else {
  // Development: Use local directory
  DB_PATH = path.join(__dirname, 'recipes.db');
  console.log(`💻 Development mode - Using local path: ${DB_PATH}`);
}

let db = null;

/**
 * Initialize the SQLite database
 */
function initDatabase() {
  try {
    // Create database connection
    db = new Database(DB_PATH, { verbose: console.log });
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Read and execute schema
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    
    console.log('✅ Database initialized successfully');
    console.log(`📁 Database location: ${DB_PATH}`);
    
    return db;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Get database instance
 */
function getDatabase() {
  if (!db) {
    db = initDatabase();
  }
  return db;
}

/**
 * Close database connection
 */
function closeDatabase() {
  if (db) {
    db.close();
    db = null;
    console.log('🔒 Database connection closed');
  }
}

export {
  initDatabase,
  getDatabase,
  closeDatabase
};

