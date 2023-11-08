import { Guid } from 'guid-typescript';

export class Createmodel {
  public Title: string;
  public Description: string;
  public KVK: number;
  public Images: string[] = [];


  constructor(Title: string, Description: string, KVK: number, Image: string[]) {
    this.Title = Title;
    this.Description = Description;
    this.KVK = KVK;
    this.Images = Image;
  }
}
