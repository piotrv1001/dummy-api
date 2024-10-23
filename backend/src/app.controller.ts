import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('exchange-rate')
  async getExchangeRate() {
    const exchangeRate = await this.appService.getExchangeRate();
    return { exchangeRate };
  }

  @Post('transaction')
  async createExchangeTransaction(@Body() body: { amountInEur: number }) {
    return this.appService.createTransaction(body.amountInEur);
  }
}
