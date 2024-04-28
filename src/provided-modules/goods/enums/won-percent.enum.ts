import { registerEnumType } from '@nestjs/graphql';

export enum WonPercentEnum {
  WON = 'WON',
  Percent = 'PERCENT',
}

registerEnumType(WonPercentEnum, {
  name: 'WonPercent',
  description: 'Won or Percent enum type',
});
