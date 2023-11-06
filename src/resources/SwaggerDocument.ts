/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import swaggerJsdoc from 'swagger-jsdoc';
import PACKAGE from '../../package.json';
import EnvVars from '../constants/EnvVars';

const options = {
  failOnErrors: true,
  /* This is the information that is going to be displayed on the swagger page. */
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API\'s',
      version: PACKAGE.version,
      description: PACKAGE.description,
      contact: {
        name: PACKAGE.author,
        email: PACKAGE.email,
      },
    },
    host: EnvVars.NodeEnv === 'production' ? 'https://code-challenge-rv8j.onrender.com/api' : 'http://localhost:3000/api',
    schemes: ['http'],
    basePath: '/apiDocs',
    tags: [{
      name: 'Book',
      description: 'API\'s regarding book\'s operations.',
    }],
    components: {
      schemas: {
        PageSize: {
          type: 'number',
          minimum: 1,
          default: 20,
          description: 'Number of items in a Page.',
        },
        PageNumber: {
          type: 'number',
          minimum: 1,
          default: 1,
          description: 'Page Number for Entries.',
        },
        SearchString: {
          type: 'string',
          description: 'String to search items in Entries.',
        },
        Ordering: {
          type: 'string',
          enum: ['ASC', 'DESC'],
          description: 'Ordering Fields by Ascending or Descending Order.',
        },
        Book: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'The Nightingale',
              description: 'The book title.',
            },
            author: {
              type: 'string',
              example: 'Kristin Hannah',
              description: 'The book\'s author.',
            },
            summary: {
              type: 'string',
              example: 'Set in Nazi-occupied France during World War II, "The Nightingale" follows the lives of two sisters as they resist the German occupation in their own courageous and heart-wrenching ways, showcasing the enduring strength of familial bonds and the power of women in the face of adversity.',
              description: 'The book summary.',
            },
          },
          required: ['title', 'author'],
        },
      },
    },
    servers: [EnvVars.NodeEnv === 'production' ? {
      url: 'https://code-challenge-rv8j.onrender.com/api',
      description: 'Production Server.',
    } : {
      url: 'http://localhost:3000/api',
      description: 'Development Server.',
    }],
  },
  /* Looking for all the files in the routes folder and then it is going to parse them. */
  apis: ['./src/routes/*.ts'],
};

/* Parsing the files in the routes folder and then it is going to create the swagger documentation. */
const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;