import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CreateStoreInfoDto } from 'src/provided-modules/store-info/dto/request/create-store-info.dto';
import { UpdateStoreInfoDto } from 'src/provided-modules/store-info/dto/request/update-store-info.dto';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/store-info', () => {
    let storeInfo;

    it('GET', async () => {
      return await request(app.getHttpServer()).get('/store-info').expect(200);
    });

    it('POST', async () => {
      return await request(app.getHttpServer())
        .post('/store-info')
        .send(CreateStoreInfoDto)
        .expect(201)
        .then((response) => {
          storeInfo = response.body.data; // 상품을 변수에 저장
        });
    });

    it('GET /:service_id', async () => {
      return await request(app.getHttpServer())
        .get(`/store-info/${storeInfo.service_id}`)
        .expect(200);
    });

    it('Patch', async () => {
      return await request(app.getHttpServer())
        .patch(`/store-info/${storeInfo.service_id}`)
        .send(UpdateStoreInfoDto)
        .expect(200);
    });

    it('DELETE /:service_id', async () => {
      return await request(app.getHttpServer())
        .delete(`/store-info/${storeInfo.service_id}`)
        .expect(200);
    });
  });
});
