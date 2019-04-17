import * as csv from 'csvtojson';
import * as express from 'express';
import { Organization } from './Organization';
import { OrganizationData } from './OrganizationData';
import { OrganizationsController } from './OrganizationsController';

const port = process.env.PORT || 3000;

const app = express();

(async () => {
  const csvRows = await await csv().fromFile('./organization_sample_data.csv');
  const organizationData = new OrganizationData(
    (csvRows as unknown) as Organization[]
  );
  const organizationsController = new OrganizationsController(organizationData);

  app.get(
    '/organizations',
    organizationsController.get.bind(organizationsController)
  );

  app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log('Server started.');
  });
})();
