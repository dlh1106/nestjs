import { YesOrNo } from 'src/common/enums/yes-or-no.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('review')
export class ReviewList {
  @PrimaryGeneratedColumn({ unsigned: true, comment: '리뷰 번호' })
  r_id: number;

  @Column({ unsigned: true, default: 0, comment: '상품 id' })
  r_goods_id: number;

  @Column({ unsigned: true, default: 0, comment: '회원 id' })
  r_user_id: number;

  @Column({ unsigned: true, default: 0, comment: '주문번호' })
  r_ordernum: number;

  @Column({ unsigned: true, default: 0, comment: '주문상품번호' })
  r_basketnum: number;

  @Column({ length: 200, default: '', comment: '작성자명' })
  r_writer: string;

  @Column({ length: 100, default: '', comment: '작성 비밀번호(비회원)' })
  r_passwd: string;

  @Column('text', { comment: '내용' })
  r_content: string;

  @Column({ length: 255, default: '', comment: '첨부 파일명 리스트' })
  r_attach: string;

  @Column({
    type: 'enum',
    enum: YesOrNo,
    default: YesOrNo.Y,
    comment: '노출 여부',
  })
  r_display: string;

  @Column({
    type: 'enum',
    enum: YesOrNo,
    default: YesOrNo.N,
    comment: '포토 리뷰 여부',
  })
  r_is_photo: string;

  @Column({ unsigned: true, default: 0, comment: '조회수' })
  r_count_hit: number;

  @Column({ unsigned: true, default: 0, comment: '좋아요 수' })
  r_count_good: number;

  @Column({ unsigned: true, default: 0, comment: '싫어요 수' })
  r_count_bad: number;

  @Column({ unsigned: true, default: 0, comment: 'best리뷰 노출 순위' })
  r_best: number;

  @Column({ unsigned: true, default: 0, comment: '평점' })
  r_score: number;

  @CreateDateColumn({ type: 'datetime', comment: '등록일자' })
  r_create_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '수정일자',
  })
  r_update_at: Date;

  @Column({ type: 'datetime', comment: '삭제일자' })
  r_delete_at: Date;
}
