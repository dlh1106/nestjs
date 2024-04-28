import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { loggerFieldMiddleware } from './graphql-loggers/logger-field.middleware';
import { LoggerPlugin } from './graphql-loggers/logger.plugin';
import { ComplexityPlugin } from './complexity/complexity.plugin';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: 'src/graphql/schema/schema.gql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        // fieldMiddleware: [loggerFieldMiddleware],
      },
    }),
  ],
  providers: [
    // ComplexityPlugin,
    // LoggerPlugin
  ],
})
export class CWGraphQLModule {}
