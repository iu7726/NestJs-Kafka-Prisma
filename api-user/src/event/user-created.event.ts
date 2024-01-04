export class UserCreatedEvent {
  constructor(
    public readonly email: string,
    public readonly password: number,
    public readonly name: string,
  ) { }
}
