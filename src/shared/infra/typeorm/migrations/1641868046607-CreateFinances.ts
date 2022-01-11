import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFinances1641868046607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'finances',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'description',
              type: 'varchar'
            },
            {
              name: 'nature_id',
              type: 'uuid',
              isNullable: true
            },
            {
              name: 'type',
              type: 'varchar',
              isNullable: true
            },
            {
              name: 'transaction_date',
              type: 'date',
              isNullable: true
            },
            {
              name: 'value',
              type: 'decimal(12,2)',
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
      await queryRunner.dropTable('finances')
    }

}
