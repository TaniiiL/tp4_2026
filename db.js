import pkg from 'pg';
import dbconfig from './dbconfig.js';

const { Pool } = pkg;

export const pool = new Pool(dbconfig);