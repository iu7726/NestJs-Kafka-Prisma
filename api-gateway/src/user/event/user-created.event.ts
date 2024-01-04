export class UserCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly password: number,
    public readonly name: string,
  ) { }

  toString(): string {
    return JSON.stringify({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }
}
