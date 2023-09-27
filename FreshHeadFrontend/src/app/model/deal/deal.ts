import { Guid } from 'guid-typescript';

export class Deal {
  ID: Guid;
  Title: string;
  Description: string;
  Image: string[];


  constructor(ID: Guid, Title: string, Description: string, Image: string[]) {
    this.ID = ID;
    this.Title = Title;
    this.Description = Description;
    this.Image = Image;
  }
}
