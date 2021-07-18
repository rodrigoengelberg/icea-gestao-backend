import {
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from 'typeorm'

@Entity('members')
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  member_type: string;

  @Column()
  marital_status: string;

  @Column()
  nationality: string;

  @Column()
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Member
