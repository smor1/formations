export class Post {
  constructor(public title: string,
              public content: string,
              public loveIts: number,
              public createdAt?: Date) {
    this.createdAt = new Date();
  }
}
