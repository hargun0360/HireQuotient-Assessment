# Dashboard Application

This is a dashboard application that displays data fetched from an API. It includes features such as in-place edit and delete, search/filter, pagination, and multi-row selection.

## Features

- **Data Fetching**: Fetches data from a specified API and displays it within a table on the dashboard.
- **Column Highlighting**: Column titles are distinct from the entry rows, ensuring that the titles stand out.
- **Search and Filter**: Includes a search bar that can filter results based on any property within the data.
- **In-place Edit/Delete**: Allows for the editing or deletion of rows within the dashboard without persistence (changes occur in-memory).
- **Pagination**: Supports pagination with a limit of 10 rows per page. Pagination controls include first page, previous page, next page, and last page, and they update according to search results.
- **Row Selection**: Users can select one or more rows to highlight or delete. A top-left checkbox allows for the selection/deselection of all rows currently displayed.
- **Responsive Search**: The search box features a placeholder that begins with 'Search' and a search icon that triggers filtering either on click or when the ENTER key is pressed.
- **Action Buttons**: Each row has action buttons with specific class names for edit (`edit`), delete (`delete`), and save (`save`) operations.
- **Navigation Controls**: Navigation elements like first, previous, next, and last page are implemented as buttons or div elements with their respective class names.
- **In-line Edit Mode**: Clicking the edit button allows users to edit information directly in the row.

## Deployment

The application is deployed on Netlify and can be accessed here:
[Dashboard App Deployment](https://hirequotient-assessment-hargun-singh.netlify.app/)

##### Dashboard Display
![alt text](https://github.com/100xdevs-cohort-2/assignments/assets/89998804/9bfe5d6f-42ff-4a0c-9cad-54252c40e621)

## Local Development

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
    ```
    git clone <repository-url>
    ```
2. Navigate to the project directory.
    ```
    cd dashboard-app
    ```
3. Install the dependencies.
    ```
    npm install
    ```
4. Start the development server.
    ```
    npm start
    ```
   The application should now be running on [localhost:3000](http://localhost:3000).

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. Please ensure your code adheres to the project's coding standards and include tests for any new features or fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
