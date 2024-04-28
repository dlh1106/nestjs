# TypeORM Migration

- [document](https://typeorm.io/migrations)

## Migration 생성.

```
npm run typeorm:migrate-create --name=[파일명]
```

- 파일명의 경우 migration 생성 목적에 맞게 명명해서 부여. (필수)

  - create-store-info, create-terms, create-business
  - alter-store-info-add-si_id, alter-store-info-add-unique-key
  - drop-store-info

- migration 파일명 내 두가지 메서드가 생성. (up, down)
  - up : migration run 시 실행될 내용.
  - down : migration revert 시 실행될 내용.
    > 구분하여 작성 필요.

### 생성 경로.

```
migration-resource/
└── migrations/ <!-- [timestamp]-[name].ts 로 생성됨. -->
```

## Migration 실행.

```
npm run typeorm:migrate-run
```

- migration_tb에 추가되지 않은 파일부터 모든 migration 실행.

## Migration 롤백.

```
npm run typeorm:migrate-revert
```

- migration_tb에 등록된 migaration 파일 순서로 1개씩 down 메서드 수행.
