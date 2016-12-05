# WordBattles

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
