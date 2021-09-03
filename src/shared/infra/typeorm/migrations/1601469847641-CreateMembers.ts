import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateAppointments1601469847641
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'first_name',
            type: 'varchar'
          },
          {
            name: 'full_name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true
          },
          {
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'marital_status',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'nationality',
            type: 'varchar'
          },
          {
            name: 'birth_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'occupation',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'schooling',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'facebook_link',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'instagram_link',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('members')
  }
}
