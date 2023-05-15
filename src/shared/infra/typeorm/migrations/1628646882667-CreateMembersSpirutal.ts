import {
  MigrationInterface,
  QueryRunner,
  Table
} from 'typeorm'

export class CreateMembersSpirutal1628646882667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members_spiritual',
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
            name: 'member_function',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'member_status',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'baptism_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'joined_date',
            type: 'date',
            isNullable: true
          },
          {
            name: 'tithe_member',
            type: 'integer',
            default: '0'
          },
          {
            name: 'problems',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'testimony',
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
        ],
        foreignKeys: [
          {
            name: 'FKMembersSpirutal',
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
    await queryRunner.dropForeignKey('members_spiritual', 'FKMembersSpirutal')
    await queryRunner.dropTable('members_spiritual')
  }
}
