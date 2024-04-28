import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserTb } from '../../user/entities/user.entity';

@Entity('exit_user')
export class ExitUserTb {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  eu_id: number;

  @OneToOne(() => UserTb)
  @JoinColumn({ name: 'eu_login_id', referencedColumnName: 'u_login_id' })
  @Column({ name: 'eu_login_id', length: 35, default: '' })
  user: UserTb;

  @Column({ length: 10, default: '' })
  eu_name: string;

  @Column({ length: 50, default: '' })
  eu_email: string;

  @Column({ length: 15, default: '' })
  eu_phone: string;

  @Column({ length: 15, default: '' })
  eu_ip: string;

  @CreateDateColumn({ type: 'datetime' })
  eu_created_at: Date;
}