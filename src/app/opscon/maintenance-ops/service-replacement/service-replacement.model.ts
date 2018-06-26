export class ServiceReplacement {
  constructor (
    public id?: number,
    public replaced_on?: Date,
    public replaced_by?: string,
    public service_type?: string,
    public old_service_type?: string,
    public replacement_type?: string,
    public meter_number?: string,
    public new_box?: string,
    public remarks?: string,
    public extent?: [number, number, number, number],
    public features?: Array<Number>
  ) {
    if (this.features === undefined || this.features === null) this.features = [];
  }
}
