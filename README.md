# users
A simple CRUD microservice

# Technologies
Express  
Docker  
MongoDB  
Postman

# Microservice Specification

**request body**

- firstName;  
- lastName;  
- birthDate;  
- email.  

**response body**

- id;  
- email;  
- fullName;  
- age.  

**requirements**

- email is mandatory and exclusive;
- users under the age of 30 cannot be excluded.

## Running the application

```bash
docker-compose -f stack.yml up -d
node src/index.js
```
