import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Auth')
export class AuthType
{
    @Field(() => GraphQLJSON)
    data: JSON;

    @Field(() => GraphQLJSON)
    message: JSON;
}
