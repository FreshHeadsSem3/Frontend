import { Guid } from 'guid-typescript';

export class Category {
  public dealCategoryID: Guid;
  public name: string;


  constructor(ID: Guid, Name: string) {
    this.dealCategoryID = ID;
    this.name = Name;
  }
}
