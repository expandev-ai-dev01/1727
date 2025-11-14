/**
 * @summary
 * Database connection pool management
 *
 * @module instances/database/pool
 *
 * @description
 * Manages SQL Server connection pool with proper configuration and error handling
 */

import sql from 'mssql';
import { config } from '@/config';

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) {
    return pool;
  }

  const dbConfig: sql.config = {
    server: config.database.server,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    options: {
      encrypt: config.database.options.encrypt,
      trustServerCertificate: config.database.options.trustServerCertificate,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  pool = new sql.ConnectionPool(dbConfig);
  await pool.connect();

  console.log('Database connection pool established');

  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database connection pool closed');
  }
}
