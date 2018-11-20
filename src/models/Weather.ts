export class Weather {
  public name: string
  public id: string;
  public main: {temp: number, pressure: number, humidity: number};
  public weather: Array<{main: string}>;
  public dt: number;
  public dt_txt: string; //tslint:disable-line
  public wind: {speed: number, deg: number};
}

