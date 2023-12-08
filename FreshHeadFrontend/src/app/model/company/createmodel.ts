export class Createmodel {
  public Title: string;
  public Description: string;
  public KVK: number;
  public Images: string[] = [];
  public UserEmail: string;
  public UserPassword: string;
  public Link1: string;
  public Link2: string;
  public Link3: string;
  public Link4: string;

  constructor(Title: string, Description: string, KVK: number, Image: string[], UserEmail: string, UserPassword: string, Link1: string, Link2: string, Link3: string, Link4: string) {
    this.Title = Title;
    this.Description = Description;
    this.KVK = KVK;
    this.Images = Image;
    this.UserEmail = UserEmail;
    this.UserPassword = UserPassword;
    this.Link1 = Link1;
    this.Link2 = Link2;
    this.Link3 = Link3;
    this.Link4 = Link4;
  }
}
