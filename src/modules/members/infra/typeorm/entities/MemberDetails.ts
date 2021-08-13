import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Expose } from 'class-transformer'

import uploadConfig from '@config/upload'
import Member from './Member'

@Entity('members_details')
class MemberDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  member_id: string;

  @OneToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column()
  avatar: string;

  @Column()
  occupation: string;

  @Column()
  schooling: string;

  @Column({unique: true})
  facebook_link: string;

  @Column({unique: true})
  instagram_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (process.env.STORAGE_DRIVER) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }

}

export default MemberDetails
