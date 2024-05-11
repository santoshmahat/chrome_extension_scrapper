import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  bulkCreate(
    @Body(new ParseArrayPipe({ items: CreateProductDto }))
    createProductDto: CreateProductDto[],
  ) {
    return this.productsService.bulkCreate(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
