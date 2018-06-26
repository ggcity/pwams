export class LargeMeterReplacement {
  constructor (
    public id?: number,
    public replaced_on?: Date,
    public replaced_by?: string,
    public type?: string,
    public size?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public features?: Array<Number>
  ) {
    if (this.features === undefined || this.features === null) this.features = [];
  }
}
