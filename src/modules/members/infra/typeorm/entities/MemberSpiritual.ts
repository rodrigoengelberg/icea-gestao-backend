import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import Member from './Member'

@Entity('members_spiritual')
class MemberSpiritual {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  member_id: string;

  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column()
  member_function: string;

  @Column()
  member_status: string;

  @Column()
  baptism_date: Date;

  @Column()
  joined_date: Date;

  @Column('integer')
  tithe_member: number;

  @Column()
  problems: string;

  @Column()
  testimony: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MemberSpiritual
