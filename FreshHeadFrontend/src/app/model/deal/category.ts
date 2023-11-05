import { Guid } from 'guid-typescript';

export class Category {
  public id: Guid;
  public name: string;


  constructor(ID: Guid, Name: string) {
    this.id = ID;
    this.name = Name;
  }
}