import { AuthModule } from './app/Auth/auth.module';
import { UserModule } from './app/User/user.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './ship/Module/common.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
