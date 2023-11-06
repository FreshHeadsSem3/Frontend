import { Guid } from 'guid-typescript';

export class Deal {
  public id: Guid;
  public title: string;
  public description: string;
  public maxParticipents: number = 0
  public claimed: number = 0
  public location: string = ""
  public activeTill: Date = new Date(2000, 1, 1)
  public images: string[] = [];
  public dealCategory: string;
  public dealCategoryID: Guid;


  constructor(id: Guid, title: string, description: string, maxParticipents: number, claimed: number, location: string, activeTill: Date, images: string[], dealCategory: string, dealCategoryID: Guid) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.maxParticipents = maxParticipents;
    this.claimed = claimed;
    this.location = location;
    this.activeTill = activeTill;
    this.images = images;
    this.dealCategory = dealCategory;
    this.dealCategoryID = dealCategoryID;
  }
}
