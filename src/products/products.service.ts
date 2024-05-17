import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as Uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;
    const newProduc = new Product(Uuidv4(), name, description, price);
    this.products.push(newProduc);
    return newProduc;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product with id: ' + id + ' not found');
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: __, ...restValue } = updateProductDto;
    const product = this.findOne(id);

    product.updateWith(restValue);

    return product;
  }

  remove(id: string) {
    const productFind = this.findOne(id);
    this.products = this.products.filter((product) => product.id !== productFind.id);
    return this.products;
  }
}
