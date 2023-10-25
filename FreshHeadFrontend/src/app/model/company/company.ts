import { Guid } from 'guid-typescript';

export class Company {
  public id: Guid;
  public title: string;
  public description: string;
  public KVK: number;
  public images: string[] = [];


  constructor(ID: Guid, Title: string, Description: string, KVK: number, Image: string[]) {
    this.id = ID;
    this.title = Title;
    this.description = Description;
    this.KVK = KVK;
    this.images = Image;
  }
}
