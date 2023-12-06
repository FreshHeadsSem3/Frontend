import { Guid } from 'guid-typescript';
import { EmailModel } from './email-model';

describe('EmailModel', () => {
  it('should create an instance', () => {
    const dealID = Guid.create(); // Replace with a valid Guid
    const mailUser = 'user@example.com';
    const mailMSG = 'Sample mail message';

    const emailModel = new EmailModel(
      dealID,
      mailUser,
      mailMSG
    );

    expect(emailModel).toBeTruthy();
  });
});
