

Project Management Dashboard
This is a simple project management dashboard built using Next js, providing users with functionality to create, view, and manage projects and issues. The app features a clean UI and includes features such as filtering issues, assigning priorities, and adding comments. Below is a quick overview of the functionality included:

Features
Landing Page: A dashboard containing a header with a search bar and a profile section, along with a sidebar navigation to various sections like Project Board, Create Issues, and Create Project.

Project Board:

Displays a list of issues categorized into "To-Do," "Development," "Testing," and "Completed."
Issues can be filtered by assignee or priority (multi-select).
Each card shows issue details like summary, description, assignee, and priority with color coding.
Cards are sorted by the last updated date, and clicking on a card navigates to its detail page.
Comments can be added and deleted, with a confirmation dialog for deletion.
Create Issue Screen:

A form to create new issues with fields like summary, type, project, description, priority, assignee, tags, story point, and sprint.
Proper form validation with validation messages.
Reset functionality to clear the form and ability to create new issues only if the form is valid.
Create Project Screen:

Form with fields for project name, owner, start date, and end date.
Form validation ensures correctness before submission.

Object-Value Mappings:
Status: {1 => To-Do, 2 => Development, 3 => Testing, 4 => Completed}
Priority: {1 => LOW, 2 => MEDIUM, 3 => HIGH}
Type: {1 => BUG, 2 => TASK, 3 => STORY}

Installation
Clone the repository and run npm install to install dependencies, then start the app using npm start.
