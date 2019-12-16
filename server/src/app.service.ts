import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  index(): string {
    return 'Here will be static index.html with React application';
  }
}
