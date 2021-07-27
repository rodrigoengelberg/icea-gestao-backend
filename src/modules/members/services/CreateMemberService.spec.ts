import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository';
import CreateMemberService from './CreateMemberService'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let createMember: CreateMemberService

describe('CreateMember', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMember = new CreateMemberService(
      fakeMembersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new member', async () => {
    const member = await createMember.execute({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    });

    expect(member).toHaveProperty('id')
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