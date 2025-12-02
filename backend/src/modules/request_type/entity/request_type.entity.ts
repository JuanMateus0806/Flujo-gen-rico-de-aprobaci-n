import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request as RequestEntity } from '../../request/entity/request.entity';

@Entity()
export class Request_type {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => RequestEntity, (request) => request.type)
  requests: RequestEntity[];
}
