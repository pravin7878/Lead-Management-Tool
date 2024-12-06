# Lead Management Backend Server

## Overview

This is a backend server built using Node.js and Express for managing leads for a pharmacy store. It includes features like lead creation, filtering, sorting, searching, and pagination. The server uses MongoDB as the database.

---

## Features

- **Lead Management**: Add, view, update, and delete leads.
- **Search and Filter**: Search by `leadName`, `email`, or `contactNumber`, and filter by `status`, `leadSource`, etc.
- **Sorting**: Sort leads by `nextFollowUpDate`, `status`, or `leadSource`.
- **Pagination**: Efficiently handle large datasets with pagination.
- **Secure Authentication**: Role-based access with JWT tokens.
- **Error Handling**: Comprehensive error handling for invalid inputs and server errors.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Custom validation middleware
- **Error Handling**: Try-catch blocks with centralized error handling

---

## Installation and Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-folder/Backend>
   ```
2. Install dependencies:
    ```
     npm install
    ```
3. Set up environment variables:

   * Create a .env file in the root 
    directory.
   * Add the following:
      env variables
    ```
    PORT= 8080
    MONGO_URI=<your_mongo_uri>
    JWT_SECRET=<your_secret_key>
    ```

### Start the server:
   ```
   npm start
   ```

# Admin Routes

The **Admin Router** is designed to provide administrative functionalities such as admin login and fetching all users' data , update and deleting any lead. The routes require authentication and specific authorization based on roles.

## Routes

### Admin Login
- **Endpoint**: `POST /admin/login`
- **Description**: Admin login route to authenticate an administrator.
- **Request Body**:
  ```
  {
    "email": "admin_email",
    "password": "admin_password"
  }
  ```

- after login admin can do all **CRUD** 
  opration on all leads and can get all users.


## Authentication and Authorization

- **Authentication**: 
  - For routes requiring authentication, a valid JWT token should be provided in the `Authorization` header as `Bearer <JWT_token>`.
  
- **Authorization**:
  - For some routes, the user needs to have a specific role (`admin`, etc.). This is enforced via the `authorizeRole` middleware.




## Get All Users (Admin Only)

- **Endpoint**: `GET /api/admin/users-data`
- **Description**: This route fetches all user data. It is only accessible by an authenticated admin.
- **Authorization**: 
  - Requires authentication (JWT token) and the role of `admin` to access this route.
- **Headers**:
  - `Authorization: Bearer <JWT_token>`
- **Response**:
  - **Success**: 
    - `200 OK` with an array of user data.
  - **Error**:
    - `403 Forbidden` if the user does not have the `admin` role or is not authenticated.

## User Routes

### 1. Register a New User

- **Endpoint**: `POST /user/register`
- **Description**: This route allows a new user to register by providing their personal details. It validates the data and checks if the email is already registered before saving the new user to the database.
- **Middleware**:
  - `validateRegisterBody`: Validates the incoming request body to ensure all required fields are provided and correctly formatted.
- **Request Body**:
  ```
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "mobileNumber": "1234567890",
    "password": "password123",
    "role": "user"
  }
  ```
  name: Full name of the user (required).

email: Email address of the user (required).

mobileNumber: Mobile number of the user (required).

password: Password for the user account (required).

role: Role of the user (e.g., "user", "admin").

Response:

Success:
201 Created with a success message and the newly registered user data.
```
{
  "message": "User Registration Success",
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "mobileNumber": "1234567890",
    "role": "user"
  }
}
```
- ***Error***:
- 400 Bad Request: If the email is already registered or if required fields are missing or invalid.



### 1. Login User

- **Endpoint**: `POST /user/login`
- **Description**: This route allows an already registered user to log in by providing their credentials. It authenticates the user and returns a JWT token for subsequent requests.

#### Request Body:

```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Request Parameters

- **email**: The registered email address of the user (required).
- **password**: The password of the user (required).

### Response

#### Success:

- **Status Code**: `201 Created`
- **Response Body**:
  ```
  {
    "message": "login success",
    "user": {
      "name": "John Doe",
      "userId": "userId",
      "role": "user",
      "token": "<JWT_token>"
    }
  }
  ```

  
---

## Endpoints for leads

### 1. **Create a Lead**
- **Endpoint**: `POST /leads/`
- **Description**: This endpoint allows any authenticated user to create a new lead.
- **Authorization**: Requires a valid JWT token.
- **Headers**:
  - `Authorization: Bearer <JWT_token>`
