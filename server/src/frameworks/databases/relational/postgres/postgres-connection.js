import pg from 'pg';

const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'edgify',
  password: 'postgres',
  port: 5438
});

pgClient.connect();

export default pgClient;
