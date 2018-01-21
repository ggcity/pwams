export class Hotspot {
  constructor (
    public id?: number,
    public date?: Date,
    public who?: string,
    public type?: string,
    public footage?: number,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public pipes?: Array<Number>
  ) {
    if (this.pipes === undefined || this.pipes === null) this.pipes = [];
  }
}
