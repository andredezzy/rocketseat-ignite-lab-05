import { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['deciding-cow-12100-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZGVjaWRpbmctY293LTEyMTAwJB1c-grXFCOXYiT--LIs4U_EfU-BiRAMcC80axI',
          password:
            'awVe74n3vf6cuNH6c04YxCY9JqXJPArqyqeVE_QtIVHDUV1pB02fA0iGK5QE7L61knMsIA==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
