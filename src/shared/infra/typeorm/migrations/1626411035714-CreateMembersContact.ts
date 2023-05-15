import {
  MigrationInterface,
  QueryRunner,
  Table
} from 'typeorm'

export class CreateMembersContact1626411035714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members_contact',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'member_id',
            type: 'uuid'
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'zipcode',
            type: 'bigint',
            isNullable: true
          },
          {
            name: 'phone_type_name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'phone_number',
            type: 'bigint',
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
        ],
        foreignKeys: [
          {
            name: 'FKMemberContact',
            referencedTableName: 'members',
            referencedColumnNames: ['id'],
            columnNames: ['member_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('members_contact', 'FKMemberContact')
    await queryRunner.dropTable('members_contact')
  }
}
