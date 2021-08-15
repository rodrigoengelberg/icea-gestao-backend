import {
    MigrationInterface,
    QueryRunner,
    Table
} from 'typeorm'

export class CreatePatrimony1628919060947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'patrimony',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'accounting_classification',
                        type: 'integer',
                        isUnique: true,
                    },
                    {
                        name: 'accounting classification_name',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'localization',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'accounting classification_name',
                        type: 'varchar',
                        isNullable: true
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
                    },
                ],
            }),
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patrimony')
    }

}