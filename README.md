BUG-TRACKER
A bug tracking system or defect tracking system is a software application that keeps track of reported software bugs in software development projects. It may be regarded as a type of issue tracking system.

TABLE OF CONTENTS
- What does bug tracker do
- How to set it up
- Technologies used
- Routes
- Changelog
- Roadmap
- Author

What does bug tracker do?
The app allows users to create a project and add issues, which can be one or more. Issues can be as  bugs, errors, features to add, or any other issues that can be related to the project. The status can be, open used, blocked or close. 

How to set it up
Clone the project running the following command:
$ git clone https://github.com/ulirotela/cbwa-ca
Install the dependencies with the following command:
$ npm install
The following dependencies should be installed: "bcrypt": used for password encryption "body-parser": used for parsing the incoming request bodies "express": used for the server-side logic "mongodb".

Next Steps: 
1- Create your own cluster using Mongo-Atlas
2- Get the connection link from your cluster
3- Configure a Variable named MONGO_URI with the connection link and run the application

MONGO_URI="mongodb+srv://books1:books1@cluster0.0n6sd.mongodb.net/?retryWrites=true&w=majority" node index.js
Technologies Used
NodeJS
Express
MongoDB
Docker
Routes

Changelog
25 November 2020 Docker image  created. 
25 November 2020 Readme modified
15 November 2020 Finished Error Checking. Users and slugs cannot be repeated. All fields are required in POST actions. Added Try/Catch to all promises.
Roadmap
Initial Front-End
Login authentication
Author
Ulices Rotela I am currently studying a Higher Diploma in Science in Computing at CCT.