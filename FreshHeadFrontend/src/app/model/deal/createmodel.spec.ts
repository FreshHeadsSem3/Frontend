import { Guid } from 'guid-typescript';
import { Createmodel } from './createmodel';

describe('Createmodel', () => {
  it('should create an instance', () => {
    const companyID = Guid.create(); // Replace with a valid Guid
    const title = 'Sample Deal';
    const description = 'Description of the deal';
    const location = 'Sample Location';
    const images = ['image1.jpg', 'image2.jpg'];
    const maxParticipants = 10;
    const activeTill = new Date();
    const categoryID = Guid.create(); // Replace with a valid Guid

    const createModel = new Createmodel(
      companyID,
      title,
      description,
      location,
      images,
      maxParticipants,
      activeTill,
      categoryID
    );

    expect(createModel).toBeTruthy();
  });
});
