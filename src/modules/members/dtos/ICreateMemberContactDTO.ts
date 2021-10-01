export default interface ICreateMemberContactDTO {
  id?: string
  member_id?: string
  address: string
  state: string
  city: string
  zipcode: number
  phone_type_name: string
  phone_number: number
}
