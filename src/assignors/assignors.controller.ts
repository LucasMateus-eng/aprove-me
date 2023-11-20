import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AssignorEntity } from './entities/assignor.entity';

@Controller('assignors')
@ApiTags('assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiCreatedResponse({ type: AssignorEntity })
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOkResponse({ type: AssignorEntity, isArray: true })
  findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: AssignorEntity })
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: AssignorEntity })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
