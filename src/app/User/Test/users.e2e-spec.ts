import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker/.';
import { PrismaService } from 'src/ship/Module/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

describe('User Container (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const password: string = 'password123';
  const userCred = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: password,
    dob: faker.date.birthdate(),
    gender: faker.helpers.arrayElement(['m', 'f']),
    city: faker.string.alpha(10),
  };

  let userTest: User;
  let userToken: string;

  // Setup the app instance before all tests
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    jwtService = moduleRef.get<JwtService>(JwtService);

    userTest = await prisma.user.create({ data: userCred });
    userToken = await jwtService.signAsync(userTest);

    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Close the app after tests to prevent memory leaks
  });

  describe('GET /user/me', () => {
    it('should get authenticated user by its token', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/me')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      const { data } = response.body;

      expect(data.email).toBe(userTest.email);
      expect(data.name).toBe(userTest.name);
    });

    it('should return 401 for using expired token', async () => {
      const token = jwtService.sign(userTest, { expiresIn: -3600 });

      await request(app.getHttpServer()).get('/user/me').set('Authorization', `Bearer ${token}`).expect(401);
    });

    it('should return 401 for invalid token', async () => {
      await request(app.getHttpServer())
        .get('/user/me')
        .set('Authorization', `Bearer romeRandomInvalidToken`)
        .expect(401);
    });
  });
});
