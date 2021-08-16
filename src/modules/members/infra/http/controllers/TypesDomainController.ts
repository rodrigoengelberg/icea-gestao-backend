import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'

import GendersJson from '@modules/members/repositories/json/genders.json'
import MaritalStatusJson from '@modules/members/repositories/json/maritalStatus.json'
import MemberFunctionJson from '@modules/members/repositories/json/memberFunction.json'
import MemberStatusJson from '@modules/members/repositories/json/memberStatus.json'
import NationalitiesJson from '@modules/members/repositories/json/nationalities.json'
import OccupationsJson from '@modules/members/repositories/json/occupations.json'
import PhoneTypesJson from '@modules/members/repositories/json/phoneTypes.json'
import SchoolJson from '@modules/members/repositories/json/school.json'

export default class TypesDomainController {

  public async showGenders(request: Request, response: Response): Promise<Response> {

    const genders = GendersJson;

    return response.json(classToClass(genders));
  }

  public async showMaritalStatus(request: Request, response: Response): Promise<Response> {

    const maritalStatus = MaritalStatusJson;

    return response.json(classToClass(maritalStatus));
  }

  public async showMemberFunction(request: Request, response: Response): Promise<Response> {

    const memberFunction = MemberFunctionJson;

    return response.json(classToClass(memberFunction));
  }

  public async showMemberStatus(request: Request, response: Response): Promise<Response> {

    const memberStatus = MemberStatusJson;

    return response.json(classToClass(memberStatus));
  }

  public async showNationalities(request: Request, response: Response): Promise<Response> {

    const nationalities = NationalitiesJson;

    return response.json(classToClass(nationalities));
  }

  public async showOccupations(request: Request, response: Response): Promise<Response> {

    const occupations = OccupationsJson;

    return response.json(classToClass(occupations));
  }

  public async showPhoneTypes(request: Request, response: Response): Promise<Response> {

    const phoneTypes = PhoneTypesJson;

    return response.json(classToClass(phoneTypes));
  }

  public async showSchool(request: Request, response: Response): Promise<Response> {

    const school = SchoolJson;

    return response.json(classToClass(school));
  }

}
