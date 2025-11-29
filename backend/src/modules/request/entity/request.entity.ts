import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request_type } from '../../request_type/entity/request_type.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;
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
}
