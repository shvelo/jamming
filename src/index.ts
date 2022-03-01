import 'reflect-metadata';
import 'dotenv/config'
import Container from 'typedi';
import { AppModule } from './app.module';

const app = Container.get(AppModule)

app.start()
