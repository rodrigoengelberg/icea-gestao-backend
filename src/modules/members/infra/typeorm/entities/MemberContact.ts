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
  lougradouro: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @Column()
  cep: number;

  @Column()
  tipoTelefone: string;

  @Column()
  numeroTelefone: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default MemberContact
