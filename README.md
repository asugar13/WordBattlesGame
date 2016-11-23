#ANNOUNCEMENTS
## 1. Delete whatever is in project_directory/database and populate the database yourself (will need an absolute path for the .json file most likely):
```
mongoimport --db usersdb --collection users --type json --file data/user_database.json --jsonArray
```


# WordBattles

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
	various modules for node, make sure to add new ones in this folder and commit, also don't forget to update the package.json
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

###*Server*
```
package.json: make sure to update this every time you add a node module
```