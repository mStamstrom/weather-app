export class Weather {
  public name: string
  public id: string;
  public main: {temp: number};
  public weather: Array<{main: string}>;
  public dt: number;
  public dt_txt: string; //tslint:disable-line
}