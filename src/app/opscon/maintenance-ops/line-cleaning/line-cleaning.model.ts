export class LineCleaning {
  constructor (
    public id?: number,
    public grease?: boolean,
    public roots?: boolean,
    public pipe_pieces?: boolean,
    public egg_shells?: boolean,
    public cctv?: boolean,
    public cleaned_on?: Date,
    public footage?: number,
    public percent_completed?: number,
    public remarks?: string,
    public cleaned_by?: string,
    public pipes?: Array<Number>
  ) {
    if (this.pipes === undefined || this.pipes === null) this.pipes = [];
  }
}
