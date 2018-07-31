export class Student {
  // val: string = "blue";

  private _name: string;
  public get Name(): string {
    return this._name;
  }
  public set Name(name: string) {
    this._name = name;
  }

  getMathScore(): Number {
    return 100;
  }
}
