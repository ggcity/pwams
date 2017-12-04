export class RootCutting {
  constructor (
    public id?: number,
    public cut_on?: Date,
    public cut_by?: string,
    public remarks?: string,
    public pipes?: Array<number>
  ) {
    if (this.pipes === undefined || this.pipes === null) this.pipes = [];
  }
}
