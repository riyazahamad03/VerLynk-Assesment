# Blog Application Backend Documentation

## Overview

This repository contains the backend logic for a Blog Application. Users can perform various operations, including:

- Login
- SignUp
- Create a blog
- Read a blog
- Update a blog
- Delete a blog
- Comment on a blog
- Delete a commented blog
- Read a blog

Some routes are protected, requiring authentication.

## Environment Variables (.env)

Ensure you have a `.env` file with the following content:

```env
SECRETKEY=your_secret_key
MONGOURL=your_mongo_db_url
```


API Endpoints
## 1. Login

- **Endpoint**: `/user/login`
- **Method**: POST
- **Protected**: No
- **Request Body**:
  ```json
  {
    "email": "hellohello@gmail.com",
    "password": "xyz"
  }
  ```
- **Response**: A JWT token for authentication.


## 2. SignUp
- **Endpoint**: `/user/signup`
- **Method**: POST
- **Protected** : No
- **Request Body**:
    ```json
  {
      "email" : "hellohello@gmail.com",
      "password":"xyz",
      "userName" : "riyaz"

  }
  ```
- **Response**: User registration confirmation.

## 3. Create Blog
- **Endpoint**: `/blog/create`
- **Method**: POST
- **Protected**: Yes
- **Request Body** :
  ```json
  {
      "blogData" : "Hello this is the first blog post",
      "userName" : "riyaz"
  }
  ```
- **Response** : Created blog details.

## 4. Read Blog
- **Endpoint**: `/blog/:blogId`
- **Method**: GET
- **Protected**: No
- **Response**: Blog details.

## 5. Update Blog
- **Endpoint**: `/blog/update`
- **Method**: POST
- **Protected**: Yes
- **Request Body** :
  ```json
   {
    "blogId" : "65bb27022476d17c85d4a2b9",
    "blogData" : "Hello this is the first blog post updated by updatedBlog route",
    "userName" : "riyaz"
  }
  ```
- **Response**: Blog updation.

## 6. Delete Blog
- **Endpoint**: `/blog/:blogId`
- **Method**: DELETE
- **Protected**: Yes
- **Protected**: Yes


## 7. Add Comments
- **Endpoint**: `/comment/add`
- **Method**: POST
- **Protected**: Yes
- **Request Body**:
  ```json
   {
    "blogId" : "65bb27022476d17c85d4a2b9",
    "comment" : "Hey this is the comment",
    "userName" : "riyaz"

  }
  ```

- **response**: Comment added

## 8. Update Comment
- **Endpoint**: `/comment/:CommentId`
- **Method**: POST
- **Protected**: Yes
- **Request Body**:
  ```json
   {
    "data" : "Im Here to update new1 comment",
    "username" : "riyaz"
  }
  ```

## 9 : Delete Comment
- **Endpoint**: `/comment/:CommentId`
- **Method**: DELETE
- **Protected**: Yes


## Protected Routes
-Routes that require authentication are marked as "Protected."
-To access protected routes, include the JWT token in the request header:
-Authorization: Bearer your_jwt_token



## Installation and Setup
  - Clone the repository.
  - Install dependencies: npm install
  - Create a .env file and set the required environment variables.
  - Run the application: npm start
