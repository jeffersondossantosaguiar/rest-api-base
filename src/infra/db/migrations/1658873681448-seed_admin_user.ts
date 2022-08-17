import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { RolesEnum } from '../../../common/roles.enum';

export class seedAdminUser1658873681448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('123456', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("email", "name", "password", "role") VALUES ('admin@api.com.br', 'Admin', '${password}', '${RolesEnum.ADMIN}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
