import { HttpCode } from "../utils/httpCode";

export default class ErrorHttp extends Error {
  public readonly statusCode: HttpCode;
  public readonly message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}