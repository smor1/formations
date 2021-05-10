export class Movie {
  picture: string;
  abstract: string;
  toto: string;

  constructor(
    public title: string,
    public director: string,
    public actors: string[],
  ) {
  }
}
