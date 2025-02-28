import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooController } from './foo/foo.controller';
import { FooService } from './foo/foo.service';

@Module({
  imports: [],
  controllers: [AppController, FooController],
  providers: [AppService, FooService],
})
export class AppModule {}
