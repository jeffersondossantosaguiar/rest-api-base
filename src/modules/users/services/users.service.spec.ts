import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDataSeed } from '../../../test/data-seed.test';
import { TestingDataSource } from '../../../test/testing-data-source.test';
import { validatePayload } from '../../../utils/functions';
import { User } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile();

    repository = TestingDataSource.getRepository(User);
    service = new UsersService(repository);

    await userDataSeed();
  });

  afterEach(async () => {
    await TestingDataSource.destroy();
  });

  describe('create()', () => {
    it('should successfully create a new user', async () => {
      const createUserPayload: CreateUserPayload = await validatePayload(
        CreateUserPayload,
        {
          name: 'User Name',
          email: 'user@example.com',
          password: 'password'
        }
      );

      await expect(service.create(createUserPayload)).resolves.toHaveProperty(
        'email',
        'user@example.com'
      );
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('should get a user by id', async () => {
      const userTest = await service.findOneByEmail('test1@example.com');
      const user = await service.findOne(userTest.id);

      expect(user).toHaveProperty('id', userTest.id);
    });
  });

  describe('findOneByEmail()', () => {
    it('should get a user by email', async () => {
      const user = await service.findOneByEmail('test1@example.com');

      expect(user).toHaveProperty('email', 'test1@example.com');
    });
  });

  describe('update()', () => {
    it('should update a user by id', async () => {
      const user = await service.findOneByEmail('test1@example.com');
      const userUpdated = await service.update(user.id, {
        name: 'User Updated'
      });

      expect(userUpdated).toHaveProperty('name', 'User Updated');
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const user = await service.findOneByEmail('test1@example.com');
      const retVal = await service.remove(user.id);

      expect(retVal).toBeUndefined();
    });
  });
});
