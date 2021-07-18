import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

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
                        name: 'member_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
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
        )

        await queryRunner.createForeignKey(
            'membersDetails',
            new TableForeignKey({
                name: 'FKMembersDetails',
                columnNames: ['member_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'members',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('membersDetails', 'FKMembersDetails')
        await queryRunner.dropTable('membersDetails')
    }

}
