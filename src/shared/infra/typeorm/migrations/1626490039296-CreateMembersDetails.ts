import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMembersDetails1626490039296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'membersDetails',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'occupation',
                  type: 'varchar',
                },
                {
                  name: 'schooling',
                  type: 'varchar',
                },
                {
                  name: 'facebook_link',
                  type: 'varchar',
                  isUnique: true
                },
                {
                  name: 'instagram_link',
                  type: 'varchar',
                  isUnique: true
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('membersDetails');
    }

}
