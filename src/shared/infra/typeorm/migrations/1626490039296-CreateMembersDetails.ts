import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey 
} from 'typeorm'

export class CreateMembersDetails1626490039296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'members_details',
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
                        type: 'uuid',
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'occupation',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'schooling',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'facebook_link',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: 'instagram_link',
                        type: 'varchar',
                        isUnique: true,
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
                    }
                ],
            }),
        )

        await queryRunner.createForeignKey(
            'members_details',
            new TableForeignKey({
                name: 'FKMembersDetails',
                columnNames: ['member_id'],
                referencedTableName: 'members',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('members_details', 'FKMembersDetails')
        await queryRunner.dropTable('members_details')
    }

}
