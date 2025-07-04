# Over-engineered Hangman and TicTacToe games 

This project is an over-engineered game application built using **React**, **TypeScript**, **AWS (Amplify, Lambda, S3, DynamoDB)** and **gpt-4.1-nano via OpenAI API**. It includes two games: **Hangman** and **Tic Tac Toe**, with a responsive UI and modular codebase.

- [DevBoredGames.com](https://www.devboredgames.com/)

---

## Features

- **Games**:
  - Hangman: A word-guessing game with error handling and reset functionality.
  - Tic Tac Toe: A two-player game with winner detection and reset functionality. Computer mode that uses logic form AWS Lambda function and Open AI API (`gpt-4.1-nano`)
- **API Integration**: Fetches game data and calls OpenAI API from an AWS Lambda function via an API Gateway.
- **Error Handling**: Displays user-friendly error messages for invalid inputs or API failures.
- **Testing**: Includes unit tests for the `Games` component using Jest and React Testing Library.
- **Styling**: Custom CSS for a visually appealing UI.
---

## Available Scripts

In the project directory, you can run:

### `cd client && npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

---

## API Integration

The game data is fetched from an AWS Lambda function via the `fetchGames` & `getAiMove()` functions. It uses Axios to make GET requests to the API endpoint.

---

## Testing

Unit tests are written for the `Games` component. The tests ensure:
- The correct rendering of the header.
- Switching between games when buttons are clicked.

---

## Deployment

The project is deployed using **AWS Amplify**. The build configuration is defined in `amplify.yml`.

---

## Possible Future Enhancements

- Add more games to the platform.
- Improve the Hangman game with dynamic word fetching.
- Add integration tests for API calls.
- Add unit testing.
- convert Lambda to Typescript
- add unit tests for Lambda
---
## Project Structure

---
## Key Components

### `App.tsx`
The main application component that:
- Fetches game data using the `fetchGames` function.
- Manages loading and error states.
- Renders the `Games` component.

### `Games.tsx`
Handles game selection and renders either the **Hangman** or **Tic Tac Toe** game.

### `Hangman.tsx`
Implements the Hangman game logic, including:
- Input validation.
- Tracking guesses and remaining tries.
- Reset functionality.

### `TicTacToe.tsx`
Implements the Tic Tac Toe game logic, including:
- Winner detection.
- Reset functionality.

### `ErrorField.tsx`
Displays error messages in a styled format.

---

## License

This project is licensed under the MIT License.