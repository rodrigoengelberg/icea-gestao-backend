import ICreateMemberContactDTO from './ICreateMemberContactDTO'
import ICreateMemberSpiritualDTO from './ICreateMemberSpiritualDTO'

export default interface ICreateMemberDTO {
  first_name: string
  full_name: string
  email: string
  gender: string
  marital_status: string
  nationality: string
  birth_date: Date
  occupation: string
  schooling: string
  facebook_link: string
  instagram_link: string
  avatar: string
  member_contact: ICreateMemberContactDTO
  member_spiritual: ICreateMemberSpiritualDTO
}
