import { ResponseDataAndMessageDto } from 'src/common/dto/response-message-and-data.dto';
import { ResponseGoodsDto } from './response-goods.dto';
import { Expose, Type } from 'class-transformer';

export class GoodsAndMessageReponseDto extends ResponseDataAndMessageDto<ResponseGoodsDto> {
  @Type(() => ResponseGoodsDto)
  @Expose()
  data: ResponseGoodsDto;
}
