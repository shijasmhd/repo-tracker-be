const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') })

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});

/**
 * POST - /api/v1/auth/register
 * POST - /api/v1/auth/login
 *** POST - /api/v1/auth/logout
 * POST - /api/v1/auth/refresh-tokens
 *** POST - /api/v1/auth/forgot-password
 * 
 * From frontend(GET - /api/v1/github/search?repo={}&user={})
 * From frontend(GET - /api/v1/github/:userName/repos)
 * 
 * POST - /api/v1/users/:userId/bookmarks - {url}
 * POST - /api/v1/users/:userId/bookmarks/upload - {csv}
 * GET - /api/v1/users/:userId/bookmarks?date-start&date-end
 * 
 * DELETE - /api/v1/users/:userId/bookmarks/:bookmarkId
 */


 /**
  * 
  * USERS Table
  * id, user-name, password, created-at, update-at
  * 
  * BOOKMARKS Table
  * uid(belongs to users.id), id, url, name, owner, created-at, update-at
  */