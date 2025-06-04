export class Category {
  _id: string | any;
  name: string;
  icon: string;

  constructor(_id: string, name: string, icon: string) {
    this._id = _id;
    this.name = name;
    this.icon = icon;
  }
}