import {Guid} from "guid-typescript";

export class EmailModel {
  public DealID: Guid;
  public MailUser: string;
  public MailMSG: string;


  constructor(DealID: Guid, MailUser: string, MailMSG: string) {
    this.DealID = DealID;
    this.MailUser = MailUser;
    this.MailMSG = MailMSG;
  }
}
