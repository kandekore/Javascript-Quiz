# JavaScript Quiz App

A dynamic web application for users to take quizzes on JavaScript topics, built with React, Apollo Client for GraphQL interactions, and MongoDB for data storage. This project demonstrates the use of modern web development tools and practices to create an interactive and user-friendly quiz platform.

## Features

- **Dynamic Quiz Taking**: Users can take timed quizzes with shuffled questions and answers.
- **High Score Tracking**: Scores are saved and displayed in a high score board.
- **GraphQL API**: Utilizes GraphQL for efficient data fetching and manipulation.
- **Responsive Design**: Crafted to provide a seamless experience on both desktop and mobile devices.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourgithubusername/javascript-quiz-app.git
```

2. Install NPM packages for the server:

```bash
cd javascript-quiz-app/server
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

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Running Tests

Explain how to run the automated tests for this system (if applicable).

## Deployment

Details on deploying the application can be adapted based on where and how you plan to deploy, for example on Heroku, Netlify, etc.

## Built With

- [React.js](https://reactjs.org/) - The web framework used.
- [Apollo Client](https://www.apollographql.com/docs/react/) - For interacting with GraphQL API.
- [Express](https://expressjs.com/) - Backend framework.
- [MongoDB](https://www.mongodb.com/) - Database used.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## License

This project is licensed under the MIT License


Remember to replace placeholders (like `https://github.com/yourgithubusername/javascript-quiz-app.git` and `**Your Name**`) with your actual repository URL and your name. Also, if you have specific tests or deployment steps, don't forget to add those details in the respective sections.
