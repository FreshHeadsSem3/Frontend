import { Guid } from 'guid-typescript';
import { Company } from './company';

describe('Company', () => {
  it('should create an instance with correct ID', () => {
    const companyId = Guid.create();
    const company = new Company(
      companyId,
      'Title',
      'Description',
      123,
      ['Image1'],
      'link1',
      'link2',
      'link3',
      'link4'
    );
    expect(company.id).toEqual(companyId);
  });

  it('should create an instance with correct properties', () => {
    const company = new Company(
      Guid.create(),
      'Title',
      'Description',
      123,
      ['Image1'],
      'link1',
      'link2',
      'link3',
      'link4'
    );
    
    expect(company.title).toEqual('Title');
    expect(company.description).toEqual('Description');
    expect(company.KVK).toEqual(123);
    expect(company.images).toEqual(['Image1']);
    expect(company.link1).toEqual('link1');
    expect(company.link2).toEqual('link2');
    expect(company.link3).toEqual('link3');
    expect(company.link4).toEqual('link4');
  });

  it('should be truthy', () => {
    const company = new Company(
      Guid.create(),
      'Title',
      'Description',
      123,
      ['Image1'],
      'link1',
      'link2',
      'link3',
      'link4'
    );
    expect(company).toBeTruthy();
  });
});


