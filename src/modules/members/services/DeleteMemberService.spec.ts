import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import CreateMemberService from './CreateMemberService'
import DeleteMemberService from './DeleteMemberService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberDetails from '../infra/typeorm/entities/MemberDetails'
import MemberSpirutal from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let createMember: CreateMemberService
let deleteMember: DeleteMemberService

describe('CreateMember', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMember = new CreateMemberService(
      fakeMembersRepository,
      fakeCacheProvider,
    )

    deleteMember = new DeleteMemberService(
      fakeMembersRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a delete a member', async () => {
    const member = await createMember.execute({
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact(),
      member_details: new MemberDetails(),
      member_spiritual: new MemberSpirutal()
    })

    const response = await deleteMember.execute({ member_id: member.id })


  })

})
