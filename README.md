https://trello.com/b/vZCLJAyd/lambda-notesbackend-william-vandolah
# Back End Project Week

This week you will build a backend for a note taking app called "Lambda Notes".

You are to treat this week as if you are working at a company and the instructor is your client. The _Project Managers_ are acting as your company's project managers (duh!) and will be your main support throughout the week.

The main objective of this week is to develop a backend to support the LambdaNotes app you built during the Front End project week, connect the two projects together, and add some additional features. You will use `Node.js`, `Express` and any other technologies you have learned to complete this assignment.

## Git Commits

You are required to showcase progress with at least 4 commits a day. This will let your project manager know where you are and if you need help. This also allows the client to get progress reports from the company in a real world setting. This also protects you from losing your work if your computer fails.

## Trello Set Up

- Use your existing Trello account from the Front End Project, or create a new one.
- Create a new board called "Lambda Notes(Backend) - {Your Name}".
- Create lists titled `Backlog`,`To do`, `Blocked`, `In Progress`, and `Done`.
- Fill in the `To do` list with the MVP features listed below.
- Fill in the `backlog` list with all the extra features listed below.
- Share your board with the project manager that has been assigned to you. If you have not been assigned yet, reach out to your Section Lead for guidance.
- Add your Trello URL to your project's README.md file. Commit the change, push it to your repository & submit a pull request.

## Backend MVP Features:

We recommend that you finish all the MVP features before trying to deploy.

- Add data persistenc using a Relational Database. We suggest you start with `SQLite3`.
- Create a Web API for the React application you built in the front-end project week.
- Build endpoints for each of the following features:
  - Display a list of notes.
  - Create a note with a _title_ and _content_.
  - View an existing note.
  - Edit an existing note.
  - Delete an existing note.
  - Modify your front-end so that it uses your newly created Web API.

Upon your first commit, please submit a Pull Request and add _both_ the **Trello Set Up** and **Backend MVP Features** Task lists to your first Pull Request comment.

---

**Once you have completed the "Minimum Viable Product" requirements, message your project manager for approval**. If approved, you may continue to deploy and work on the Extra Features. Please add the Extra Features you implement to the list you added to the comment on your first PR.

## Deployment

After your PM certifies that all MVP features are complente, it's time to work on deploying it online for the world to see. We recommend you deploy your server to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction), and your front end to [netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/). Both services provide free tiers and easy to use interfaces.

Additionally, it is recommended that you keep your front end and backend codebases in separate GitHub repositories. This helps with deploying, since the different parts of your application will be deployed on different platforms.

## Extra Features:

Once your MVP has been approved, you have been given a feature list that the client would love to have completed. Your goal would be to finish MVP as soon as you can and get working the list of extra features.

- Setup Auto-Deploy on Heroku
- Provide documentation for how to interface with your api.
- Add pagination for long lists of notes.
- Create and display tags that can be added to notes and stored in the Database.
- Allow users to clone notes.
- Search functionality.
- Create a Registration Page that allows users to create accounts for your app and sign in with email/password.
- Allow users to sign in with a third party service (google, facebook, github, club penguin, etc...)
- Allow users to create Lists and assign notes to a list.
- Allow users to attach images to notes.
- Allow multiple users to collaborate on notes.
- Add Unit and Integration Tests.

## Super Duper Extra Credit Bonus Features

- Add a payment form integrating with _Stripe_ that allows Users to buy a _"Premium"_ version of Lambda Notes.
- Gate your favorite feature behind the _premium_ paywall

You will notice that this repository does not have any starter code. This is on purpose. You are to start from scratch using any files you have built throughout your time here at Lambda School as reference.
