# Beerfox

This is an SPA made with React with Typescript, created with **create-react-app** as it is fast and gives you a base boilerplate to work on.

- Used NodeJs version: 16.15.1

## Description

This App connects to the Punk API and shows data about random beers or random non-alcoholic beers. The user can also search beers by name and by brewed before as a date.

Notice that in the drawer menu, the user can **switch the App theme** between light and dark, and **select the ABV value** to consider the beers non-alcoholic, as different countries may have different values for that.

## Project setup

To start the project, you need to install the dependencies with npx or yarn.
Run the following commands in the project root:

```sh
npm install // yarn install
npm start // yarn start
```

## Other commands

You can execute the project tests with the command

```sh
npm test
```

## Tech stack info

The technologies and libraries I used for this project are:

- **React**
- **Typescript**
- **Material UI**
- **Axios**
- **Styled components** (with @emotion/styled package): It has better compatibility with Material UI.
- **Jest & React-testing-library**
- **ESLint & Prettier**
- **React-query**: For the requisites of this project, we don't need a global state manager library like Redux or Zustand.
- **React Context**: For managing things like the Theme & the ABV value that needed to be global and shared by different components, it's lighter than Redux and it does the same job.
- **Framer-motion**: For animations.
- **React-hot-toast**: For notifications.

## Additional information and comments

- The app was developed with Mobile First approach, and with SOLID principles in mind.

- The folder structure is simple as the project is small, but for a bigger project I would have grouped the folders by pages. You can see, that all the components are in the components folder, and also the hooks, but we could repeat that structure inside every page folder.
  _Example: /pages/BeerPage/components/BeerCard.tsx ||| /pages/BeerDetailPage/components/BeerDetailedCard.tsx_

- I applied a **Container design pattern**. The container component contains all the logic, API calls and secondary-effects, while it's children are just representational components that recieve props and print the data.
  The reason behind this is to make child components **easier to test**, as you can mock the received props and use function spies, or force specific states.

## TODO

With more time, I would have done a Beer Detail page, and also an accordion for the main beer card containing specific data like ABV, Brew Date, a list of ingridients and other relevant data.
