import {
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('patrimony')
class Patrimony {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  description: string;

  @Column()
  accounting_classification: number;

  @Column()
  accounting_classification_name: string;

  @Column()
  localization: string;

  @Column()
  observations: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Patrimony
