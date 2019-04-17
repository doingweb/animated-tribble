export interface OrganizationQuery {
  [index: string]: string | undefined;
  id?: string;
  name?: string;
  city?: string;
  state?: string;
  postal?: string;
  category?: string;
  orderby?: string;
  direction?: 'ASC' | 'DSC';
}
