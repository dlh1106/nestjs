## 모듈 생성 예시

- 예를 들어 'user' 라는 모듈을 생성한다 하였을때

### 기본구조

1. 제너레이터 명령어

- REST API 리소스 생성

```
nest g res provided-modules/user --no-spec
```

- 리졸버 생성

```
nest g r provided-modules/user --no-spec
```

2. 생성 경로 확인

```
src/
├── provided-modules/
│   └── user/  <-- 위 제너레이터 명령어로 생성시 이곳에 생성됨. -->
```

3. graphql 응답 객체를 관리하는 디렉토리 생성

```
user/
├── dto/
├── entities/
├── object-type/ <-- ObjectType 클래스들 관리하는 디렉토리 -->
├── product.controller.ts
├── product.resolver.ts
├── product.service.ts
└── product.module.ts
```

### user 모듈에서 다른 프로바이더들이 필요할경우

- 필요때 마다 생성하여 user/ 하위에 위치시키면서 작업.

```
user/
├── dto/
├── object-type/
├── repositories/ <-- user 모듈내에서 사용될 커스텀 레포지토리가 필요한 경우 생성 -->
├── pipe/         <-- user 모듈내에서 사용될 파이프가 필요한 경우 생성 -->
├── interceptor/  <-- user 모듈내에서 사용될 인터셉터가 필요한 경우 생성 -->
├── product.controller.ts
├── product.resolver.ts
├── product.service.ts
└── product.module.ts
```

#

## 보일러플레이트 구조

- NestJS는 모듈 시스템으로 애플리케이션을 구성하기 때문에 이 장점을 잘 활용할 수 있는 구조를 찾아보았다.
- 각 모듈내에서 사용되는 프로바이더는 필요할때마다 모듈내에서 생성해 위치시켜 사용하는 것을 제안.

```shell
root/
├── app-data/
│       └── logs/       <-- 로그 위치 -->
├── migration-resource/ <-- 마이그레이션 설정파일 위치 -->
│       └──migrations/  <-- 마이그레이션 up, down 파일 위치 -->
└── src/
      ├── common/  <-- 전역에서 쓰일 공통 dto, filters, interceptors, guards, decorators, strategies 와 같은 nestjs 계층구조 폴더들이 위치 -->
      ├── database/          <-- 전역에서 쓰일 데이터베이스 모듈이 위치 -->
      ├── graphql/           <-- graphql 관련 프로바이더 & 모듈 위치 -->
      ├── library/           <-- 특정 기능을 수행하기 위한 도구나 유틸리티들이 위치  -->
      ├── provided-modules/  <-- 제공하는 모듈들이 위치할 디렉토리 -->
      │       └── product/      <-- 실제 제공할 서비스 단위 디렉토리 -->
      │               ├── dto/            <-- 상품 모듈안에서 사용될 dto 들이 위치 -->
      │               ├── entities/       <-- 상품 모듈안에서 사용될 entity 들이 위치 -->
      │               ├── object-type/    <-- 상품 모듈안에서 사용될 objectType 들이 위치 -->
      │               ├── repositories/   <-- 상품 모듈안에서 사용될 custom repository 들이 위치 -->
      │               ├── pipe/
      │               ├── interceptor/
      │               ├── product.controller.ts
      │               ├── product.resolver.ts
      │               ├── product.service.ts
      │               └── product.module.ts
      ├── app.module.ts
      └── main.ts
```

### provided-modules 디렉토리

- 만약에 제공 모듈들을 묶는 디렉토리가 없다면, 디렉토리가 생겨날때마다 알파벳순으로 sort 되어 뒤죽박죽 된다.

- 추가 후보 : provided-modules/ , cw-modules/ , apis/

#

## 모듈 관리

- 프로젝트에 쓰일 설정관련 옵션들과 모듈 관리 방법 제안.

```shell
src/
├── common/
├── configures/
│   ├── options/ <-- 필요할때마다 여러 옵션들을 정의 -->
│   │   ├── typeorm-module-options.config.ts
│   │   └── validate-pipe-options.config.ts
│   └── configure.module.ts <--옵션들을 담고 있는 설정 모듈-->
├── database/
├── provided-modules/
│   ├── product/
│   ├── order/
│   └── user/
└── app.module.ts
```

### 설정 옵션 관리

- registerAs()은 NestJS의 설정 관리를 위한 공식 권장 방법 중 하나이다.
- 아래는 registerAs() 로 설정을 관리하는 예시이다.

#### TypeOrmModuleAsyncOptions

```javascript
// src/configures/options/typeorm-module-options.config.ts
export const typeOrmOption = registerAs(
  'typeOrmOption', // 실제 개발시엔 좀 더 목적이 명확하도록 네이밍
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    autoLoadEntities: true, // 이 옵션을 true 로 줌으로서, entity를 수동으로 알릴 필요가 없음.
    synchronize: false,
    logging: true,
    namingStrategy: new DefaultNamingStrategy(),
  }),
);
```

#### ConfigureModule

- typeOrmOption 을 ConfigureModule을 통해 의존성 주입 컨테이너에 등록

