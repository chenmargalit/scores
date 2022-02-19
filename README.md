# Installation instructions:

Clone the repo

#### Initialization with Docker:
In the project root folder, activate Docker and type in the command: "docker-compose up". 
You should now be able to run the project on localhost:3000. 


#### Initialization without Docker:
1. Run a postgres server on port 5432.
2. Create a db named edgify
3. Run the create_tables.sql file in the server folder.
4. Inside the server folder type in the terminal: "yarn install && yarn start"
5. In another terminal, while inside the client folder type: "yarn install && yarn start"

### * Please note the DB has to run before the server does.
