import { Organization } from './Organization';
import { OrganizationQuery } from './OrganizationQuery';

/**
 * Provides access to the organization data, including filtering and sorting.
 *
 * @export
 * @interface OrganizationDataApi
 */
export interface OrganizationDataApi {
  getOrganizations(query: OrganizationQuery): Organization[];
}
