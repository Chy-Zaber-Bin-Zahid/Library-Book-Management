import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1753441408071 implements MigrationInterface {
  name = 'InitialMigration1753441408071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD "quantity" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "quantity"`);
  }
}
