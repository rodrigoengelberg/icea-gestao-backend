import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm'

@Entity('membersContact')
class MemberContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
