export class ManholeInspection {
  constructor (
    public id?: number,
    public inspector?: string,
    public inspected_on?: Date,
    public ring_and_cover?: string,
    public material?: string,
    public size?: string,
    public shaft?: string,
    public vermin?: string,
    public inflow?: boolean,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public manholes?: Array<Number>
  ) {
    if (this.manholes === undefined || this.manholes === null) this.manholes = [];
  }
}
