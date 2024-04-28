import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('review_adddatum')
export class ReviewAddDatum {
  @PrimaryGeneratedColumn({ unsigned: true })
  ra_id: number; // 리뷰 추가 항목 id

  @Column({ unsigned: true })
  ra_review_id: number; // 리뷰 번호

  @Column({ unsigned: true, default: 0, comment: '리뷰 추가 항목 key' })
  ra_key: number;

  @Column({ unsigned: true, default: 0, comment: '리뷰 추가 항목 값' })
  ra_value: number;
}
