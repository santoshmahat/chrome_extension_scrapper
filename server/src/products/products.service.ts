import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'database/models';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async bulkCreate(createProductDto: CreateProductDto[]): Promise<Product[]> {
    try {
      const newProductDto = [];
      for (const dto of createProductDto) {
        const existingProduct = await this.productModel.findOne({
          where: { name: dto.name, entity: dto.entity },
        });
        if (existingProduct) continue;
        newProductDto.push(dto);
      }
      return await this.productModel.bulkCreate(newProductDto);
    } catch (error) {
      this.logger.error(error?.message, error?.stack);
    }
  }

  async findAll() {
    return await this.productModel.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with ${id} not found`);
    }

    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    return await product.destroy();
  }
}
