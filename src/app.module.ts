import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import dbConfig from './persistence/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentModule } from './modules/tournament/tournament.module';
import { ResultModule } from './modules/result/result.module';
import { PlayerModule } from './modules/player/player.module';
import { PrizeModule } from './modules/prize/prize.module';
import { AssignedPrizeModule } from './modules/assigned-prize/assigned-prize.module';
import { ScheduleModule } from '@nestjs/schedule';


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
    
      ScheduleModule.forRoot(),

    TournamentModule,

    ResultModule,

    PlayerModule,

    PrizeModule,

    AssignedPrizeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
