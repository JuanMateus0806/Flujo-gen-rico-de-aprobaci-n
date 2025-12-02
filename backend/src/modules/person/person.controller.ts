import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create_person.dto';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post('/create')
  async create(@Body() dto: CreatePersonDto) {
    return this.personService.create(dto);
  }

  @Get('/all')
  async getAll() {
    return this.personService.getAll();
  }

  @Get('/approvers')
  async getApprovers() {
    return this.personService.getApprovers();
  }
}
