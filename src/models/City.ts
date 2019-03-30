export class City {
  public name: string
  public id: string;
  public main: {temp: number};
  public weather: Array<{main: string}>;
  public dt: number;
  public dt_txt: string;
  constructor() {
    this.name = '';
    this.id = '';
    this.main = { temp: 0 };
    this.weather = [{main: ''}];
    this.dt = 0;
    this.dt_txt = '';
  }
}