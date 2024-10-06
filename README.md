# User API Project

## Table of Contents

1. [Introduction](#introduction)
2. [Project Purpose](#project-purpose)
3. [Architecture](#architecture)
4. [Technologies Used](#technologies-used)
5. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [API Endpoints](#api-endpoints)
10. [Error Handling](#error-handling)

## Introduction

This project is a simple User API built with Node.js and Express. It allows for user registration and login with JSON Web Tokens (JWT) for authentication. The project is containerized using Docker and includes a CI/CD pipeline for automated testing and deployment.

## Project Purpose

The primary purpose of this project is to provide a foundational understanding of building RESTful APIs with Node.js and Express, implementing authentication using JWT, containerizing applications with Docker, and setting up a CI/CD pipeline for automated testing and deployment.

## Architecture

The project follows a typical MVC (Model-View-Controller) architecture:

- **Models**: Define the schema for the data (User model).
- **Controllers**: Handle the application logic (userController).
- **Routes**: Define the endpoints for the API (userRoutes).
- **Middlewares**: Handle authentication and error handling.

my-express-nt-project/
├── node_modules/
├── src/
│   ├── config.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   
│   ├── models/
│   │   └── user.js
|   |   └── index.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── errorHandler.js
|   |   └── rateLimiter.js
│   ├── tests/
│   │   └── user.test.js
│   └── server.js
├── Dockerfile
├── package.json
├── .env
└── .github/workflows
    ├──   /ci-cd.yml


## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)
- JWT (Authentication)
- Docker (Containerization)
- Jest & Supertest (Testing)
- GitHub Actions (CI/CD)
- Render (Deployment)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker
- MySQL Database

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/sudhanshu7352/node-app-nt.git
    cd node-app-nt
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Configuration

1. Create a `.env` file in the root directory and add your database credentials and JWT secret:

    ```env
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret
    ```

## Running the Application

1. Start the application:

    ```sh
    npm start
    ```

    The server will run on `http://localhost:3000`.

## Testing

1. Run tests:

    ```sh
    npm test
    ```

    Tests are written using Jest and Supertest and are located in the `tests` directory.

## Deployment

The application can be deployed using Docker. The CI/CD pipeline is configured to deploy to Render.

### Steps to Deploy to Render

1. Build and push Docker image to Docker Hub:

    ```sh
    docker build -t sudhanshuk384/my-express-nt-project .
    docker push sudhanshuk384/my-express-nt-project
    ```

2. Configure Render to deploy the Docker image:

    - Set up a new web service on Render.
    - Use your Docker image (`docker.io/sudhanshuk384/my-express-nt-project`).
    - Set the environment variables as per your `.env` file.

## API Endpoints

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Login a user and get a JWT token.

### Request and Response Examples

#### Register User

- **Request**:

    ```json
    POST /api/users/register
    {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123"
    }
    ```

- **Response**:

    ```json
    {
        "user": {
            "id": 1,
            "username": "testuser",
            "email": "testuser@example.com",
            "createdAt": "2024-10-05T12:19:22.650Z",
            "updatedAt": "2024-10-05T12:19:22.650Z"
        }
    }
    ```

#### Login User

- **Request**:

    ```json
    POST /api/users/login
    {
        "email": "testuser@example.com",
        "password": "password123"
    }
    ```

- **Response**:

    ```json
    {
        "token": "jwt-token-here"
    }
    ```

## Error Handling

Errors are handled using the `errorMiddleware.js` middleware. Common error responses include:

- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

