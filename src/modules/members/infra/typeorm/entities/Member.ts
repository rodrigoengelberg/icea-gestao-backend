import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import MemberContact from './MemberContact'
import MemberSpiritual from './MemberSpiritual'

@Entity('members')
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  first_name: string

  @Column({ nullable: false })
  last_name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: false })
  gender: string

  @Column()
  marital_status: string

  @Column({ nullable: false })
  nationality: string

  @Column()
  birth_date: Date

  @Column()
  occupation: string

  @Column()
  schooling: string

  @Column()
  facebook_link: string

  @Column()
  instagram_link: string

  @Column()
  avatar: string

  @OneToOne(() => MemberContact, memberContact => memberContact.member, {
    cascade: true,
    eager: true
  })
  member_contact: MemberContact

  @OneToOne(() => MemberSpiritual, memberSpiritual => memberSpiritual.member, {
    cascade: true,
    eager: true
  })
  member_spiritual: MemberSpiritual

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @Expose({ name: 'avatar_url' })
  // getAvatarUrl(): string | null {
  //   if (!this.avatar) {
  //     return null
  //   }

  //   switch (process.env.STORAGE_DRIVER) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/files/${this.avatar}`
  //     case 's3':
  //       return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
  //     default:
  //       return null
  //   }
  // }
}

export default Member
