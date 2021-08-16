import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import MemberContact from './MemberContact'
import MemberDetails from './MemberDetails'
import MemberSpiritual from './MemberSpiritual'

@Entity('members')
class Member {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  gender: string;

  @Column()
  marital_status: string;

  @Column({ nullable: false })
  nationality: string;

  @Column()
  birth_date: Date;

  @OneToOne(() => MemberContact, memberContact => memberContact.member,
    { cascade: true, eager: true })
  member_contact: MemberContact;

  @OneToOne(() => MemberDetails, memberDetails => memberDetails.member,
    { cascade: true, eager: true })
  member_details: MemberDetails;

  @OneToOne(() => MemberSpiritual, memberSpiritual => memberSpiritual.member,
    { cascade: true, eager: true })
  member_spiritual: MemberSpiritual;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}

export default Member
