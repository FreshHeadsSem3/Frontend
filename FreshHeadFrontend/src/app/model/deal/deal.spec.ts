import { Guid } from 'guid-typescript';
import { Deal } from './deal';

describe('Deal', () => {
  it('should create an instance', () => {
    const dealId = Guid.create(); // Replace with a valid Guid
    const title = 'Sample Deal';
    const description = 'Description of the deal';
    const maxParticipents = 10;
    const claimed = 0;
    const location = 'Sample Location';
    const activeTill = new Date();
    const eventDate = new Date();
    const images = ['image1.jpg', 'image2.jpg'];
    const dealCategory = 'Sample Category';
    const dealCategoryID = Guid.create(); // Replace with a valid Guid
    const companyID = Guid.create(); // Replace with a valid Guid

    const deal = new Deal(
      dealId,
      title,
      description,
      maxParticipents,
      claimed,
      location,
      activeTill,
      eventDate,
      images,
      dealCategory,
      dealCategoryID,
      companyID
    );
    expect(deal.images).toEqual(['image1.jpg', 'image2.jpg']);

    // Test for the correct type of Date properties
    expect(deal.activeTill instanceof Date).toBe(true);
    expect(deal.eventDate instanceof Date).toBe(true);

    // Test for the length of the images array
    expect(deal.images.length).toBe(2);

    // Test for the correctness of individual properties
    expect(deal.title).toEqual('Sample Deal');
    expect(deal.description).toEqual('Description of the deal');
    expect(deal.maxParticipents).toEqual(10);
    expect(deal.claimed).toEqual(0);
    expect(deal.location).toEqual('Sample Location');
    expect(deal.dealCategory).toEqual('Sample Category');

    // Test for the type of Guid properties
    expect(Guid.isGuid(deal.id)).toBe(true);
    expect(Guid.isGuid(deal.dealCategoryID)).toBe(true);
    expect(Guid.isGuid(deal.companyID)).toBe(true);
    expect(deal).toBeTruthy();
  });
});
