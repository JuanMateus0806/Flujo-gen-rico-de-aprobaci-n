import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create_person.dto';
import {
  FormatNamesString,
  NormalizeString,
} from '../../common/utils/string.utils';
import { GetAllPersonDto } from './dto/get_all_person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.create({
      name: NormalizeString(createPersonDto.name),
      lastname: NormalizeString(createPersonDto.lastname),
      email: NormalizeString(createPersonDto.email),
      role: NormalizeString(createPersonDto.role),
    });
    await this.personRepository.save(person);
    return { success: 'true', message: 'Persona creada con exito' };
  }

  async getAll(): Promise<GetAllPersonDto[]> {
    const people = await this.personRepository.find();
    return people.map((person) => ({
      id: person.id,
      name: FormatNamesString(person.name),
      lastname: FormatNamesString(person.lastname),
      email: FormatNamesString(person.email),
      role: FormatNamesString(person.role),
    }));
  }
}
