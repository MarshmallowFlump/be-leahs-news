# Portfolio Project: Backend
## Title: 'Leah's News'
## Built by: Leah Lord (2022)

---

# About

In this project, I have built an API for the purpose of accessing application data programmatically.

The intention was to mimic the building of a real-world backend service, such as that of Reddit, which can then provide this information to the frontend architecture. 

This API is designed for a news website or app where, as a user, you currently can:

- view all articles 
- view a specific article
- filter and sort articles
- vote on an article
- view comments on a given article
- post a new comment
- delete a comment

Please see the /api endpoint for a full breakdown of all available endpoints, as well as requirements for request bodies and available queries.

Future additions may include posting and deleting articles, updating a user profile or adding a search articles function.

---

# Technical Description 

The project was built principally using node.js, while the database itself is a relational database created in PSQL and interactions with it are managed by node-progres.

I have used Express.js and RESTful API techniques to set up the server and build out a variety of endpoints, including those which accept queries, which are accessed via server routes using smaller sub-routers for greater clarity.

Middleware includes express.json, to parse any incoming request JSON bodies, and CORS, to make the API open and accessible. 

The project follows the Model - View - Controller (MVC) pattern, where the model interacts with the database and the controllers define how that information should be returned.

In this instance, the 'view' is a simple hosted version of this API (linked below) in which you can browse all available endpoints. 

---

# Testing & Test-Driven Development (TDD)

During the project, I used TDD principles and the red-green-refactor cycle, using both Jest (for unit-testing) and Supertest (for integration testing).

Testing included full error handling, for example, using middleware such as 'catch' and 'next' to manage a range of errors from server errors or PSQL thrown errors to custom errors.

I included a reusable seed function to remove any existing test data from the test database, recreate the tables and repopulate it dynamically before each test, to solve the potential problem of unpredictable data if it is modified between tests.  

---

# NPM Scripts

I used scripts to automate repetitive tasks, such as running the test files, setting up or seeding the database.

---

# Hosted Version

I have deployed the API to Heroku. The hosted version is available at:

### [Leah's News](https://leahs-news.herokuapp.com/api/ "Hosted version of API on Heroku")
---

# Set-Up

## Installation Requirements

---

### Cloning the Repo: 

To view a local version of this repo, you will first need to clone it onto your machine. 

In the command line, navigate to the place in your file system you wish the repository to be saved, then run the following command:

```$ git clone https://github.com/MarshmallowFlump/be-nc-news```

---

### Installing Dependencies:

Any required dependencies will be gathered from the information provided in the package.json file. 

To install, enter the following in your command line:

```$ npm install```

---

### Environment Set-Up: 

Once you have completed the above steps, you will need to create two .env files. 

1. `.env.test`

2. `.env.development`

Save each file in the root directory, then navigate to each file and update them to include the following: 

1. In `.env.test`: 
- ```PGDATABASE=nc_news_test```

2. In `.env.development`: 
- ```PGDATABASE=nc_news```

---

### Database Set-Up & Seeding: 

Before you can use or test the application, you must set up the database and then seed it with data by entering the following into the command line:

- `$ npm run setup-dbs`
- `$ npm run seed`

---

### Testing: 

As detailed in the project overview, the framework used to test the application is Jest.

To run the tests, enter the following into the command line:

- `$ npm test`

---

### Application Dependencies:

- npm 8.1.0
- cors 2.8.5
- dotenv 14.2.0
- express 4.17.2
- pg 8.7.1
- pg-format 1.0.4

---

### Developer Dependencies:

- jest 27.5.1
- jest-sorted 1.0.14
- supertest 6.2.2
