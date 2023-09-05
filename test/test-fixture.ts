import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as supertest from 'supertest';
import { AppModule } from '../src/app.module';

export class TestFixture {
  private app: INestApplication;
  private module: TestingModule;

  async createApp(): Promise<TestFixture> {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = this.module.createNestApplication();

    await this.app.init();
    return this;
  }

  async stopApp(): Promise<void> {
    await this.app.close();
  }

  getApplication(): INestApplication {
    return this.app;
  }

  get request(): supertest.SuperTest<supertest.Test> {
    return supertest(this.app.getHttpServer());
  }
}
