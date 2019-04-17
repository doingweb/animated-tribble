import { Request, Response } from 'express';
import { OrganizationDataApi } from './OrganizationDataApi';
import { OrganizationQuery } from './OrganizationQuery';

export class OrganizationsController {
  private dataApi: OrganizationDataApi;

  constructor(dataApi: OrganizationDataApi) {
    this.dataApi = dataApi;
  }

  public get(req: Request, res: Response) {
    const query = req.query as OrganizationQuery;
    res.send(this.dataApi.getOrganizations(query));
  }
}
