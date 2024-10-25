# Software Engineer Test

This project is a backend test for [dealls.com](), implemented using **NestJS** with Prisma as the ORM and **SQLite** for the database.

## Table of Contents
- [Porto Design Pattern](#porto-design-pattern)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)


## Porto Design Pattern

This project leverages the **Porto software design pattern** to ensure high maintainability and reusability. It organizes the code into containers (like `Auth`, `User`, etc.), with the following key components:

- **Actions**: These contain the business logic of the application. They are the primary drivers of behavior within each container and are where complex interactions take place.
  
- **Tasks**: Tasks are smaller units of functionality that are reusable across multiple actions. Tasks break down complex logic into manageable pieces and improve reusability.

- **Services**: Additional layers such as Services are introduced before calling Action functions. These enhance validation using **Zod** and perform transformations on request bodies if necessary.

- **Controllers**: Controllers handle incoming HTTP requests and route them to the appropriate **Services**. They are the entry point for external requests and are responsible for handling request data, calling service function, and returning responses.

- **Transformers**: Transformers are responsible for formatting data before sending it in the response. They ensure that the output sent to the client is consistent and properly structured. For instance, they can be used to transform raw database records into a specific format or shape before sending them back to the API consumers.

## Project Structure

The project follows the **Porto Design Pattern**, which ensures high maintainability and reusability through modular, decoupled code.

```
src/
│
├── app/
│   ├── Auth/            # Authentication module
│   └── User/            # User module
│   
│
├── ship/                # Class that mostly used by all container in app folder
│   ├── database/        # database schema for prisma and SQLite Location
│   ├── Module/          # Module that will be commonly shared
│   └── Parent/          # For abstractions class that will be extended in container
│
├── test/                # Tests configuration and setup, test files located in Test 
│                          directory in every container
│
└── main.ts              # Application entry point
```

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A modern database toolkit to query, migrate and model your database with ease.
- **SQLite**: The database used in this project.
- **Jest**: For writing and running tests.
- **Faker.js**: To generate random data in the tests, making the test suite more comprehensive.
- **Swagger**: For generating API documentation.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmadhafizh16/usedeall-be-test.git
   cd usedeall-be-test
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:

   For convenience's sake, I remove gitignore for .env and .env test. So no need anything to set any environment variables.

4. Run the Prisma migrations to set up the database schema:
   ```bash
   npm run db:migrate
   ```

## Running the app

The app will running at `localhost:3000`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

The API documentation is auto-generated using Swagger.

- After running the app, you can access the documentation at: [http://localhost:3000/v1/apidocs](http://localhost:3000/v1/apidocs)

- Additionaly, I added `GET v1/user/me` to test the token validity againts authorization guard.


## Testing

This project uses **Jest** for testing. The tests are written to ensure the API behaves correctly and efficiently.

Additionally, **Faker.js** is used to generate random but valid test data, which makes the tests more robust by verifying the API's behavior under various conditions.

Since I'm choosing E2E Test for the Test, use this command to run tests:

```bash
npm run test:e2e
```

## Linting and Formatting

The project uses **ESLint** for linting to ensure consistent code quality.

To run linting:

```bash
npm run lint
```

To fix linting errors automatically:

```bash
npm run lint:fix
```


