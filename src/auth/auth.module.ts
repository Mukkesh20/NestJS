import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.entity';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret : 'deepblue2001',
      signOptions: {
        expiresIn : 3600,
      }
    }),
    MongooseModule.forFeature([ {name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    
  ],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
