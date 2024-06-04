import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './persistence/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentModule } from './modules/tournament/tournament.module';
import { ResultModule } from './modules/result/result.module';
import { PlayerModule } from './modules/player/player.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db } = configService;

        return {
          type: 'mysql',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.password,
          database: db.name,
          entities: ['dist/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          retryDelay:3000,
          retryAttempts:10 // Esto no debería estar en producción
          
        };
      },
      inject: [dbConfig.KEY],}),

    TournamentModule,

    ResultModule,

    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
