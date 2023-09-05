export default async function () {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await global.__TEST_DB_CLIENT__.end();
  await global.__TEST_DB_CONTAINER__.stop();
}
