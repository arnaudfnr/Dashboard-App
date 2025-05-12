Django Backend API
====================

This API is the backend side of a silmple dashboarding app.


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

Installation
------------

In order to launch the backend, you first need to run the following commands:
```
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
```

Then simply start the django server, and you're good to go !

`python manage.py runserver`
