//#region Imports

import { Type, ValidationPipe } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function isValid(value: any): value is object {
  return !isNullOrUndefined(value);
}

export async function validatePayload<T>(
  payloadClass: ClassConstructor<T> | Type<T>,
  payloadObject: T
): Promise<T> {
  const validation = new ValidationPipe({ whitelist: true });
  const payloadValidated: object = await validation.transform(payloadObject, {
    type: 'body',
    metatype: payloadClass
  });

  return plainToInstance<T, object>(payloadClass, payloadValidated);
}
