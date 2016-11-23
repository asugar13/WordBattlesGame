# MAKE SURE YOU DELETE WHATEVER IS IN project_directory/database, AND POPULATE THE DATABASE YOURSELF, DO NOT RELY ON THE DATABASE FILES THAT ARE COMMITTED BY EITHER OF US, THEY'RE HIGHLY CONTEXTUAL TO OUR MACHINES ETC.
# WordBattles

##Working directory (project_directory/):

###*Style & scripts*
```
assets/

	css/

		style.css

	scripts/

		someScript.js
```

###*Storing database*
```
data/

	user_database.json
```

###*Database schema*
```
models/

	need files (Asier wanted to get the starter files)
```

###*HTML views & images/icons (if needed)*
```
public/

	index.html
```

###*Data manipulation*
```
routes/

	user_routes.js
```

###*React*
```
src/

	need files (Asier wanted to get the starter files)
```

In order to run the project:
mongoimport --db usersdb --collection users --type json --file data/user_database.json --jsonArray
