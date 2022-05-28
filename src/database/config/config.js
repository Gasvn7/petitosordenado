module.exports = {
  /* DB_HOST = 127.0.0.1
  DB_USER = root
  DB_PASS =
  DB_NAME = petitos
  DB_PORT = 3306 */
  "development": {
    username: /* process.env.DB_USER */ 'root',
    password: /* process.env.DB_PASS */ '',
    database: /* process.env.DB_NAME */ 'petitos',
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
}
