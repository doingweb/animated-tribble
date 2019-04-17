import { Organization } from './Organization';
import { OrganizationData } from './OrganizationData';

describe('Organization data', () => {
  describe('filtering by fields', () => {
    it('should filter by id', testFieldFilter('id'));
    it('should filter by name', testFieldFilter('name'));
    it('should filter by city', testFieldFilter('city'));
    it('should filter by state', testFieldFilter('state'));
    it('should filter by postal', testFieldFilter('postal'));
    it('should filter by category', testFieldFilter('category'));

    function testFieldFilter(fieldName: string) {
      return () => {
        const organizations = [
          { [fieldName]: 'A' },
          { [fieldName]: 'B' },
          { [fieldName]: 'C' }
        ];
        const orgData = new OrganizationData(
          (organizations as unknown) as Organization[]
        );

        const result = orgData.getOrganizations({ [fieldName]: 'B' });

        expect(result.length).toBe(1);
        expect(result[0]).toBe(organizations[1]);
      };
    }
  });

  it('should combine multiple filters with logical AND', () => {
    const organizations = [
      { city: 'A', state: 'A' },
      { city: 'A', state: 'B' },
      { city: 'B', state: 'B' }
    ];
    const orgData = new OrganizationData(
      (organizations as unknown) as Organization[]
    );

    const result = orgData.getOrganizations({ city: 'A', state: 'B' });

    expect(result.length).toBe(1);
    expect(result[0]).toBe(organizations[1]);
  });

  describe('sorting', () => {
    describe('directions', () => {
      let orgData: OrganizationData;
      beforeEach(() => {
        const organizations = [{ id: 'B' }, { id: 'C' }, { id: 'A' }];
        orgData = new OrganizationData(
          (organizations as unknown) as Organization[]
        );
      });

      it('should default to sort ascending', () => {
        const result = orgData.getOrganizations({ orderby: 'id' });

        expect(result.map(org => org.id)).toEqual(['A', 'B', 'C']);
      });

      it('should be able to explicitly sort ascending', () => {
        const result = orgData.getOrganizations({
          direction: 'ASC',
          orderby: 'id'
        });

        expect(result.map(org => org.id)).toEqual(['A', 'B', 'C']);
      });

      it('should be able to sort descending', () => {
        const result = orgData.getOrganizations({
          direction: 'DSC',
          orderby: 'id'
        });

        expect(result.map(org => org.id)).toEqual(['C', 'B', 'A']);
      });

      it('should not sort if only direction is specified', () => {
        const result = orgData.getOrganizations({
          direction: 'DSC',
        });

        expect(result.map(org => org.id)).toEqual(['B', 'C', 'A']);
      });
    });

    describe('by field', () => {
      it('should be sortable by id', testFieldSort('id'));
      it('should be sortable by name', testFieldSort('name'));
      it('should be sortable by city', testFieldSort('city'));
      it('should be sortable by state', testFieldSort('state'));
      it('should be sortable by postal', testFieldSort('postal'));
      it('should be sortable by category', testFieldSort('category'));

      function testFieldSort(fieldName: string) {
        return () => {
          const organizations = [
            { [fieldName]: 'B' },
            { [fieldName]: 'C' },
            { [fieldName]: 'A' }
          ];
          const orgData = new OrganizationData(
            (organizations as unknown) as Organization[]
          );
          const result = orgData.getOrganizations({
            orderby: fieldName
          });

          expect(result.map(org => org[fieldName])).toEqual(['A', 'B', 'C']);
        };
      }
    });
  });
});
