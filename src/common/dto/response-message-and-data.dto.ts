import { Expose } from 'class-transformer';

/**
 * @summary 메시지 & 데이터 폼 DTO
 */
export class ResponseDataAndMessageDto<T> {
  @Expose()
  data: T;

  @Expose()
  message: string;
}
