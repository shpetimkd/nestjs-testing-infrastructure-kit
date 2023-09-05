# Testing Infrastructure Setup with NestJS, Jest, Supertest, and @testcontainers/postgresql

This repository provides a configuration of the testing infrastructure setup for a NestJS application using Jest for testing, Supertest for making HTTP requests to the application, and `@testcontainers/postgresql` for managing PostgreSQL database containers during tests.

Configuration and setup for your NestJS testing module. This is a great approach for keeping your test setup clean and reusable.

## Test Fixture Class

The `TestFixture` class is designed to simplify the setup and teardown of the NestJS application for testing purposes. It provides the following functionalities:

- **Application Creation**: The `createApp` method creates an instance of your NestJS application by initializing a NestJS testing module and creating the application with the necessary dependencies.

- **Application Termination**: The `stopApp` method gracefully shuts down the application when testing is complete.

- **HTTP Request Testing**: The `request` property exposes a Supertest HTTP client, allowing you to make HTTP requests to your application for testing purposes.

## Jest Configuration

To use the `TestFixture` and set up your testing environment, Jest configuration files are used as follows:

- **jest.setup.js**: This file is configured to run before all test suites. It handles tasks such as dropping and creating the public schema, ensuring a clean slate for your tests.

- **jest.global-setup.js**: In this file, we start a PostgreSQL container using `@testcontainers/postgresql`. This container provides a PostgreSQL database instance for your tests, ensuring a consistent and isolated testing environment. The container is configured with the necessary database credentials. Docker is needed in order for the test suits to be run!

- **jest.global-teardown.js**: After all test suites have completed, we shut down the PostgreSQL container to release resources. This step ensures that the container is terminated properly and does not linger after testing.

## How to Use

To use this testing infrastructure in your NestJS project, follow these steps:

1. **Install Dependencies**: Ensure you have the required dependencies installed in your project, including `pg`, `supertest`, `ts-jest`, and `@testcontainers/postgresql`.

2. **Configure Jest**: Update your Jest configuration (e.g., `jest.config.js`/`package.json - jest config`) to specify the setup and teardown files (e.g., `jest.setup.js`, `jest.global-setup.js`, and `jest.global-teardown.js`).

3. **Create Test Suites**: Write your test suites using Jest, utilizing the `TestFixture` class to set up and tear down your NestJS application as needed. Use the `request` property to make HTTP requests and perform tests against your application.

## Example

Here's an example of how to use the TestFixture in a test suite:

```javascript
import { TestFixture } from './path-to-test-fixture';
import { HttpStatus } from '@nestjs/common';

describe('My API Tests', () => {
  let fixture: TestFixture;

  beforeAll(async () => {
    fixture = new TestFixture();
    await fixture.createApp();
  });

  afterAll(async () => {
    await fixture.stopApp();
  });

  test('GET /api/my-endpoint should return 200 OK', async () => {
    const response = await fixture.request.get('/api/my-endpoint');
    expect(response.status).toBe(HttpStatus.OK);
  });
});
