import { registerEnumType } from "@nestjs/graphql";

export enum YesNoEnum {
    Y =  'Y',
    N =  'N',
};

registerEnumType(YesNoEnum, {
    name: 'YesNo',
    description: 'Yes or No enum type',
});