export class GateValve {
  constructor (
    public id?: number,
    public inspected_on?: Date,
    public inspected_by?: string,
    public size?: string,
    public valve_number?: string,
    public main_type?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public features?: Array<Number>
  ) {
    if (this.features === undefined || this.features === null) this.features = [];
  }
}
