export class SewerCleaning {
  constructor (
    public id?: number,
    public repaired_on?: Date,
    public description?: string,
    public material_type?: string,
    public material_feet?: string,
    public feet_from?: string,
    public stream?: string,
    public remarks?: string,
    public repaired_by?: string,
    public photos?: Array<string>,
    public extent?: [number, number, number, number],
    public pipes?: Array<number>
  ) {
    if (this.pipes === undefined || this.pipes === null) this.pipes = [];
  }
}
