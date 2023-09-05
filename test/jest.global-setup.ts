import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Client } from 'pg';

export default async function () {
  setTestEnv();

  let container: StartedPostgreSqlContainer;
  let client: Client;
  try {
    container = await new PostgreSqlContainer('postgres:15.2-alpine')
      .withExposedPorts(5432)
      .withDatabase(process.env.DATABASE_NAME)
      .withUsername(process.env.DATABASE_USERNAME)
      .withPassword(process.env.DATABASE_PASSWORD)
      .start();

    process.env.DATABASE_PORT = String(container.getPort());

    client = new Client({
      host: process.env.DATABASE_HOST,
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    await client.connect();

    global.__TEST_DB_CLIENT__ = client;
    global.__TEST_DB_CONTAINER__ = container;
  } catch (err) {
    await container?.stop();
    throw err;
  }
}

const setTestEnv = () => {
  process.env.DATABASE_SSL_DISABLED = undefined;
  process.env.SEQUELIZE_ALTER = undefined;
  process.env.DATABASE_NAME = 'test-db';
  process.env.DATABASE_USERNAME = 'testuser';
  process.env.DATABASE_PASSWORD = 'password';
  process.env.DATABASE_HOST = '0.0.0.0';
};
