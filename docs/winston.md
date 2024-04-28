## winston

- Winston은 강력하고 유연한 Node.js 로깅 라이브러리이다.
- node 기반 로그 라이브러리중 가장 많이 사용되고있다.
  - 다양한 전송 방법 지원
  - 확장 가능한 아키텍처와 실시간 로그 감시 기능
  - 커스텀 로깅 포맷기능
- 자세한 정보는 [링크](https://www.npmjs.com/package/winston) 를 참고하길 바란다.

- 패키지 설치

```
npm install winston
yarn add winston
```

#

### Logger 스위칭

- NestJS에선 @nestjs/common 패키지의 Logger 를 기본적으로 제공하고 있다.
- 위 로그가 사용된 애플리케이션 프로젝트를 아래와 같은 방법으로, 이전에 사용했던 소스를 수정하지 않고, 주체만 스위칭 하는 기능을 제공한다.

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(스위칭할 로거 서비스); // 로거 스위칭
  await app.listen(3000);
}
bootstrap();
```

#

### Winston 로거 서비스 생성

- @nestjs/common 의 Logger.log 는 두번째 매개변수에 context 를 넘길 수 있었다.
- 아래 서비스는 기존 로그 소스들을 수정하지 않으면서 winston 의 알맞은 함수에게 전달하는 서비스이다.
  - winston 에선 ..meta: any[] 라는 걸로 두번째 인자를 받고 있다. 이것을 이용해 context를 넘기는 모습니다.
  - 꼭 winston 이 아니더라도 이런 식으로 기본제공 함수를 커스텀할 수 있다.

```javascript
@Injectable()
export class WinstonLoggerService {
  private readonly logger: winston.Logger;

  // 생성자를 통해 윈스턴 설정 가져오는 부분.
  constructor(private readonly configService: ConfigService) {
    const loggerOptions = this.configService.get(
      'winstonLoggerOptions',
    ) as winston.LoggerOptions;
    this.logger = winston.createLogger(loggerOptions);
  }

  log(message: string, context?: string) {
    if (context) {
      this.logger.info(`${message}`, { context: `${context}` });
    } else {
      this.logger.info(message);
    }
  }
}
```

- 이렇게 커스텀된 서비스를 main 에서 스위칭 해준다.

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 애플리케이션 로거를 winston 으로 대체
  const configService = app.get(ConfigService);
  app.useLogger(new WinstonLoggerService(configService));

  await app.listen(3000);
}
bootstrap();
```

#

### winston 콘솔 출력 옵션.

- 이와같이 다양한 포멧을 제공한다. 더 자세한 내용은 각 커뮤니티를 활용하길 바란다.

```javascript
// 콘솔 출력 전송 객체 생성
new winston.transports.Console({
  level: 'debug', // 로그 레벨 설정
  handleExceptions: true, // 예외 처리 여부 설정
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // 로그에 색상 추가
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 타임스탬프 추가
    winston.format.simple(), // 간단한 로그 형식
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, context, timestamp }) => {
      const _head = `\x1b[32m[Winston]\x1b[0m`; // 색깔별 이스케이프문자열을 반환하는
      const _message = `\x1b[32m${message}\x1b[0m`;
      const _context = context ? `\x1b[33m[${context}]\x1b[0m` : '';
      const _timestamp = `\x1b[37m${timestamp}\x1b[0m`;
      const formattedMessage = `${_head} ${_timestamp} ${level} ${_context} ${_message}`;
      return formattedMessage;
    }),
  ),
}),
```

#

### 파일 전송

- 시스템 내 파일로 로그를 저장하는 방법을 소개한다.
- 프로젝트 root 경로 지정
  - log 파일 경로 지정하기 위해 app-root-path 모듈의 도움이필요하다.

```
npm install --save app-root-path
```

- 패키지 설치

```
npm install winston-daily-rotate-file
yarn add winston-daily-rotate-file
```

- 이와 같이 지정하면 지정된 경로로 로그가 쌓인다.

```javascript
transports: [
  // DailyRotateFile 전송 객체 생성
  new DailyRotateFile({
    level: 'debug',
    filename: `${process.env.LOG_PATH}/debug/debug-%DATE%.log`, // 로그 파일 경로 및 이름 설정
    datePattern: 'YYYY-MM-DD', // 날짜 패턴 설정
  }),
```

#

### 외부 전송

- 이 부분은 프로젝트내에 적용되지 않은 상태임을 참고 바란다.
- Winston 은 다양한 패키지로 외부로 Log 를 전송할 수 있는 패키지들이 존재한다.
- 그 중 슬랙으로 메시지를 보내는 패키지를 이용한 방법이다.
- 패키지 설치

```
npm install winston-slack-webhook-transport
yarn add winston-slack-webhook-transport
```

- 이처럼 간단한 작업으로 외부로 로그를 전송할 수 있다.

```javascript
transports: [
  new winstonSlack({
    webhookUrl: process.env.WEBHOOK_URL,
  }),
];
```