```javascript
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [typeOrmOption], // 추가
    }),
  ],
})
export class ConfigureModule {}
```

## DatabaseModule

```shell
src/
├── common/
├── configures/
├── database/
│   └── database.module.ts <--데이터 베이스 모듈 위치-->
├── provided-modules/
└── app.module.ts
```

### typeOrmOption 을 DatabaseModule에 의존성 주입.

- 옵션을 가져온 모습, 동적으로 필요한 옵션을 스위칭 관리. 조건문을 통한 동적 관리도 가능.

```javascript
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        await configService.getOrThrow('typeOrmOption'), // 옵션.
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
```

### getOrThrow()

- getOrThrow() 을 사용한 이유는, 이 함수는 불러올 옵션이 없을 경우 에러를 반환한다.
- 만약, 없는 옵션을 불러왔을 경우 해당 모듈에 필수적인 옵션이 아닐경우엔 빈값이 장착되어도 구동이 정상적으로 되기 때문에 원하는 동작이 되지 않을 수 있다.

### AppModule 에 바인딩

```javascript
const coreModules = [ConfigureModule, DatabaseModule]; // 공동 코어 모듈들.

@Module({
  imports: [...coreModules, ProductModule, UserModule, DiscountModule], // 바인딩
  providers: [],
})
export class AppModule {}
```

#

## 전역 파이프 설정 & 의존성 주입

### ValidationPipeOptions

- 전역 파이프의 옵션설정관리 방법 제안.

```javascript
// src/configures/options/validate-pipe-options.config.ts
export const validationPipeOptions = registerAs(
  'validationPipeOptions',
  (): ValidationPipeOptions => ({
    whitelist: true, // DTO 맴버가 아니면 전달자체가 되지 않는 옵션.
    forbidNonWhitelisted: true, // DTO 맴버가 아니면 요청을 막을 수 있음. error 를 반환 (whitelist: true와 같이 사용해야함.)
    transform: true, // 컨트롤러 매개변수 타입으로 transform
  }),
);
```

### ConfigureModule에 validationPipeOptions 추가

```javascript
// src/configures/configure.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [typeOrmOption, validationPipeOptions], // 추가
    }),
  ],
})
export class ConfigureModule {}
```

### app 모듈에 validationPipeOptions 의존성 주입 & 전역 파이프 의존성 주입

```javascript
// src/app.module.ts
@Module({
  imports: [...coreModules, ProductModule],
  providers: [
    {
      provide: APP_PIPE, // 의존성 주입
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

#

## Module 분리 장점

- **코드 구조화**: 애플리케이션 설정과 구성을 한 곳에 집중하여 코드 구조를 명확하게 유지하고 설정 변경이 쉬워짐.

- **모듈 분리와 재사용 & 확장성** : 독립적인 모듈로 애플리케이션을 분리하여 필요에 따라 모듈을 추가하거나 제거할 수 있으며, 애플리케이션의 구성이 용이함.

- **테스트 용이성**: 모듈을 잘 분리하면 모듈 단위 테스트 시 다른 모듈의 영향을 최소화할 수 있고, 테스트 범위 선택 자유도가 높아짐.

- NestJS는 모듈 시스템으로 애플리케이션을 구성하므로 모듈들을 잘 관리하여 **관심사를 분리**하는 것이 중요

#

## 전역 프로바이더

- 프로젝트내 전역 프로바이더들 소개
- 응답, 예외를 가로채 공통된 폼으로 응답 & 로깅을 담당하는 전역 프로바이더들이 의존성 주입 되어있다.

### 전역 로거

- src/common/interceptors/global-logging.interceptor.ts
- http 요청과 graphql 로깅하도록 구현.

### 전역 응답 인터셉터

- src/common/interceptors/global-response-transform.interceptor.ts
- http 요청과 graphql 응답을 가로채 가공 하도록 구현.
- 현재 까지 필요성이 많이 없지만, 추 후 message가 code 로 관리될 경우 이 곳에서 code 를 message 로 매핑하는 작업을 수행해도 좋을 것같다.

### 전역 예외 필터 추가

- src/common/filters/global-exception.filter.ts
- 모든 예외를 { statusCode, message } 구조로 응답을 가공하여 리턴하도록 작업됨.
- 현재는 모든 에러 메시지를 그대로 보여주고 있어 크리티컬한 예외는 "알 수 없는 예외가 발생하였다." 와 같은 메시지 변환 작업이 추가로 필요하다.

### 전역 필터를 AppModule에 의존성 주입

- app.main.ts 에 정의하는 방식도 있지만, nest에선 아래와 같은 방식을 권장.

```javascript
const coreModules = [ConfigureModule, DatabaseModule];

@Module({
  imports: [...coreModules, ProductModule],
  providers: [
    {
      provide: APP_FILTER, // 전역 필터 의존성 주입
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

#

## 필요 패키지

- typeorm 패키지

```shell
yarn add @nestjs/typeorm typeorm mysql2
npm install @nestjs/typeorm typeorm mysql2
```

- config 패키지

```shell
yarn add @nestjs/config
npm install @nestjs/config
```

- class-validator 패키지 설치

```shell
yarn add class-validator
npm install class-validator
```
