## Pagination

작성자 : 이기봉

- TypeORM 라이브러리를 사용하여 페이지네이션을 제공하는 유틸리티 클래스.
- TypeORM의 queryBuilder 방식과 repository 방식 모두 사용 가능하게 구현.
- queryBuilderExecute()와 repositoryExecute() 두 가지 주요 메서드를 포함.

#

## queryBuilderExecute

- 이 메서드는 TypeORM의 SelectQueryBuilder를 사용하여 생성된 쿼리를 실행하고 페이지네이션된 결과를 반환

```javascript
static async queryBuilderExecute<T>(
  query: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
  route: string = '',
)
```

- query: 실행할 쿼리를 나타내는 SelectQueryBuilder 인스턴스.
- page (선택사항): 현재 페이지 번호. 기본값은 1.
- limit (선택사항): 페이지당 아이템 수. 기본값은 10.
- route (선택사항): 페이지네이션 링크를 생성하는 데 사용되는 라우트 또는 URL. 기본값은 빈 문자열.
- queryOptions (선택사항): 레포지토리의 find 메서드에 전달할 추가 옵션(리스트 조건)

#

## repositoryExecute

- 이 메서드는 TypeORM 레포지토리를 사용하여 쿼리를 실행하고 페이지네이션된 결과를 반환

```javascript
static async repositoryExecute<T>(
  repository: Repository<T>,
  page: number = 1,
  limit: number = 10,
  route: string = '',
  queryOptions?: FindManyOptions<T>,
)

```

- repository: 쿼리를 실행할 TypeORM 레포지토리 인스턴스
- page (선택사항): 현재 페이지 번호. 기본값은 1.
- limit (선택사항): 페이지당 아이템 수. 기본값은 10.
- route (선택사항): 페이지네이션 링크를 생성하는 데 사용되는 라우트 또는 URL. 기본값은 빈 문자열.
- queryOptions (선택사항): 레포지토리의 find 메서드에 전달할 추가 옵션(리스트 조건)

#

## 사용예시

- queryBuilderExecute를 사용하는 예시

```javascript
// [1] 조건을 장착한 쿼리빌더 인스턴스를
const queryBuilder = getConnection()
  .createQueryBuilder()
  .select('*')
  .from('users');

// [2] queryBuilderExecute 함수 매개변수에 넘겨 호출
const result = await Pagination.queryBuilderExecute(
  queryBuilder,
  2, // page
  20, // limit
  '/users',
);

// [3] 결과를 원하는 응답 객체에 트랜스폼
const responeObject = PaginationTransform.toInstance(응답DTO or ObjectType, result);
```

- repositoryExecute를 사용하는 예시

```javascript
// [1] 레포지토리 인스턴스와 조건 정의
const userRepository = getRepository(User);
const findManyOptions : FindManyOptions = {
   // 조건정의
}

// [2] repositoryExecute 함수 매개변수에 넘겨 호출
const result = await Pagination.repositoryExecute(
  userRepository,
  1, // page
  10, // limit
  '/users',
  {} : FindManyOptions // 조회 조건을 정의한 object (선택)
);

// [3] 결과를 원하는 응답 객체에 트랜스폼
const responeObject = PaginationTransform.toInstance(응답DTO or ObjectType, result);
```

#

## 결과값

```json
"list": [...데이터 생략],
"metaData": {
	"totalCount": 9, // 전체 item 수
	"listCount": 9, // 지금 페이지에서 item 수
	"itemsPerPage": 10, // 페이지당 보여줄 item 수
	"totalPages": 1, // 전체 페이지 수
	"currentPage": 1 // 지금 페이지
},
"links": {
	"first": "localhost:3000/product/?limit=10", // 최초 페이지
	"previous": "", // 이전페이지
	"next": "", // 다음페이지
	"last": "localhost:3000/product/?page=1&limit=10" // 맨마지막 페이지
}
```
