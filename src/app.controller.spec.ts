import { TestFixture } from 'test/test-fixture';

describe('AppController', () => {
  let fixture: TestFixture;

  beforeAll(async () => {
    fixture = new TestFixture();
    await fixture.createApp();
  });

  afterAll(async () => {
    await fixture.stopApp();
  });

  describe('root', () => {
    it('should ping to the / route', async () => {
      const response = await fixture.request.get('/').expect(200);

      expect(response.statusCode).toBe(200);
    });
  });
});
