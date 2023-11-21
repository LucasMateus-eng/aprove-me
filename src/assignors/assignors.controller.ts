import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AssignorEntity } from './entities/assignor.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/integrations/assignors')
@ApiTags('assignors')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AssignorEntity })
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AssignorEntity, isArray: true })
  findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AssignorEntity })
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AssignorEntity })
  update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorsService.update(id, updateAssignorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
