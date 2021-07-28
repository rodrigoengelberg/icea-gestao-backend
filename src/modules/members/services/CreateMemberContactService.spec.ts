import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersContactRepository from '../repositories/fakes/FakeMembersContactRepository'
import CreateMemberContactService from './CreateMemberContactService'

let fakeMembersContactRepository: FakeMembersContactRepository
let fakeCacheProvider: FakeCacheProvider
let createMemberContact: CreateMemberContactService

describe('CreateMemberContact', () => {
  beforeEach(() => {
    fakeMembersContactRepository = new FakeMembersContactRepository()

    createMemberContact = new CreateMemberContactService(
      fakeMembersContactRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new member contact', async () => {


    const memberContact = await createMemberContact.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    });

    expect(memberContact).toHaveProperty('id')
  });

  it('should not be able to create a new member with email from another', async () => {
    await createMember.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    });

    await expect(
      createMember.execute({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        member_type: 'Ativo',
        marital_status: 'Casado',
        nationality: 'Brasileiro',
        birth_date: new Date()
      }),
    ).rejects.toBeInstanceOf(AppError)
  });
  
});
