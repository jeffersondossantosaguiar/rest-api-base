import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { RolesEnum } from '../../../common/roles.enum';
import { isValid } from '../../../utils/functions';
import { User } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserPayload: CreateUserPayload): Promise<User> {
    const { email } = createUserPayload;

    const userExists = await this.usersRepository.count({
      where: { email }
    });

    if (userExists) throw new BadRequestException('User already exists');

    const user = await this.getEntityFromPayload(createUserPayload);

    Object.assign(user, {
      roles: [RolesEnum.USER]
    });

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email
      }
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserPayload) {
    await this.findOne(id);

    const userToUpdate = await this.getEntityFromPayload(updateUserDto, id);

    return await this.usersRepository.save(userToUpdate);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async getEntityFromPayload(
    payload: CreateUserPayload | UpdateUserPayload,
    id?: string
  ): Promise<User> {
    return new User({
      ...(isValid(id) && { id }),
      ...(isValid(payload.isActive) && { isActive: payload.isActive }),
      ...(isValid(payload.name) && { name: payload.name }),
      ...(payload instanceof CreateUserPayload &&
        isValid(payload.email) && { email: payload.email }),
      ...(isValid(payload.password) && {
        password: await hash(payload.password, 10)
      })
    });
  }
}
