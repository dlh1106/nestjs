import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

/**
 * @author 이기봉
 * @since 2023.07.21
 * @summary 공통 테이블 네이밍 전략
 * @comment
 *    - 엔티티클래스명 snakeCase 변경
 *    - '_tb' prefix
 *    - name 속성 추가시엔 적용되지 않도록
 */
export class TableNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  private tbNamePrefix: string = '_tb';

  tableName(className: string, customName: string): string {
    const tbName = customName ? customName : `${snakeCase(className)}${this.tbNamePrefix}`;
    return tbName;
  }
}
