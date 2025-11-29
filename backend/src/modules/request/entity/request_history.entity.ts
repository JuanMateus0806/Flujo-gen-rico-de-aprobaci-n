import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request as RequestEntity } from './request.entity';
import { Request_status } from '../enum/request_status.enum';

@Entity()
export class Request_history {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  state: Request_status;
  @Column()
  update_at: Date;
  @Column({ nullable: true })
  comment: string;
  @ManyToOne(() => RequestEntity, (request) => request.history)
  request: RequestEntity;
}
