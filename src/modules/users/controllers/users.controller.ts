import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesEnum } from '../../../common/roles.enum';
import { IdParams } from '../../../common/validators/id-params.validator';
import { User } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create an user' })
  @ApiResponse({ type: User })
  @Roles(RolesEnum.ADMIN)
  @Post()
  async create(@Body() createUserPayload: CreateUserPayload): Promise<User> {
    return await this.usersService.create(createUserPayload);
  }

  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ type: User, isArray: true })
  @Roles(RolesEnum.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ type: User })
  @Roles(RolesEnum.ADMIN)
  @Get(':id')
  async findOne(@Param() params: IdParams) {
    const { id } = params;
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an user by id' })
  @ApiResponse({ type: User })
  @Roles(RolesEnum.ADMIN)
  @Put(':id')
  async update(
    @Param() params: IdParams,
    @Body() updateUserDto: UpdateUserPayload
  ) {
    const { id } = params;
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete an user by id' })
  @ApiNoContentResponse()
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  async remove(@Param() params: IdParams) {
    const { id } = params;
    return this.usersService.remove(id);
  }
}
