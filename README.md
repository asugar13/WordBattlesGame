# WordBattles
WordBattles is a social web application that encourages user to chat in a competitive manner. The application allows new user to sign up and existing users to log into the system. Regular user can view the profiles of other users and participate in a global chat room. Every message that a user sends out would result in his or her score going up. A leaderboard mechanism is implemented to make the interaction competitive. 

##Deployment
Navigate to project_directory folder in the terminal
Run the follow command line to install the node components listed in package.json 
```
npm install
```
Run the following command lines to set up the database and load sample data
```
mkdir database
mongod --dbpath database
```
In a new terminal, run
```
mongoimport --db usersdb --collection users --type json --file data/user_database.json --jsonArray
```
Run the following command line to startup the web server
```
node src/server.js
```
##Application Design
###Login Page
The login page presents a form for the user to sign in with. The form presents error message supposed the user submitted incorrect/mismatching credentials. The system makes a POST request with the credentials and logs the user in if successful.
Suppose the user does not have an account yet, a signup button is available and it takes the user to the sign up view.

###Signup Page
The sign up page presents a form for the user to sign up with. The form presents error message supposed the username has been taken. The system makes a POST request with the credentials and create a new record for the user. 

###Main Page
The main page is where a regular user is brought to after a successful login. The main view displays a leaderboard for top 20 users with the highest score in the system. There's also a list of online users, which is stored in server and updated whenever someone signs in.out, so that the user can join a global chat room to chat with others. Navigation on this page can bring the user to the profile page or logs off the user.

###Profile Page
The profile page displays the basic information for the user such as the username and the score. In addition, a small sized profile picture would be displayed if the user has previously uploaded a profile picture. If not, the user can simply upload a picture to have it stored on his account. User can also simply replace existing profile picture with a newer one. On this page, a user can also search for other users by username and access their basic information as well.

###Chat Page
This is a global chat room page that displays any new messages thanks to the socket.io module. User can also send out messages to be broadcasted on the global chat room as well.

###Admin Page
Suppose an admin logs in, the user is taken to the admin page. A list of all the users information is displayed here and the admin can edit the user's information or delete the user. The admin also has the option to reset database, which removes all non-admin users from the system, and the option to add a new user.

##Working directory (project_directory/):

###*Style & scripts*
```
assets/
	css/
		styles
	scripts/
		scripts for various client side actions
```

###*Database*
```
data/
	user database json file
```

###*Generated objects for MongoDB*
```
database/
	MongoDB - generate your own files here and delete whatever we commit to the repo.
```

###*Database schema*
```
models/
	model for database
```

###*Node*
```
node_modules/
	various modules for node, make sure to add new ones in this folder
```

###*HTML views & images/icons (if needed)*
```
public/
	various views for different pages
```

###*Data manipulation*
```
routes/
	routes
```

###*Server*
```
src/
	server
```

###*package.json*
```
package.json: make sure to update this every time you add a node module
```
