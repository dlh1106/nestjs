import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('review_comment')
export class ReviewComment {
  @PrimaryGeneratedColumn({ unsigned: true, comment: '코멘트 id' })
  rc_id: number;

  @Column({ unsigned: true })
  @Column({ unsigned: true, comment: '리뷰 번호' })
  rc_review_id: number;

  @Column({ unsigned: true, default: 0, comment: '회원 id' })
  rc_user_id: number;

  @Column({ length: 200, default: '', comment: '작성자명' })
  rc_writer: string;

  @Column({ length: 100, default: '', comment: '작성 비밀번호(비회원)' })
  rc_passwd: string;

  @Column('text', { comment: '내용' })
  rc_content: string;

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N',
    comment: '노출 여부',
  })
  rc_display: string;

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N',
    comment: '관리자 작성 여부',
  })
  rc_is_staff: string;

  @CreateDateColumn({ type: 'datetime', comment: '등록일자' })
  rc_create_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '수정일자',
  })
  rc_update_at: Date;

  @Column({ type: 'datetime', comment: '삭제일자' })
  rc_delete_at: Date;
}