- **Request Body**:
  - JSON payload containing lead details. Example:
    ```json
       {
         "leadName": "John Doe",
         "contactNumber": "1234567890",
         "email": "johndoe@example.com",
         "address": "123 Main St, Springfield",
         "status": "new",
         "assignedTo": null,
         "nextFollowUpDate": "2024-12-10T10:00:00Z",
         "nextFollowUpTime": "10:00",
         "leadSource": "online",  
         "conversionDate": null,
         "leadNotes": "Initial contact made, follow-up needed",
         "customerType": "retail",
         "purchaseHistory": [
           {
             "productName": "Laptop",
             "purchaseDate": "2024-11-20T00:00:00Z",
             "amount": 1000
           }
         ],
         "medicalNeeds": "None"
       }
        ```
        enum fields
        ```
        status :  enum: ["new", "in-progress", "converted", "closed"],
      default: "new",
        leadSource  :enum: ["online", "referral", "walk-in", "other"]
         customerType : enum: ["retail", "wholesale", "other"]
         ```
- 

### 2. **Get Leads**
- **Endpoint**: `GET /leads/`
- **Description**: Fetches a list of leads. Admin users can view all leads, while regular users can access only their own leads.
- **Authorization**: Requires a valid JWT token.
- **Headers**:
  - `Authorization: Bearer <JWT_token>`
- **Query Parameters**:
  - **Filters**:
    - `status`: Filter by lead status.
    - `assignedTo`: Filter by assigned user.
    - `leadSource`: Filter by source of the lead.
    - `leadName`: Filter by lead name.
    - `search`: Search across lead name, email, and contact number.
  - **Sorting**:
    - `sortBy`: Field to sort by (default: `nextFollowUpDate`).
    - `order`: Sorting order (`asc` or `desc`).
  - **Pagination**:
    - `page`: Current page number (default: 1).
    - `limit`: Number of leads per page (default: 10).
- **Response**:
  - **Success**:
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
       {
         "leadName": "John Doe",
         "contactNumber": "1234567890",
         "email": "johndoe@example.com",
         "address": "123 Main St, Springfield",
         "status": "new",
         "assignedTo": "5f8f8d2d1e4e9d430d4e2f3b",
         "nextFollowUpDate": "2024-12-10T10:00:00Z",
         "nextFollowUpTime": "10:00",
         "leadSource": "online",
         "conversionDate": null,
         "leadNotes": "Initial contact made, follow-up needed",
         "customerType": "retail",
         "purchaseHistory": [
           {
             "productName": "Laptop",
             "purchaseDate": "2024-11-20T00:00:00Z",
             "amount": 1000
           }
         ],
         "medicalNeeds": "None",
         "createdBy": "userId"
       }
     ```
  - **Error**:
    - **401 Unauthorized**: If the user is not authenticated.

---

### 3. **Edit a Lead**
   - **Endpoint**: `PATCH /leads/:leadId`
- **Description**: Updates the details of an existing lead. Only admins can access this endpoint.
- **Authorization**: Requires a valid JWT token and admin role.
- **Headers**:
  - `Authorization: Bearer <JWT_token>`
- **Request Body**:
  - Partial JSON payload to update the lead. Example:
    ```json
    {
      "status": "contacted",
      "nextFollowUpDate": "2024-12-22T10:00:00Z"
    }
    ```
- **Response**:
  - **Success**:
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "message": "lead is update success",
        "updatedLead": {
          "leadName": "John Doe",
          "email": "johndoe@example.com",
          "contactNumber": "1234567890",
          "status": "contacted",
          "nextFollowUpDate": "2024-12-22T10:00:00Z"
        }
      }
      ```
  - **Error**:
    - **404 Not Found**: If the `leadId` is invalid or not found.

---

### 4. **Delete a Lead**
- **Endpoint**: `DELETE /leads/:leadId`
- **Description**: Deletes an existing lead by `leadId`. Only admins can access this endpoint.
- **Authorization**: Requires a valid JWT token and admin role.
- **Headers**:
  - `Authorization: Bearer <JWT_token>`
- **Response**:
  - **Success**:
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "message": "lead is deleted success"
      }
      ```
  - **Error**:
    - **404 Not Found**: If the `leadId` is invalid or not found.

---

## Error Handling
All errors are handled centrally in middleware. Common error codes include:
- **400 Bad Request**: For invalid input or missing fields.
- **401 Unauthorized**: For missing or invalid authentication.
- **403 Forbidden**: For unauthorized role access.
- **404 Not Found**: For resources that do not exist.

---

## Notes
- **Role-based Access Control**:
  - Admin users have access to all leads and advanced management actions like editing and deleting.
  - Regular users can only create and view their self-created leads.
- **Pagination and Sorting**: The API supports pagination and sorting for `GET /leads/` to improve usability.

---







