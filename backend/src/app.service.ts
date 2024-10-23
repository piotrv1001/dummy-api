import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getExchangeRate(): Promise<number> {
    const cachedValue = await this.cacheManager.get('exchange_rate');
    if (cachedValue && typeof cachedValue === 'number') {
      return cachedValue;
    }

    const response = await firstValueFrom(
      this.httpService.get(
        'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api',
        {
          headers: {
            'x-api-key': 'DInGz8W0Wr8t0fYAY21ddL2JMmZ2uHT1hxAxUSTa',
          },
        },
      ),
    );
    const exchangeRate = response.data.exchange_rate;
    await this.cacheManager.set('exchange_rate', exchangeRate, 60_000);

    return exchangeRate;
  }

  async createTransaction(amountInEur: number) {
    const exchangeRate = await this.getExchangeRate();
    const amountInPln = amountInEur * exchangeRate;
    const timestamp = Date.now();
    const objectToSave = { amountInEur, amountInPln, exchangeRate, timestamp };
    // TODO: Save the transaction to the database
    return { amountInPln };
  }
}
