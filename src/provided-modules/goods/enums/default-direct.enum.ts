import { registerEnumType } from '@nestjs/graphql';

export enum DefaultDirectEnum {
  DEFAULT = 'DEFAULT',
  DIRECT = 'DIRECT',
}

registerEnumType(DefaultDirectEnum, {
  name: 'DefaultDirect',
  description: 'Default or Direct enum type',
});
