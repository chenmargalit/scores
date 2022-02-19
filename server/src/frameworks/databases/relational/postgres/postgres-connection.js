import pg from 'pg';

// not in ENV for making the project transfer easier.

const pgClient = new pg.Client({
  user: 'postgres',
  host: 'postgres',
  database: 'edgify',
  password: 'postgres',
  port: 5432
});

pgClient.connect();

export default pgClient;
