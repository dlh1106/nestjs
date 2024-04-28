## Jest 를 활용한 e2e Test

시작하기 전에 문제 하나를 해결하고 시작하겠다.

### 소스코드 경로와 Jest경로 매핑

Nestjs의 소스코드 경로와 Jest에서 사용하는 경로가 서로 다르다.

- 소스코드 경로 : <프로젝트디렉토리>/src/
- jest e2e 경로 : <프로젝트디렉토리>/test/

때문에 jest 에게 소스코드 경로 디렉토리를 매핑시켜주는 작업이 필요하다.

- test/jest-e2e.json 에 다음 속성을 추가한다.
- 문자열 패턴 정규식을 통해, src/로 시작하는 import 들을 를 전부 <rootDir>/../src/로 매핑.
- test/jest-e2e.json
```json
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
```

#

### app 설정

- NestJS의 E2E(end-to-end) 테스트를 위해서는 main.ts 파일과 비슷한 구성을 가진 테스트 앱 설정이 필요하다.

```javascript
//src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   *  이 부분에서 프로젝트 런타임때 필요한 핵심 프로바이더들이 정의되어 있다면,
   */
  await app.listen(3000);
}
bootstrap();
```

```javascript
//test/app.e2e-spec.ts
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  /**
   *  이 부분에서 똑 같이 맞춰 주어야 한다.
   */
  await app.init();
});
```

- 만약 필자가 제안한 보일러플레이트 구조를 따랐다면, 이부분을 건들 필요가 없다.

#

### 테스트 대상 선정

- 예를들어 ProductModule 대상으로 선정 하고 싶다면

```javascript
@Module({
  imports: [...coreModules, ...libraryModules, ProductModule], // 와 같이 모듈을 장착 or 스위칭하여 테스트 범위를 선택.
  providers: [
    {
      provide: APP_PIPE,
      useFactory: async (configService: ConfigService) =>
        new ValidationPipe(
          await configService.getOrThrow('validationPipeOptions'),
        ),
      inject: [ConfigService],
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

- jest 파일 대상 선정방법
- foo.e2e-spec.ts 이라 하였을때 아래와 같이 선정 가능.

```json
{
  "testRegex": "foo\\.e2e-spec\\.ts$"
}
```

#

### 테스트 코드 작성

- 아래는 product 컨트롤러의 함수들을 테스트하는 예시이다.
- ProductGenerator 클래스는 faker 패키지를 활용한 랜덤상품데이터 생성기를 만들어 테스트에 활용한 모습이다. 자세한 내용은 파일소스를 참고하길 바란다.

```javascript
describe('/product', () => {
  let newProduct; // 생성된 상품을 가지고 테스트를 이어 가기위한 변수

  // 상품 리스트
  it('GET', async () => {
    return await request(app.getHttpServer()).get('/product').expect(200);
  });

  // 상품 생성
  it('POST', async () => {
    return await request(app.getHttpServer())
      .post('/product')
      .send(ProductGenerator.randomProductDto())
      .expect(201)
      .then((response) => {
        newProduct = response.body.data; // 상품을 변수에 저장
      });
  });

  // 상품 조회
  it('GET /:id', async () => {
    return await request(app.getHttpServer())
      .get(`/product/${newProduct.p_id}`)
      .expect(200);
  });

  // 상품 수정
  it('Patch', async () => {
    return await request(app.getHttpServer())
      .patch(`/product/${newProduct.p_id}`)
      .send(ProductGenerator.randomProductDto())
      .expect(200);
  });

  // 상품 삭제
  it('DELETE /:id', async () => {
    return await request(app.getHttpServer())
      .delete(`/product/${newProduct.p_id}`)
      .expect(200);
  });
});
```
