import {Guid} from "guid-typescript";

export class RemoveParticipant {
  public DealID : Guid;
  public MailUser : string;

  constructor(DealID: Guid, MailUser: string) {
    this.DealID = DealID;
    this.MailUser = MailUser;
  }
}
