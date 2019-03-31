# MovieSearch

**MovieSearch** is web-based application that allows to users to search movies and identify information related to them. The information that is used is based on [OMDb API](http://www.omdbapi.com/).

### 1. RESTful API (Backend)
The API implementation is based NodeJS javascript built-in environment and PostgreSQL database. The API uses information from 
[OMDb API](http://www.omdbapi.com/), which is stored in the PostgreSQL database.

#### HTTP Endpoint

- http://localhost:3001/movies
- http://localhost:3001/movies/title/:title
- http://localhost:3001/movies/actor/:actor


**A screenshot of the API results:**

![movies](https://user-images.githubusercontent.com/32243459/55294196-ddd08000-53f6-11e9-90ac-d2782ab8f953.png)


### 2. React - Redux Application (Frontend)

The React/Redux application sources information from the backend API and visualise that information in the browser environment. 

**A screenshot of Home page:**

![home](https://user-images.githubusercontent.com/32243459/55294284-23da1380-53f8-11e9-9ec5-61cd58cb8b26.png)

**A screenshot of searching functionality:**

![search](https://user-images.githubusercontent.com/32243459/55294296-5421b200-53f8-11e9-80eb-522ca8f1cdda.png)

**A screenshot of a movie details:**

![details](https://user-images.githubusercontent.com/32243459/55294304-73204400-53f8-11e9-8188-9f1b517dfb6c.png)
