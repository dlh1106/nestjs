# DebugModule

~~작성자~~조립자 : 이기봉

- 해외 github 돌아다니며 짜집기한 모듈
- 사용법을 최대한 간단히 하며, 최대 효율을 내는게 목적

#

## 소개

- 우리는 개발시에 컨트롤러, 리졸버, 서비스들의 상호간 어떤 데이터를 넘기고 받았는지 디버깅 해야할 때가 있다.
- 일일히 로그를 찍어가면서 어떤 파라미터를 넘기고 있는지 파악하는게 아닌 제공하는 데커레이터로 손쉽게 디버깅할 수 있는 유틸리티 모듈이다.

#

- 필요한 패키지가 하나 있다.

```shell
yarn add circular-json
npm install circular-json
```

#

## 사용 준비

- DebugModule 을 app.module.ts 모듈에 의존성주입

```javascript
@Module({
  imports: [DebugModule.forRoot({})],
})
export class AppModule {}
```

#

## 사용방법

- 아래에서 설명하는 데코레이터를 달아주기만 하면 된다.

## Class 적용

- 클래스 메서드들 전부 디버그 대상.

```javascript
@Controller()
@DebugLog('ClassContext')
export class AppController {}
```

##

## Method 적용

- 해당 메서드만 디버그 대상.

```javascript
@Get()
@DebugLog('MethodContext')
public method() {}
```

##

## Module 단위 적용

- 해당 모듈 providers 클래스(컨트롤러, 서비스)들의 메서드들 전부 대상.

```javascript
@Debug(ProductModule.name)
@Module({
  providers: [ProductResolver, ProductService], // 대상
})
export class ProductModule {}
```

- Module 단위 적용시 특정 클래스 를 제외 시킬 수 있다.

```javascript
@Debug({ context: ProductModule.name, exclude: [ProductResolver] })
```

#

## 디버깅 출력 예시

- ProductResolver.findOneProduct() 에 1 args 가 들어왔으며, 처리 시간은 +21.52ms 임을 보여줌.

```bash
[Nest] 2494  - 06/30/2023, 6:15:15 AM   DEBUG [ProductResolver] findOneProduct([
  1
]) +21.52ms
```

- ProductResolver.updateProduct() 에 다음과 같은 InputType 이 들어왔으며, 처리시간은 +41.70ms 임을 보여줌.

```bash
[Nest] 2494  - 06/30/2023, 6:16:39 AM   DEBUG [ProductResolver] updateProduct([
  {
    "p_id": 3,
    "p_name": "상품1",
    "p_price": 10000,
    "p_product_detail": {
      "pd_description": "상품설명2"
    },
    "p_product_options": [
      {
        "po_id": 1,
        "po_name": "옵션이름1",
        "po_value": "옵션값1"
      },
      {
        "po_id": 3,
        "po_name": "옵션이름2",
        "po_value": "옵션값2"
      }
    ],
    "p_product_tags": [
      {
        "pt_name": "태그up2"
      }
    ]
  }
]) +41.70ms
```

- 아래는 RestApi GET localhost:3000/product/1 를 요청하였을때 디버깅된 모습이다.

```javascript
[Nest] 3175  - 07/07/2023, 3:27:17 AM   DEBUG [ProductModule] ProductService.findOne([
  1
]) +4.65ms
[Nest] 3175  - 07/07/2023, 3:27:17 AM   DEBUG [ProductModule] ProductController.findOne([
  1
]) +5.05ms
```
