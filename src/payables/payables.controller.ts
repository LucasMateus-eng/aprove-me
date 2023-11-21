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
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PayableEntity } from './entities/payable.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/integrations/payables')
@ApiTags('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PayableEntity })
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PayableEntity, isArray: true })
  findAll() {
    return this.payablesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PayableEntity })
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PayableEntity })
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payablesService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.payablesService.remove(id);
  }
}
