export class WaterMainRepair {
  constructor (
    public id?: number,
    public repaired_on?: Date,
    public repaired_by?: string,
    public main_type?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public features?: Array<Number>
  ) {
    if (this.features === undefined || this.features === null) this.features = [];
  }
}
