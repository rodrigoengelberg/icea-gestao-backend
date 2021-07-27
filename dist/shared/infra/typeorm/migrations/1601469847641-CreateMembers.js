"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateAppointments1601469847641 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'members',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'gender',
                    type: 'varchar',
                },
                {
                    name: 'member_type',
                    type: 'varchar',
                },
                {
                    name: 'marital_status',
                    type: 'varchar',
                },
                {
                    name: 'nationality',
                    type: 'varchar',
                },
                {
                    name: 'birth_date',
                    type: 'date',
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('appointments');
    }
}
exports.default = CreateAppointments1601469847641;
