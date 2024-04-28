import { faker } from '@faker-js/faker/locale/ko';

/**
 * @author 이기봉
 */
export class CommonGenerator {
  /**
   * @param dtoClass
   * @return 해당 클래스 맴버를 가지는 객체반환
   */
  public static convertToInterface<Dto>(dtoClass: new () => Dto) {
    type DtoKeys = keyof Dto;
    type DtoInterface = Pick<Dto, DtoKeys>;
    return {} as DtoInterface;
  }

  /**
   * @return 3 글자 한글 사람 이름 반환
   */
  public static humanName() {
    const fullName = faker.person
      .fullName({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      })
      .replace(/\s/g, '');
    return fullName;
  }

  /**
   * @param number
   * @return 맨 앞자리수만 남기고 0 으로 변환 ex) 9386 -> 9000
   */
  public static createZeroFill(number: number): number {
    if (number === 0) {
      return 0;
    }
    const absoluteNumber = Math.abs(number);
    const firstDigit = Math.floor(
      absoluteNumber / 10 ** Math.floor(Math.log10(absoluteNumber)),
    );
    let zeroFilledString = firstDigit.toString();
    zeroFilledString += '0'.repeat(Math.floor(Math.log10(absoluteNumber)));
    return parseInt(zeroFilledString);
  }
}
