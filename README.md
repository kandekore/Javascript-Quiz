# JavaScript Quiz App

A dynamic web application for users to take quizzes on JavaScript topics, built with React, Apollo Client for GraphQL interactions, and MongoDB for data storage. This project demonstrates the use of modern web development tools and practices to create an interactive and user-friendly quiz platform.

## Features

- **Dynamic Quiz Taking**: Users can take timed quizzes with shuffled questions and answers.
- **High Score Tracking**: Scores are saved and displayed in a high score board.
- **GraphQL API**: Utilizes GraphQL for efficient data fetching and manipulation.
- **Responsive Design**: Crafted to provide a seamless experience on both desktop and mobile devices.

## Deployed App

https://jsquiz-306434aa7ec8.herokuapp.com/

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kandekore/Javascript-Quiz.git
```

2. Install NPM packages for the server:

```bash
cd Javascript-Quiz/server
npm install
```

3. Install NPM packages for the client:

```bash
cd ../client
npm install
```

4. Set up your environment variables:

- Inside the `server` directory, create a `.env` file to store your MongoDB URI and other configurations.
- Inside the `client` directory, you might want to adjust the `REACT_APP_API_URL` in the `.env` file to point to your GraphQL endpoint.

5. Start the server:

```bash
cd ../server
npm start
```

6. In a new terminal, start the client:

```bash
cd ../client
npm start
```

Your app should now be running on [http://0.0.0.0:3000](http://0.0.0.0:3000).

## Built With

- [React.js](https://reactjs.org/) - The web framework used.
- [Apollo Client](https://www.apollographql.com/docs/react/) - For interacting with GraphQL API.
- [Express](https://expressjs.com/) - Backend framework.
- [MongoDB](https://www.mongodb.com/) - Database used.

## License

This project is licensed under the MIT License

