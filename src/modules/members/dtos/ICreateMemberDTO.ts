import ICreateMemberContactDTO from "./ICreateMemberContactDTO";
import ICreateMemberDetailsDTO from "./ICreateMemberDetailsDTO";
import ICreateMemberSpiritualDTO from "./ICreateMemberSpiritualDTO";

export default interface ICreateMemberDTO {
  first_name: string
  full_name: string
  email: string
  gender: string
  marital_status: string
  nationality: string
  birth_date: Date
  member_contact: ICreateMemberContactDTO
  member_details: ICreateMemberDetailsDTO
  member_spiritual: ICreateMemberSpiritualDTO
}
