import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import uploadConfig from '@config/upload'

@Entity('membersDetails')
class MemberDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  occupation: string;

  @Column()
  schooling: string;

  @Column()
  facebook_link: string;

  @Column()
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
