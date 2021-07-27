"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMembersDetails1626490039296 = void 0;
const typeorm_1 = require("typeorm");
class CreateMembersDetails1626490039296 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
        await queryRunner.createForeignKey('membersDetails', new typeorm_1.TableForeignKey({
            name: 'FKMembersDetails',
            columnNames: ['member_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'members',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('membersDetails', 'FKMembersDetails');
        await queryRunner.dropTable('membersDetails');
    }
}
exports.CreateMembersDetails1626490039296 = CreateMembersDetails1626490039296;
