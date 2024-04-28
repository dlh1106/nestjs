import { Entity, Column, UpdateDateColumn } from 'typeorm';

@Entity('review_product')
export class ReviewProductEntity {
  @Column({ unsigned: true, primary: true, comment: '상품 id' })
  rp_goods_id: number;

  @Column({ unsigned: true, default: 0, comment: '상품 리뷰 수' })
  rp_count: number;

  @Column({ unsigned: true, default: 0, comment: '상품 포토 리뷰 수' })
  rp_count_photo: number;

  @Column({ unsigned: true, default: 0, comment: '상품 평점 평균' })
  rp_score_avg: number;

  @UpdateDateColumn({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '마지막 업데이트 일',
  })
  rp_update_at: Date;
}
