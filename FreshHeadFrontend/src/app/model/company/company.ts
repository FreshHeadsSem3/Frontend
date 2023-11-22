import { Guid } from 'guid-typescript';

export class Company {
  public id: Guid;
  public title: string;
  public description: string;
  public KVK: number;
  public images: string[] = [];
  public link1: string;
  public link2: string;
  public link3: string;
  public link4: string;


  constructor(ID: Guid, Title: string, Description: string, KVK: number, Image: string[], link1: string, link2: string, link3: string, link4: string) {
    this.id = ID;
    this.title = Title;
    this.description = Description;
    this.KVK = KVK;
    this.images = Image;
    this.link1 = link1;
    this.link2 = link2;
    this.link3 = link3;
    this.link4 = link4;
  }
}
