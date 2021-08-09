import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey 
} from 'typeorm'

export class CreateMembersContact1626411035714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'membersContact',
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
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'zipcode',
                        type: 'bigint',
                    },
                    {
                        name: 'phoneType',
                        type: 'varchar',
                    },
                    {
                        name: 'phoneNumber',
                        type: 'bigint',
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
                ]
            })
        )

        await queryRunner.createForeignKey(
            'membersContact',
            new TableForeignKey({
                name: 'FKMemberContact',
                columnNames: ['member_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'members',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('membersContact', 'FKMemberContact')
        await queryRunner.dropTable('membersContact')
    }

}
