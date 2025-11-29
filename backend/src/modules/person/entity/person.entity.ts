import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Request as RequestEntity } from '../../request/entity/request.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  last_name: string;
  @Column()
  email: string;
  @Column()
  role: string;
  @OneToMany(() => RequestEntity, (r) => r.applicant)
  requests_applicant: RequestEntity[];
  @OneToMany(() => RequestEntity, (r) => r.approver)
  requests_approver: RequestEntity[];
}
