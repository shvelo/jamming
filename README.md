# Web app for Jamming

## Requirements

Running locally requires only `docker` and `docker-compose`.  

In production, the application requires latest `nodejs`, `npm` and running `postgresql` instance

## Getting Started

### Initial setup

1. Copy or rename the `.env.example` file in the root of the project to `.env`

### Environment variables

- `NODE_PORT`: The port that the app will listen on, defaults to `8000`
- `NODE_HOSTNAME`: The hostname or IP address the app will listen on, defaults to `0.0.0.0`
- `DB_URL`: Database connection string in the form of `<driver>://<username>:<password>@<host>/<database>`
- `JWT_SECRET`: Secret used for signing and verifying JWT tokens

### Running

1. Run `docker-compose up` to start the application and database together
2. The server will be running at `http://0.0.0.0:8000`

### Running without docker

Running without docker requires latest `node.js` and `npm` installed.

1. Run `npm ci` to install the dependencies
2. Ensure that a local `postgres` instance is running, create a database and user and update the `DB_URL` in `.env`
4. Run `npm run start:dev`
5. The server will be running at `http://0.0.0.0:8000`

### Only running the database in docker

1. Run `docker-compose up postgres`
2. Run `npm run start:dev`
5. The server will be running at `http://0.0.0.0:8000`

## Structure

- `dist/`: compiled javascript files, ignored by git
- `src/`: application source
  - `common/`: common functionality shared by modules
  - `auth/`: Auth module
  - `jam/`: Jam module
  - `user/`: User module
  - `app.module.ts`: Main app module
  - `index.ts`: Entry point, sets up dependency injection and runs app module

The application is split into modules, with `typedi` handling instantiation and dependencies.

Module structure:

- `<moduleName>.module.ts`: Imports all parts of the module and external dependencies, used for dependency injection
- `<moduleName>.service.ts`: Provices main functionality of the module
- `<moduleName>.controller.ts`: Registers all route handlers with the router, includes all route handlers
- `<moduleName>.repository.ts`: Imports all models into database service, provides access to data
- `models/`: Contains models in this module
  - `<modelName>.ts`
  - ...
  - `index.ts`: exports all models
- `interfaces/`: Contains interfaces defined in this module
  - `<interfaceName>.ts`
  - ...
  - `index.ts`: exports all interfaces

## Adding a new module

The only required file for a module is the `<moduleName>.module.ts`, that exports a `class` annotated with the `@Service()` decorator so it gets included in dependency injection.  
When adding a new module, it is important to add the module as dependency to `AppModule` (or any modules that may depend on it) so the module gets loaded.  
Order is important, make sure your module depends on the modules that contain any referenced models.
