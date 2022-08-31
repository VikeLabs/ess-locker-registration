
This is our ess locker registration source code repository.

Current state:
![Home Page](/assets/elrhome_updated.png)
![Registration](/assets/elrreg_updated.png)
![Home Page](/assets/elrdereg_updated.png)

# Table of Contents

1. [Motivation for Project](#MOP)
2. [Tech Stack & Testing Environment](#Tech-Stack)
3. [Front End](#Front-End)
4. [Front End Testing](#Front-End-Testing)
5. [Back End](#Back-End)
6. [Back End Testing](#Back-End-Testing)

## Motivation for Project <a name="MOP"></a>

This project was proposed as a result of the current workflow
of Uvic engineering students registering lockers in the Engineering and Computer Science Building and the Engineering Lab Wing.

The current workflow involves students putting their locks on
empty lockers, physically going to the Engineering Students Society (ESS) Lounge and then filling a spreadsheet with their info on a computer in the lounge.

We hope to change (update) the current workflow by completing this project or at least getting the project in working condition. The ideal workflow would be students going to the locker registration website, registering an empty locker and then putting a lock on the locker physically. The updated workflow would of course be subject to change by ESS.

## Tech Stack & Testing Environment <a name="Tech-Stack"></a>

We decided to build the locker registration system using a MERN stack.

1. MongoDB - Database
2. Express.js - Node.js framework
3. React.js -Front-end JS framework
4. Node.js - Backend

The previous locker registration application used React.js, the team was interested in learning JavaScript and MongoDB works really well with Express.js. This stack was also chosen because it’s ideal for building dynamic web interfaces.

To test whether the functions in user.js and admin.js were working properly, we created (WIP)

## Front End <a name="Front-End"></a>

The front end basically comprises of React.js code and css that make the webpages of the locker registration website. It also has the api connections to the backend.

### Front End Testing <a name="Front-End-Testing"></a>

The front end was designed so that each webpage in the locker registration system is it's own JavaScript file. This way, it's easy to make a change to a specific webpage. It also makes Unit Testing a breeze.

We manually tested webpages by previewing them and checking if all components were working as expected.

## Back End <a name="Back-End"></a>

The back end is mostly made of connections to MongoDB and CRUD (mainly R and U) functions that constantly change documents (lockers) in our database. The backend also has the authentication system which will allow administrators to login to the locker registration system.

There are two controllers in the backend. There is the admin controller and the user controller. The admin controller contains all the functions an administrator of the locker registration system would have. The user controller contains all the functions a user of the locker registration would have.

### Back End Testing <a name="Back-End-Testing"></a>

We started off testing a script to CRUD some documents (lockers) in our database.

Next we tested the controllers. The functions in the controllers have specified filters based on the properties of the documents.
We used the script mentioned above to fill the database with over 800 documents with different properties. We then used the controllers to read and update the documents in the database.

Finally, we tested authentication made sure the an administrator of the locker registration system was able to login.
