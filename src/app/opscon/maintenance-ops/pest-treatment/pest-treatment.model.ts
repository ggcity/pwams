export class PestTreatment {
  constructor (
    public id?: number,
    public treated_on?: Date,
    public exterminator?: string,
    public treatment?: string,
    public remarks?: string,
    public manholes?: Array<number>
  ) {
    if (this.manholes === undefined || this.manholes === null) this.manholes = [];
  }
}
