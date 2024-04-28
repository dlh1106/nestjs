# Graphql 시작

- 패키지 설치

```bash
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

```bash
yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

#

## Graphql Module

- CWGraphQLModule 모듈 생성

```javascript
// src/graphql/graphql.module.ts
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      {
        driver: ApolloDriver,
        playground: true,
        autoSchemaFile: 'src/graphql/schema/schema.gql',
      },
    }),
  ],
  providers: [],
})
export class CWGraphQLModule {}
```

- 앱모듈에 CWGraphQLModule 바인딩

```javascript
const coreModules = [ConfigureModule, DatabaseModule, CWGraphQLModule]; // 추가.
const providedModules = [ProductModule];

@Module({
  imports: [...coreModules, ...providedModules],
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

- 프로젝트 구동하여 각 모듈 의존성 주입 로그 확인

```bash
[Nest] 2813  - 07/06/2023, 9:51:43 AM     LOG [InstanceLoader] CWGraphQLModule dependencies initialized +0ms
```

#

## 아폴로 샌드박스

- 플레이 그라운드 활성화 여부를 false
- 아폴로 샌드박스 바인딩
- 프로젝트 구동 & http://localhost:3000/graphql 확인

```javascript
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      {
        driver: ApolloDriver,
        playground: false, // 플레이 그라운드 활성화 여부
        autoSchemaFile: 'src/graphql/schema/schema.gql',
        plugins: [ApolloServerPluginLandingPageLocalDefault()], // 아폴로 샌드박스 바인딩
      },
    })
  ],
  providers: [],
})
export class CWGraphQLModule {}
```

**[장점]**

- 플래이그라운드 보다 편리한 기능
- 일일히 필요한 필드를 수기로 적는것이 아닌, UI 클릭으로 원하는 필드 셋팅 가능.
- docs : https://www.apollographql.com/blog/announcement/platform/apollo-sandbox-an-open-graphql-ide-for-local-development/

#

## Resolver

- Graphql은 Mutation 미지원하기로 하여, Query만 예시를 들었음.

### [주의]

- 중복되는 리졸버 함수가 있어선 안된다.
- findAllProduct(), findOneProduct() 같이 유니크 한 명칭을 사용.

```javascript
//src/provided-modules/product/product.resolver.ts
@Resolver(() => ProductObject)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductListObjectType)
  async findAllProduct() {
    const res = await this.productService.findAll();
    res.list = plainToInstance(ProductObject, res.list);
    return plainToInstance(ProductListObjectType, res);
  }

  @Query(() => ProductObject)
  async findOneProduct(@Args('id', { type: () => Int }) id: number) {
    const product = await this.productService.findOne(id);
    return plainToInstance(ProductListObjectType, product);
  }
}
```

#

## ObjectType

- Graphql 에서의 응답용 객체이다. 이 객체를 가지고 스키마가 작성된다.
- ObjectType은 Graphql 요청에 대한 응답만을 담당하는 객체임으로, RestAPI 측의 ResponseDTO와 분리하였다.
- 단일 책임 원칙

```javascript
//src/provided-modules/product/object-type/response/product.object-type.ts
@ObjectType()
export class ProductObject {
  @Field(() => ID)
  p_id: number;

  @Field()
  p_name: string;

  @Field()
  p_price: number;

  @Field(() => ProductDetailObject, { nullable: true }) // 추가되기 이전 상품들은 없기 때문에 내보낼때 null 을 허용해야한다.
  p_product_detail: ProductDetailObject;

  @Field(() => [ProductOptionObject], { nullable: 'items' }) // 'items' : 필드가 배열 형태일 때, 배열자체는 필수 & 배열 아이템들 선택적
  p_product_options: ProductOptionObject[];

