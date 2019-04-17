import { Organization } from './Organization';
import { OrganizationDataApi } from './OrganizationDataApi';
import { OrganizationQuery } from './OrganizationQuery';

export class OrganizationData implements OrganizationDataApi {
  private organizations: Organization[];

  constructor(organizations: Organization[]) {
    this.organizations = organizations;
  }

  public getOrganizations(query: OrganizationQuery): Organization[] {
    let organizations = this.organizations;
    let orderby: string | undefined;
    let direction;

    for (const key of Object.keys(query)) {
      if (key === 'orderby') {
        orderby = query[key];
        continue;
      }

      if (key === 'direction') {
        direction = query[key];
        continue;
      }

      organizations = organizations.filter(org => org[key] === query[key]);
    }

    if (orderby) {
      const sortField = orderby;

      organizations.sort(
        direction === 'DSC'
          ? (a, b) => b[sortField].localeCompare(a[sortField])
          : (a, b) => a[sortField].localeCompare(b[sortField])
      );
    }

    return organizations;
  }
}
