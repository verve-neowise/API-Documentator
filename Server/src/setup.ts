import dotenv from 'dotenv'
import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@apis': `${__dirname}/apis`,
  '@community': `${__dirname}/community`,
  '@auth': `${__dirname}/auth`,
  '@shared': `${__dirname}/shared`,
});

dotenv.config()