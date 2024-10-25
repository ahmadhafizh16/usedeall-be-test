import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker/.';
import { Gender } from '../../User/Enum/user.enum';

describe('Auth Container (E2E)', () => {
  let app: INestApplication;
  const oldEmail: string = faker.internet.email();
  const password: string = 'password123';
  const bday = faker.date.birthdate();
  const userTest = {
    email: oldEmail,
    name: faker.person.fullName(),
    password: password,
    dob: bday.toLocaleDateString('en-CA'),
    gender: faker.helpers.arrayElement(['m', 'f']),
    city: faker.string.alpha(10),
  };

  // Setup the app instance before all tests
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Close the app after tests to prevent memory leaks
  });

  describe('POST /auth/register', () => {
    const newUser = userTest;

    it('should register a new user', async () => {
      const response = await request(app.getHttpServer()).post('/auth/register').send(newUser).expect(201);

      const { data } = response.body;

      expect(data).toHaveProperty('id');
      expect(data.email).toBe(newUser.email);
      expect(data.name).toBe(newUser.name);
      expect(data.dob).toBe(bday.toDateString());
      expect(data.gender).toBe(Gender[newUser.gender]);
      expect(data.city).toBe(newUser.city);
    });

    it('should return 400 for duplicate email', async () => {
      const duplicateUser = newUser;

      const response = await request(app.getHttpServer()).post('/auth/register').send(duplicateUser).expect(400);

      expect(response.body.message).toBe('User already exists');
    });

    it('should return 422 for wrong date format', async () => {
      const wrongDate = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: password,
        dob: '1990-17-01', // Use invalid date
        gender: faker.helpers.arrayElement(['m', 'f']),
        city: faker.string.alpha(10),
      };

      const response = await request(app.getHttpServer()).post('/auth/register').send(wrongDate).expect(422);

      expect(response.body.message).toBe('Validation Error');
    });

    it('should return 422 for wrong date format', async () => {
      const wrongGender = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: password,
        dob: faker.date.birthdate().toLocaleDateString('en-CA'),
        gender: 'q',
        city: faker.string.alpha(10),
      };

      const response = await request(app.getHttpServer()).post('/auth/register').send(wrongGender).expect(422);

      expect(response.body.message).toBe('Validation Error');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an existing user', async () => {
      const userCredentials = {
        email: userTest.email,
        password: password,
      };

      const response = await request(app.getHttpServer()).post('/auth/login').send(userCredentials).expect(200);

      expect(response.body.data).toHaveProperty('access_token');
    });

    it('should return 401 for incorrect password', async () => {
      const invalidCredentials = {
        email: userTest.email,
        password: 'wrongpassword', // Incorrect password
      };

      const response = await request(app.getHttpServer()).post('/auth/login').send(invalidCredentials).expect(400);

      expect(response.body).toHaveProperty('message'); // Expect an error message
    });

    it('should return 400 for non-existing user', async () => {
      const nonExistingUser = {
        email: 'nonexisting@example.com',
        password: 'somepassword',
      };

      const response = await request(app.getHttpServer()).post('/auth/login').send(nonExistingUser).expect(400);

      expect(response.body).toHaveProperty('message'); // Expect an error message
    });
  });
});
