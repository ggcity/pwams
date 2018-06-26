export class HydrantReplacement {
  constructor (
    public id?: number,
    public replaced_on?: Date,
    public replaced_by?: string,
    public old_type?: string,
    public replacement_type?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public features?: Array<Number>
  ) {
    if (this.features === undefined || this.features === null) this.features = [];
  }
}
