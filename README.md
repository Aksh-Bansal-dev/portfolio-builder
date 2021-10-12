# Portfolio Builder

Portfolio Builder helps you make your portfolio website without any hassle.

## How to setup

This application can be started using 2 methods

- Docker
- Manual

### Docker

Run `docker-compose up` to start the entire application

> Note: Docker and docker-compose must be installed on the system

### Manual

#### Prerequisite

- Nodejs
- postgres database

#### Database

- Start postgresql
- Create a database
- Make an `.env` file inside the server directory and fill info as mentioned in the `.env.example` file

#### Client

- Run `npm install` inside the client directory to install all dependencies
- Run `npm run dev` to start the development server

#### Server

- Run `npm install` inside the server directory to install all dependencies
- Run `npm run dev` to start the development server

## Tech stack

- Postgresql (database)
- Express (server)
- Nextjs (client framework)
- Docker
