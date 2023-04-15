# OS PO® Operating System - Patryk Orlowski

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a desktop simulator built with ReactJS that allows users to customize their desktop environment and use built-in apps like a calculator, to-do list, and web browser.

## Live Version

Check out the live version of the app [here](https://operating-system-po.netlify.app/).

## Running the App

To run the app locally on your machine, first download the source code and run `npm install` to install dependencies. Then, run `npm start` to start the app.

## Features

- Choose your preferred language (Polish or English)
- Create a user account
- Customize your desktop environment by changing the wallpaper, main color, and font color
- Log in and log out
- Use built-in apps like a calculator, to-do list, and web browser

## Dependencies

The app uses the following dependencies:

- axios
- react-transitions-group
- react-calendar

## TODO

1. Improve start screen and close screen styling
2. Create a small backend with ExpressJS for easier app maintaining:

- Add a feature to fetch data from an external NewsAPI
- Implement a secure password storage solution that doesn't rely on `localStorage`

3. Create a `PersonalizeAvatarComponent` to allow users to customize their avatar/icon
4. Add more built-in apps to increase the functionality of the simulator
5. Implement event delegation in the personalize app to improve performance
6. Preload some resources (such as images or fonts) to improve the user experience
7. Ensure mobile responsiveness by implementing appropriate CSS rules for smaller screen sizes
8. Add a weather app.
9. Add a video player app.
10. Add two simple games,

- Tetris (one of my favorite games of all time)
- one simple game that uses canvas

11. Add a small chat app with websocket and backend functionality (to consider)
12. Add React Drag & Drop functionality for icons (to consider)

## Screenshots

![Screenshot of OS PO® Operating System](/readme/screenshot.jpg)

## Reporting Issues

If you encounter any issues or bugs with the app, please email me at patryk-orlowski1992@gmail.com.

## License

This app is not currently licensed.

Thank you for checking out OS PO® Operating System - Patryk Orlowski!
