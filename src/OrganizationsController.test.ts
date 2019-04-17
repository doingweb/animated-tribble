import { Request, Response } from 'express';
import { Organization } from './Organization';
import { OrganizationDataApi } from './OrganizationDataApi';
import { OrganizationsController } from './OrganizationsController';

describe('get method', () => {
  it('should send the result from the data layer', async () => {
    const req = {
      query: {}
    };
    const res = {
      send: jest.fn()
    };
    const expected: Organization[] = [];
    const mockOrganizationDataApi: OrganizationDataApi = {
      getOrganizations: query => {
        if (query === req.query) {
          return expected;
        }
        throw new Error('Query not passed correctly');
      }
    };
    const controller = new OrganizationsController(mockOrganizationDataApi);

    controller.get((req as unknown) as Request, (res as unknown) as Response);

    expect(res.send).toHaveBeenCalledWith(expected);
  });
});
