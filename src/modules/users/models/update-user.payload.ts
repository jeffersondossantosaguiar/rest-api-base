import { PartialType } from '@nestjs/swagger';
import { CreateUserPayload } from './create-user.payload';

export class UpdateUserPayload extends PartialType(CreateUserPayload) {}
