Django Backend API
====================

This API is the backend side of a simple dashboarding app.

Endpoints
------------

- `http://localhost:8000/admin`: default django endpoint used to login as an admin user.
- `http://localhost:8000/admin/clients`: ndpoint only visible to admin users. Return a paginated list of clients in json format.
- `http://localhost:8000/api/clients/`: endpoint used to search for specific clients. Can also return the paginated list of all clients like `admin/clients` endpoint. This unsecure  behavior should be fixed by adding user authentication. List of possible query params:
    - `?id=<int:pk>`: retrieve the client with id equal to `pk` value
    - `?full_name=<string:name>`: retrieve clients whose full name is equal to `name` value
    - `?search=<string:qery>`: retrieve clients whose full name contains `name` value
- `http://localhost:8000/api/consumption/`: endpoint used to search for the consumption of clients. If used without a query, will return all the consumption of all clients in a paginated way. To get the consumption of a specific client, add the following query parameter:
    - `?client_id=<int:client_id>`: will return the paginated list of all consumption entries for the client with id equal to `client_id`


Requirements 
------------

### MySQL server up and running

I changed the database from SQLite to MySQL in order to better fit with the scalabality requirements of a production database.
In order to run the backend, you therefore need to have a local MySQL server.

Installation
------------

### Python environment

In order to launch the backend, you first need to setp up your python virtual environment:
``` bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
### MySQL
Then you need to configure you MySQL database. Here are the followinf steps:

1. Create a configuration file at `/usr/local/etc/mysql/my.cnf` with the deisred paramaters

``` bash
# my.cnf
[client]
database = db_name
user = user
password = password
default-character-set = utf8
```

2. Ensure the database is created in mySQL and that the user has the minmum permissions required by django. Here is the SQL command:

``` sql
CREATE DATABASE IF NOT EXISTS db_name;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON db_name.* TO user@localhost;
```

3. Migrate database tables into the database
```bash
python manage.py migrate
```

4. Load data into the mysql database
``` bash
python manage.py loaddata db.json
```

Launch the backend
--------------

Don't forget to create a django super user to access `admin/` endpoint:
``` bash
python manage.py createsuperuser
```

Then simply start the django server, and you're good to go !

``` bash
python manage.py runserver
```