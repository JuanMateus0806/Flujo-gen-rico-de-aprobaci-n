import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request_type } from '../../request_type/entity/request_type.entity';
import { Request_history } from './request_history.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  applicant: string;
  @Column()
  approver: string;
  @Column()
  create_at: Date;
  @ManyToOne(() => Request_type, (request_type) => request_type.requests)
  type: Request_type;
  @OneToMany(
    () => Request_history,
    (request_history) => request_history.request,
    { cascade: true },
  )
  history: Request_history[];
}
