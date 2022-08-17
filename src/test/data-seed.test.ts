import { User } from '../modules/users/entities/user.entity';
import { TestingDataSource } from './testing-data-source.test';

export const userDataSeed = async () => {
  await TestingDataSource.initialize();

  const userRepository = TestingDataSource.getRepository(User);

  await userRepository.save([
    {
      name: 'Test User 1',
      email: 'test1@example.com',
      password: 'testpassword'
    },
    {
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'testpassword'
    }
  ]);
};
