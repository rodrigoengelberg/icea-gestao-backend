import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm'

import Member from './Member';

@Entity('membersContact')
class MemberContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  member_id: string;

  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zipcode: number;

  @Column()
  phoneType: string;

  @Column()
  phoneNumber: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MemberContact
