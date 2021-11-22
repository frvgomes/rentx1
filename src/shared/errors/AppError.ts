export class AppError {
  public readonly menssage: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.menssage = message;
    this.statusCode = statusCode;
  }
}
