import { Guid } from 'guid-typescript';

export class Deal {
  public id: Guid;
  public title: string;
  public description: string;
  public maxParticipants: number = 0
  public claimed: number = 0
  public location: string = ""
  public activeTill: Date = new Date(2000, 1, 1)
  public eventDate: Date = new Date(2000, 1, 1)
  public images: string[] = [];
  public dealCategory: string;
  public dealCategoryID: Guid;
  public companyID: Guid;


  constructor(id: Guid, title: string, description: string, maxParticipants: number, claimed: number, location: string, activeTill: Date, eventDate: Date, images: string[], dealCategory: string, dealCategoryID: Guid, companyID: Guid) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.maxParticipants = maxParticipants;
    this.claimed = claimed;
    this.location = location;
    this.activeTill = activeTill;
    this.eventDate = eventDate;
    this.images = images;
    this.dealCategory = dealCategory;
    this.dealCategoryID = dealCategoryID;
    this.companyID = companyID;
  }
}
