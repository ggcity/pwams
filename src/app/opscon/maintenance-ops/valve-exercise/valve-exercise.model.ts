export class ValveExercise {
  constructor (
    public id?: number,
    public exercised_on?: Date,
    public exercised_by?: string,
    public turns?: number,
    public torque?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public system_valves?: Array<Number>
  ) {
    if (this.system_valves === undefined || this.system_valves === null) this.system_valves = [];
  }
}
