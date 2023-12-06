import { Guid } from 'guid-typescript';

export class Createmodel {
  public Title: string;
  public Description: string;
  public Location: string;
  public Images: string[] = [];
  public MaxParticipants: number;
  public ActiveTill: Date;
  public CategoryID: Guid;

  constructor(Title: string, Description: string, Location: string, Images: string[], MaxParticipants: number, ActiveTill: Date, CategoryID: Guid) {
    this.Title = Title;
    this.Description = Description;
    this.Location = Location;
    this.Images = Images;
    this.MaxParticipants = MaxParticipants;
    this.ActiveTill = ActiveTill
    this.CategoryID = CategoryID;
  }
}
