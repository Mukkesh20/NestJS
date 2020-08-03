import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Gajendra:qRkTruuBu473XBBT@cluster0-e4zm9.mongodb.net/TaskManagement?retryWrites=true&w=majority', { useNewUrlParser: true }),
    //MongooseModule.forRoot('mongodb://localhost/TaskManagement'),
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
