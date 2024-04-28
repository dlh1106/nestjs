## DTO 와 Entity 의 분리

### [WHEN] 먼저 이벤트 루프안에서의 트랜스폼 권장 위치를 확인 해보자.

- 라우터 핸들러에 요청온 param 은 1차적으로 DTO 의 class-validate 데코레이터로 유효성 검사를 하게됨.
- 이제 통과된 DTO 객체를 Entity로 **트랜스폼**.
- 트랜스폼된 Entity를 typeOrm DB 조작 메서드(save, update, insert)에게 넘김.
- typeOrm 메서드가 반환한 Entity 를 ResponseDto 로 **트랜스폼**.
- 이제 라우터(컨트롤러)에서 DTO 를 리턴.

#

### [WHY] Entity 객체를 typeOrm DB 조작 메서드에 전달하는 것이 권장되는 이유

- 타입 안정성: TypeORM은 엔티티의 타입을 기반으로 적합한 쿼리를 생성하여 타입 안정성을 보장한다.
- 단일책임원칙 : DTO를 그대로 DB 상호작용에 이용한다면, DTO의 변경이 곧 DB에 영향을 주기 때문에 지향해야 한다.

때문에 DTO와 엔티티를 분리하여 각각의 역할에 집중할 수 있도록 관리하는 걸 제안한다.

#

### [WHY] 응답시 Entity가 아닌 DTO 를 분리하여 사용하는 것이 권장되는 이유

1. **보안 및 데이터 노출 제어**:

- Entity는 데이터베이스에 저장된 실제 데이터를 나타내는 객체.
- 데이터베이스의 구조와 민감한 정보가 클라이언트로 노출될 수 있음.
- DTO를 사용하면 필요한 데이터만 포함시킬 수 있고, 민감한 정보를 필터링하거나 가공할 수 있음.
- DTO를 사용하면 Entity와 완전히 분리되어 있기 때문에, Entity 구조의 변경이 직접적인 영향을 주지 않음.

2. **유연성**:

- DTO는 API의 요구사항에 맞게 설계될 수 있음.
- 필요한 데이터만을 가진 DTO를 사용하면 API의 응답 구조를 명확히 정의하고 유연하게 조정할 수 있음.
- 또한, 여러 개의 DTO를 조합하여 하나의 DTO로 만들 수도 있음.

## 정리

- Entity는 데이터베이스와의 상호작용하는 데에 사용
- DTO는 클라이언트로부터 받는 요청과 응답 데이터의 구조 그리고 포맷을 조정하는 데에 사용

#

## [HOW] 

- 패키지에서 제공하는 함수로 데이터 변환이 가능하다. [트랜스폼 방법](https://git.nm.koapp.com/npm-dev/backend/nestjs-typeorm-tutorial/-/blob/develop/README.md#dto-entity-%EC%9D%98-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8F%BC)

#

## 응답 객체 DTO vs Interface

- 아래와 같은 인터페이스가 있다고 하자.

```javascript
// test.interface.ts
interface testInterface {
  A: string;
  B: string;
}
```

- 프로젝트를 구동(npm run start) 하여 실제 런타임에서 사용될 코드를 살펴보면
- dist/test.interface.js

```javascript
//# sourceMappingURL=test.interface.js.map
```

- 이렇게 인터페이스가 사라진 것을 볼 수 있다.
- TypeScript 인터페이스는 개발 시간에 타입 체크와 IDE 지원을 위해 사용된다.
- 즉, 런타임 환경에서는 제거되며 멤버의 자료형은 보장되지 않는다.
- 쉽게말해 런타임에선 A가 string 임을 보장받을 수 없게되는 것이다.

## 응답 Response DTO

- 응답 데이터를 담는 DTO는 그 자체로만 활용.
- DTO 안에 여타 기능함수들 탑제 사용 안하도록 제안.
- 단일 책임 원칙.

### @Expose() 그리고 plainToInstance() 의 옵션

- 아래와 같이 포함시킬 맴버를 확실히 모두 @Expose() 를 붙이는 것을 제안.

```javascript
export class ResponseProductDto {
  @Expose()
  p_id: number;

  @Expose()
  p_name: string;

  @Expose()
  p_price: number;
}
```

- 그리고 plainToInstance() 의 옵션중 excludeExtraneousValues 를 true로 설정하도록 제안.

```javascript
// 만약에 아래처럼 UserDTO 가 있다고 하였을때
export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

const userInput = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 25,
};

const userDTO = ExcludeExtraneousValues(UserDTO, userInput);
console.log(userDTO); // @Expose() 선언되지 않은 속성인 age는 제외.
```

- 따라서 @Expose() 를 선언한 맴버만을 포함시키기 위해서 제안한다.
- 이를 사용하지 않으면 혼동을 유발할 수 있다. swagger 에서 응답구조를 DTO로 사용할텐데 정의된 DTO 외에 것이 응답하게된다.

#
