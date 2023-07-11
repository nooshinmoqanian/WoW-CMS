import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Account')
export class AccountType
{
    @Field(() => GraphQLJSON)
    data: JSON;

    @Field(() => GraphQLJSON)
    message: JSON;
}
