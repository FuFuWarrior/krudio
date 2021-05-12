import pg from "pg";
const {Pool} = pg;
import dotenv from 'dotenv'
dotenv.config();

let connectionString;
let envVar = process.env.NODE_ENV;

if (envVar.includes('development')) {
    connectionString = process.env.PG_CONNECTION_STRING;
  
  } else {
    connectionString = process.env.PRODUCTION;
  }

const pool = new Pool({
    connectionString
});

pool.on('connect', () => console.log('working'));

/**
 * CREATE TABLE ARTICLE (
 * ARTICLE_ID PRIMARY KEY SERIAL NOT NULL UNIQUE,
 * ARTICLE_TITLE VARCHAR(255),
 * ARTICLE_BODY TEXT NOT NULL,
 * DATE_POSTED TIME DEFAULT TIMESTAMP
 * )
 
 * CREATE TABLE IF NOT EXISTS articles (
    ARTICLE_ID SERIAL PRIMARY KEY NOT NULL UNIQUE,
    ARTICLE_TITLE VARCHAR(255) NOT NULL,
    ARTICLE_BODY TEXT NOT NULL,
    CREATED_BY VARCHAR(255) NOT NULL,
    CREATED_ON TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)
 */

export default pool;