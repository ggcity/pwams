export class RootFoaming {
  constructor (
    public id?: number,
    public foamed_on?: Date,
    public foamed_by?: string,
    public remarks?: string,
    public pipes?: Array<number>
  ) {
    if (this.pipes === undefined || this.pipes === null) this.pipes = [];
  }
}
