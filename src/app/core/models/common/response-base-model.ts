export interface ResponseBase<Data> {
  data: Data;
  statusCode: number;
  message: string;
  success: boolean;
}
