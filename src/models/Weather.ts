export class Weather {
  public name: string
  public id: string;
  public main: {temp: number, pressure: number, humidity: number};
  public weather: Array<{main: string}>;
  public dt: number;
  public dt_txt: string;
  public wind: {speed: number, deg: number};
  constructor() {
    this.name = '';
    this.id = '';
    this.main = { temp: 0, pressure: 0, humidity: 0 };
    this.weather = [{main: ''}];
    this.dt = 0;
    this.dt_txt = '';
    this.wind = { speed: 0, deg: 0 };
  }
}

