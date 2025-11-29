import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Request_type } from '../../request_type/entity/request_type.entity';
import { Request_history } from './request_history.entity';
import { Person } from '../../person/entity/person.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  create_at: Date;
  @ManyToOne(() => Person, (p) => p.requests_applicant)
  @JoinColumn({ name: 'applicant_id' })
  applicant: Person;
  @ManyToOne(() => Person, (p) => p.requests_approver)
  @JoinColumn({ name: 'approver_id' })
  approver: Person;
  @ManyToOne(() => Request_type, (request_type) => request_type.requests)
  @JoinColumn({ name: 'type_id' })
  type: Request_type;
  @OneToMany(
    () => Request_history,
    (request_history) => request_history.request,
    { cascade: true },
  )
  history: Request_history[];
}
