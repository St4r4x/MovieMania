# MovieMania Users API

## Description
The users API allows for managing users and the content related to their profiles. The API offers all CRUD operations on users as well as managing their content.

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com/) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [MariaDB](https://www.postgresql.org) as the SQL database.
- 🔒 Secure password hashing by default.
- 🔑 JWT token authentication.

## Usage
Method POST only available with valid token in headers (Authentication = Bearer) on `http://localhost:8888/`.

- URL availables:
  - `/docs/`: Swagger page to test api and view all endpoints.
  - `/redoc/`: Redoc api doc.

## Documentation
For detailed documentation, please refer to the [API documentation](`http://localhost:8888/docs`).