  @Field(() => [ProductTagObject], { nullable: 'items' })
  p_product_tags: ProductTagObject[];
}
```

#

# 최적화

- GraphQL은 다중 요청이 가능하므로 클라이언트는 한 번에 여러 요청을 보낼 수 있다.
- 그러나 이로 인해 서버 과부하가 발생할 수 있으므로 요청 제한이 필요할 수 있다.
- 아래의 내용은 리소스 **측정**과 **제한**에 도움이 되는 방법을 소개한다.

현재는 GraphQL에 초점을 맞추고 있지만, 사실 부하가 발생하는 영역을 파악하고 개선하는 것은 GraphQL에만 국한되지 않고 항상 다루어야 하는 과제이다.

### 먼저 GraphQLModule 에서 부터 소개하겠다

```javascript
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      {
        driver: ApolloDriver,
        playground: false,
        autoSchemaFile: 'src/graphql/schema/schema.gql',
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        buildSchemaOptions: {
          fieldMiddleware: [loggerFieldMiddleware], // Graphql 로거 필드 미들웨어
        },
      },
    }),
  ],
  providers: [
    ComplexityPlugin, // 요청수 & 필드 복잡성 제한을 위한 플러그인
    LoggerPlugin // Graphql 요청 전용 로거 플러그인
  ],
})
export class CWGraphQLModule {}
```

## Graphql 로거 필드 미들웨어

- DB 조회 후 **소스내에서 '필드'당 처리되는 시간**을 모니터링하는 역할이다.
- 이를 통해 성능개선하는 데 도움.
- 아래는 필드 모니터링 결과.

```javascript
// src/graphql/graphql-loggers/logger-field.middleware.ts
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [p_id] +0ms 3
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [p_name] +0ms 안쓰러운 냉장고
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [p_price] +0ms 0
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [p_product_options] +2040ms [object Object]  <-- 개선이 필요 -->
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [p_images] +1530ms [object Object] <-- 개선이 필요 -->
[Nest] 3049  - 07/07/2023, 12:55:51 AM     LOG [pd_description] +1ms 냉장고 설명
```

#

## Graphql 로거 플러그인

- 요청 시작부터 응답까지 동작을 추적하고 디버깅, 성능 모니터링 및 개선에 도움.
  - 요청 연산 유형과 해시: 어떤 연산이 수행되었는지 파악.
  - 요청 쿼리: 클라이언트가 요청한 데이터와 필드 관계를 확인.
  - 응답 시간: 각 연산의 실행 시간을 추적하고 성능 개선에 활용.
  - 응답 데이터: 클라이언트에게 반환되는 데이터의 구조와 내용을 검토.

### 모니터링 결과

- 아래는 두 가지의 쿼리를 요청한 FindProductAndProductList 요청에 대한 모니터링 결과.

```javascript
// src/graphql/graphql-loggers/logger.plugin.ts
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [연산 유형] FindProductAndProductList
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [요청 연산 해시] 36045653d6ff04882162156390232463bf7f68ea970e885e8a27d1e64253a21e
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [요청 쿼리]
query FindProductAndProductList($findOneProductId: Int!) {
  findOneProduct(id: $findOneProductId) {
    p_id
    p_name
    p_price
    p_product_detail {
      pd_id
      pd_description
    }
  }
  findAllProduct {
    list {
      p_id
      p_name
    }
    metaData {
      totalCount
    }
    links {
      previous
      next
    }
  }
}
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [ProductResolver] [graphql] Query "findAllProduct" 4ms
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [GlobalResponseTransformInterceptor] ResponseTransform
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [ProductResolver] [graphql] Query "findOneProduct" 6ms
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [GlobalResponseTransformInterceptor] ResponseTransform
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG [LoggerPlugin] GraphQL 응답.
[Nest] 3077  - 07/07/2023, 2:48:44 AM     LOG Object:
{
  "findOneProduct": {
    "p_id": "3",
    "p_name": "안쓰러운 냉장고",
    "p_price": 10000,
    "p_product_detail": {
      "pd_id": "3",
      "pd_description": "냉장고 설명"
    }
  },
  "findAllProduct": {
    "list": [...데이터생략],
    "metaData": {
      "totalCount": 11
    },
    "links": {
      "previous": "localhost:3000/product/?page=1&limit=10",
      "next": "localhost:3000/product/?page=2&limit=10"
    }
  }
}
```

#

## 쿼리 복잡성 & 요청 제한

- GraphQL 요청의 복잡성을 제한하고 모니터링하면서 서버의 안정성과 성능을 개선하는데 도움.

- 복잡성 제한 설정: 요청에 대한 최대 복잡성을 제한할 수 있다.
- 필드별 복잡성 제한: 특정 필드의 복잡성 값을 설정할 수 있다.
- 복잡성 계산: 쿼리의 복잡성을 계산하고 제한을 초과하는지 여부를 확인할 수 있다.
- 예외 처리: 복잡성 제한을 초과할 경우 예외를 발생시킵니다.
- 로그 기록: 요청의 복잡성 값을 로그에 기록하여 추적 및 모니터링할 수 있다.

### 요청에 대한 Complexity 모니터링

```javascript
[Nest] 3091 - 07/07/2023, 2:54:29 AM DEBUG [Query Complexity] 16
```

```javascript
@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    // 1. 복잡성 제한 값 설정
    const maxComplexity = 200; // 이 수치를 얼마나 줄 것 인가는 test를 통해 조정해나가야함.

    // 2. GraphQL 스키마 정보 가져오기
    const { schema } = this.gqlSchemaHost;

    // 3. 특정 필드 복잡도 주기.
    // 특정 필드의 처리 시간이 길다면 기본값1 보다 높은 값으로 조정하여 제한을 둘 수 있다.
    setComplexityField(schema, 'ProductObject', 'p_product_options', 3);

    return {
      async didResolveOperation({ request, document }) {
        // 3. 쿼리 복잡성 계산
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            // 4. 필드 확장을 고려한 복잡성 추정기
            fieldExtensionsEstimator(),
            // 5. 단순 추정기 : 모든 필드의 복잡성 값은 1로 간주
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        // 6. 복잡성 제한을 초과할 경우 예외 발생
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        Logger.debug(complexity, 'Query Complexity');
      },
    };
  }
}
```
