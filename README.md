# Web app for Jamming

## Requirements

Running locally requires only `docker` and `docker-compose`.  



## Getting Started


### Initial setup

1. Copy or rename the `.env.example` file in the root of the project to `.env`

### Running

1. Run `docker-compose up` to start the application and database together
2. The server will be running at `http://localhost:8000`

### Running without docker

1. Run `npm ci` to install the dependencies
2. Ensure that a local `postgres` instance is running, create a database and user and update the `DB_URL` in `.env`
3. Run `npm run build`
4. Run `npm run start`
5. The server will be running at `http://localhost:8000`
