# Graham's Todo App README

## Getting Started

To run the Todo App, you will need to set up both the frontend and backend.

### Backend

1. Clone the repository and navigate to the `backend` folder.
2. Create a new file named `.env` in the `backend` folder. This file will contain sensitive environment variables. **Please note that the `.env` file will be sent separately via email.**
3. Install the required dependencies by running `pnpm install`.
4. Build the typescript files by running `pnpm run build`.
5. Start the backend server by running `node dist/src/server.js`.

### Frontend

1. Navigate to the `frontend` folder.
2. Install the required dependencies by running `pnpm install`.
3. Start the frontend server by running `pnpm run dev`.

## Task List

Here is the list of tasks with their current status:

1. Login / Register screen(s) ✅
2. Ability to logout ✅
3. Ability to add task ✅
4. Ability to edit task ❌
5. Ability to delete task ✅
6. Ability to mark/check task as done ✅
7. If a new task contains a city name in it (use first occurrence of city name) then use an external API to show the weather for this city on the task card using weather.com API. ✅
8. Todo app backend ✅
   - Create the API to support this app in Node.js
   - For authentication, use external services like auth0/google/firebase etc.. or build your own.
9. Todo app frontend ✅
   - We use ReactJS and Javascript/Typescript for our frontend. Figma is used for designs and prototyping.
   - Please implement this Figma design for the UI of the to-do app
10. Bonus Requirements (optional)
    - Add snack bars. ❌
    - Implement drag n drop. ❌
    - Make your app available online (send us the link to it). ❌
    - Add Due date ❌/ Tags ❌/ Search ✅

## Highlights

During the development of this Todo App, I focused on the following key areas:

- **Planning and Database Design**: I spent some time planning out the project which can be seen in the system design and ERD image.
- **GraphQL and Resolvers**: I implemented a GraphQL API to handle data queries and mutations. This was adventurous for me as first time setting this up. I used Prisma to generate the schema based on the plan I had made, I then also generated some resolvers to handle common queries and mutations for each model. I then wrote custom resolvers for the tasks and users.
- **Authentication**: I roled my own authentication system, this is quite basic and I would certainly improve on the validation for the form and increasing the password complexity requirements.
- **Weather API Integration**: I integrated the weather.com API to display the weather for cities mentioned in tasks. I approached this by finding a list of cities and converting these into a map. This could then be used efficiently to search for city names and look up the weather details from the API.

However, there are still areas that require improvement:

- **Component Composition**: I would like to spend more time improving the component composition, particularly in the table component. Currently, it displays both todo and completed tasks in a single table. Ideally, I would like to split the table into a reusable component and pass in either completed or todo tasks from the parent component.
- **Responsiveness**: I haven't had the opportunity to focus on responsiveness, which is crucial for a modern web application. I would like to revisit the design and ensure that it adapts well to different screen sizes and devices.
- **Error Handling**: I would like to improve error handling throughout the application. There aren't any Error Boundaries in place, and I would like to implement them to provide a better user experience when errors occur.
- **Weather API**: I would like to improve this in line with the original plan I'd made which was to have this with a cache to reduce the number of requests being made to an external API.
