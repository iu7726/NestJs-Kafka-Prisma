export class UserGetEvent {
  constructor(public readonly id: number) { }

  toString(): string {
    return JSON.stringify({
      id: this.id,
    });
  }
}
