# OS PO® Operating System - Patryk Orlowski - Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
However, due to the discontinuation of support for CRA, I decided to refactor the project and migrated it to Vite.

## Running the App

To run the app locally on your machine, first download the source code and run `npm install` to install dependencies. Then add .env file with this variable:

VITE_APP_BACKEND_URL="http://127.0.0.1:8000"

Also if you want, you can add those variables, after you create user on the backend:
VITE_APP_GUEST_USER
VITE_APP_GUEST_USER_PASSWORD

Then, run `npm start` to start the app.

## Dependencies

The app uses the following dependencies:

- axios
- react-transitions-group
- react-calendar
- intro.js and intro.js-react
- react-router-dom

## TODO

1. **Fix bugs**
2. **Code refactor**
3. Add page for password resets
