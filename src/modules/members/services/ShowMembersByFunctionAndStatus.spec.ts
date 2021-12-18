import AppError from '@shared/errors/AppError'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import ShowMembersByFunctionAndStatus from './ShowMembersByFunctionAndStatus'
import MemberContact from '../infra/typeorm/entities/MemberContact'

let fakeMembersRepository: FakeMembersRepository
let showMembers: ShowMembersByFunctionAndStatus

describe('ShowMembersByFunctionAndStatus', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    showMembers = new ShowMembersByFunctionAndStatus(fakeMembersRepository)
  })

  it('should not be able to show the member when member_function not exist', async () => {

    await expect(showMembers.execute({
      member_function: undefined,
      member_status: 'Ativo'
    })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to show the member when member_status not exist', async () => {

    await expect(showMembers.execute({
      member_function: 'Membro',
      member_status: undefined
    })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should be able to show the members with function and status defined', async () => {

    const memberSpiritual_1 = {
      member_id: 'uuid',
      member_function: 'Membro',
      member_status: 'Ativo',
      baptism_date: new Date(),
      joined_date: new Date(),
      tithe_member: 1,
      problems: 'Nenhum',
      testimony: ''
    }

    const memberSpiritual_2 = {
      member_id: 'uuid',
      member_function: 'Congregado',
      member_status: 'Ativo',
      baptism_date: new Date(),
      joined_date: new Date(),
      tithe_member: 1,
      problems: 'Nenhum',
      testimony: ''
    }

    await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: memberSpiritual_1
    })

    await fakeMembersRepository.create({
      first_name: 'Peter',
      last_name: 'Peter Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: memberSpiritual_2
    })

    const members = await showMembers.execute({member_function: 'Congregado', member_status: 'Inativo'})

    expect(members.length).toBe(0)
  })

  it('should be able to show the members with function and status defined', async () => {

    const memberSpiritual_1 = {
      member_id: 'uuid',
      member_function: 'Membro',
      member_status: 'Ativo',
      baptism_date: new Date(),
      joined_date: new Date(),
      tithe_member: 1,
      problems: 'Nenhum',
      testimony: ''
    }

    const memberSpiritual_2 = {
      member_id: 'uuid',
      member_function: 'Congregado',
      member_status: 'Ativo',
      baptism_date: new Date(),
      joined_date: new Date(),
      tithe_member: 1,
      problems: 'Nenhum',
      testimony: ''
    }

    await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: memberSpiritual_1
    })

    await fakeMembersRepository.create({
      first_name: 'Peter',
      last_name: 'Peter Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: memberSpiritual_2
    })

    const members = await showMembers.execute({member_function: 'Membro', member_status: 'Ativo'})

    expect(members.length).toBe(1)
    expect(members[0].first_name).toBe('John')
  })
})
