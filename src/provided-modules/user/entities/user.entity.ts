import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { ExitUserTb } from '../../exit-user/entities/exit-user.entity';

@Entity('user')
@Index(['u_login_id'], { unique: true })
export class UserTb {
  @PrimaryGeneratedColumn()
  u_id: number;

  @Column({ length: 35, default: '' })
  u_login_id: string;

  @Column({ length: 255, default: '' })
  u_password: string;

  @Column({ length: 35, default: '' })
  u_email: string;

  @Column({ length: 35, default: '' })
  u_name: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  u_point: number;

  @Column({ length: 20, default: '' })
  u_post: string | null;

  @Column({ length: 255, default: '' })
  u_address1: string | null;

  @Column({ length: 255, default: '' })
  u_address2: string | null;

  @Column({ length: 15, default: '' })
  u_cellphone: string | null;

  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  u_reg_date: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6 })
  u_mod_date: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6 })
  u_last_login_date: Date;

  @OneToOne(() => ExitUserTb)
  u_exit_user: ExitUserTb;

  @BeforeInsert()
  async beforeInsert() {
    this.u_password = await bcrypt.hash(this.u_password, 11);
  }
}