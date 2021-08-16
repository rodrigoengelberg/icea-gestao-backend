import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'

import AccountingClassificationJson from '@modules/patrimonies/repositories/json/accountingClassification.json'

export default class TypesDomainController {

  public async showAccountingClassification(request: Request, response: Response): Promise<Response> {

    const accountingClassification = AccountingClassificationJson;

    return response.json(classToClass(accountingClassification));
  }

}
