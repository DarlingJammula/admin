import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductStatus, UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.PRODUCT_MANAGER)
  @ApiOperation({ summary: 'List products' })
  @ApiQuery({ name: 'status', enum: ProductStatus, required: false })
  findAll(@Query('status') status?: ProductStatus) {
    return this.productsService.findAll(status);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PRODUCT_MANAGER)
  @ApiOperation({ summary: 'Get product details' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id/approve')
  @Roles(UserRole.ADMIN, UserRole.PRODUCT_MANAGER)
  @ApiOperation({ summary: 'Approve product' })
  approve(@Param('id') id: string) {
    return this.productsService.approve(id);
  }

  @Patch(':id/reject')
  @Roles(UserRole.ADMIN, UserRole.PRODUCT_MANAGER)
  @ApiOperation({ summary: 'Reject product' })
  reject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.productsService.reject(id, reason);
  }
}
