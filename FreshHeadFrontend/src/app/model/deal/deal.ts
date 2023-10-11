import { Guid } from 'guid-typescript';

export class Deal {
  public id: Guid;
  public title: string;
  public description: string;
  public images: string[] = [];


  constructor(ID: Guid, Title: string, Description: string, Image: string[]) {
    this.id = ID;
    this.title = Title;
    this.description = Description;
    this.images = Image;
  }
}
