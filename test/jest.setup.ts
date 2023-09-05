import { Client } from 'pg';

beforeAll(async () => {
  const pgClient: Client = global.__TEST_DB_CLIENT__;
  await pgClient.query('DROP SCHEMA public CASCADE');
  await pgClient.query('CREATE SCHEMA public');
});

beforeEach(() => {
  jest.resetAllMocks();
});
