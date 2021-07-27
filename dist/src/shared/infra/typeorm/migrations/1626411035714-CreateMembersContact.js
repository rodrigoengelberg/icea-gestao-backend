"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMembersContact1626411035714 = void 0;
const typeorm_1 = require("typeorm");
class CreateMembersContact1626411035714 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: 'lougradouro',
                    type: 'varchar',
                },
                {
                    name: 'estado',
                    type: 'varchar',
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                },
                {
                    name: 'cep',
                    type: 'number',
                },
                {
                    name: 'tipoTelefone',
                    type: 'varchar',
                },
                {
                    name: 'numeroTelefone',
                    type: 'number',
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
        }));
        await queryRunner.createForeignKey('membersContact', new typeorm_1.TableForeignKey({
            name: 'FKMemberContact',
            columnNames: ['member_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'members',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('membersContact', 'FKMemberContact');
        await queryRunner.dropTable('membersContact');
    }
}
exports.CreateMembersContact1626411035714 = CreateMembersContact1626411035714;
