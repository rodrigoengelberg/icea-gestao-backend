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

@Entity('membersContact')
class MemberContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
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
  phone_type: number;
  
  @Column()
  phone_type_name: string;

  @Column()
  phone_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MemberContact
