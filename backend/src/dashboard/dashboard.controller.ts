import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get dashboard metrics' })
  getMetrics() {
    return this.dashboardService.getMetrics();
  }

  @Get('alerts')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get recent alerts' })
  getRecentAlerts() {
    return this.dashboardService.getRecentAlerts();
  }
}
