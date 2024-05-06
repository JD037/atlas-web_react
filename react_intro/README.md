# File Structure of tasks

react_intro/
  |- task_0/
  |   |- dashboard/
  |       |- src/
  |           |- App.css
  |           |- App.js
  |           |- holberton-logo.jpg
  |           |- index.js
  |- task_1/
  |   |- dashboard/
  |       |- src/
  |           |- App.css
  |           |- App.js
  |           |- holberton-logo.jpg
  |           |- index.js
  |           |- Notifications.css
  |           |- Notifications.js
  |           |- utils.js
  |- task_2/
  |- task_3/
  |   |- dashboard/
  |       |- src/
  |           |- App.css
  |           |- App.js
  |           |- App.test.js
  |           |- holberton-logo.jpg
  |           |- index.js
  |           |- Notifications.css
  |           |- Notifications.js
  |           |- Notifications.test.js
  |           |- setupTests.js
  |           |- utils.js
  |           |- utils.test.js
  |- task_4/
  |- task_5/
      |- dashboard/
          |- config/
          |   |- webpack.config.js
          |- dist/
          |   |- index.html
          |- src/
              |- index.js

Tasks

Task 0: Basic React App

Create a basic React app using create-react-app in the task_0/dashboard directory.
Modify the App.js file to include a header, body, and footer.
Style the app using the provided CSS.

Task 1: Embedding Expressions and Functions

Create utility functions in task_1/dashboard/src/utils.js.
Modify App.js to use the utility functions.
Create a Notifications component and style it.
Render the Notifications component in index.js.

Task 3: Create Basic Tests

Write tests for the utility functions in task_3/dashboard/src/utils.test.js.
Ensure the tests pass successfully.

Task 3: Create React Tests

Write tests for the App component in task_3/dashboard/src/App.test.js.
Write tests for the Notifications component in task_3/dashboard/src/Notifications.test.js.
Use shallow rendering to test the components.

Task 5: Create a Project using Webpack

Set up a new npm project without using create-react-app.
Configure Webpack to output a bundle.js file in the dist folder.
Set up a dev server with hot reloading.
Create a src folder for JavaScript files.
Set up an HTML file in the dist folder to import the bundle file.
Configure Webpack to support inline source maps, style loader, CSS loader, and image loader.
