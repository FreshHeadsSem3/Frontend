import { Guid } from 'guid-typescript';

export class Createmodel {
  public CompanyID: Guid;
  public Title: string;
  public Description: string;
  public Images: string[] = [];


  constructor(CompanyID: Guid, Title: string, Description: string, Image: string[]) {
    this.CompanyID = CompanyID;
    this.Title = Title;
    this.Description = Description;
    this.Images = Image;
  }
}
