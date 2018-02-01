export class ValveReplacement {
  constructor (
    public id?: number,
    public replaced_on?: Date,
    public replaced_by?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public system_valves?: Array<Number>
  ) {
    if (this.system_valves === undefined || this.system_valves === null) this.system_valves = [];
  }
}
