import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellerStatus, UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('sellers')
@ApiBearerAuth()
@Controller('sellers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get('applications')
  @Roles(UserRole.ADMIN, UserRole.SELLER_MANAGER)
  @ApiOperation({ summary: 'List seller applications' })
  @ApiQuery({ name: 'status', enum: SellerStatus, required: false })
  findAll(@Query('status') status?: SellerStatus) {
    return this.sellersService.findAll(status);
  }

  @Get('applications/:id')
  @Roles(UserRole.ADMIN, UserRole.SELLER_MANAGER)
  @ApiOperation({ summary: 'Get seller application details' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Patch('applications/:id/approve')
  @Roles(UserRole.ADMIN, UserRole.SELLER_MANAGER)
  @ApiOperation({ summary: 'Approve seller application' })
  approve(@Param('id') id: string) {
    return this.sellersService.approve(id);
  }

  @Patch('applications/:id/reject')
  @Roles(UserRole.ADMIN, UserRole.SELLER_MANAGER)
  @ApiOperation({ summary: 'Reject seller application' })
  reject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.sellersService.reject(id, reason);
  }

  @Patch('applications/:id/request-info')
  @Roles(UserRole.ADMIN, UserRole.SELLER_MANAGER)
  @ApiOperation({ summary: 'Request more info from seller' })
  requestInfo(@Param('id') id: string, @Body('message') message: string) {
    return this.sellersService.requestInfo(id, message);
  }
}
