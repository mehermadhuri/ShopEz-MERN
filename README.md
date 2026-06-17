# ShopEz – E-Commerce Application (MERN Stack)

ShopEz is a fully functional, premium full-stack e-commerce web application developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It supports user registration, secure login, product browsing, dynamic cart updates, and robust frontend-backend synchronization.

---

## 1. Technical Architecture

The application is built using the MVC (Model-View-Controller) design pattern on the backend, and a component-based state-driven structure on the frontend.

```
Client (React.js) <---> API Client (Axios) <---> REST API (Express & Node.js) <---> Database (MongoDB Atlas)
```

- **Frontend**: Port `3000` (Local)
- **Backend**: Port `5000` (Local) or Hosted on Render
- **Database**: Hosted on MongoDB Atlas Cloud

---

## 2. ER Diagram & Schema Design

### Users Collection
- `_id`: ObjectId (Primary Key)
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required, Hashed)
- `isAdmin`: Boolean (Default: false)
- `createdAt`: Date
- `updatedAt`: Date

### Products Collection
- `_id`: ObjectId (Primary Key)
- `name`: String (Required)
- `price`: Number (Required)
- `description`: String
- `image`: String
- `category`: String
- `stock`: Number (Default: 0)
- `createdAt`: Date
- `updatedAt`: Date

### Cart Collection
- `userId`: String (Primary Key / Link to User)
- `items`: Array of:
  - `productId`: String
  - `name`: String
  - `price`: Number
  - `image`: String
  - `qty`: Number
- `createdAt`: Date
- `updatedAt`: Date

---

## 3. Key Features

- **Secure JWT Authentication**: Hashed passwords using bcrypt.js and token verification middleware.
- **Dynamic Catalog**: Fetch products directly from MongoDB with a responsive grid UI.
- **Centralized Cart Context**: Persistent cart modifications sync to the database in real-time.
- **Rich Aesthetics**: Responsive layouts, clean margins, modern typography, hover animations, and subtle loaders.
- **Dynamic API Routing**: Built-in environment detection so frontend runs seamlessly out-of-the-box locally and on Vercel.

---

## 4. Setup & Installation Instructions

### Prerequisites
- Install **Node.js (v18+)**
- Setup a **MongoDB Atlas Cloud Database**

### 1. Clone the Repository
```bash
git clone https://github.com/mehermadhuri/ShopEz-MERN.git
cd ShopEz-MERN
```

### 2. Setup Backend Server
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=shopez_secret_key_2024
```
Seed the database with initial products:
```bash
npm run seed
```
Start server:
```bash
npm start
```

### 3. Setup Frontend Client
```bash
cd ../client
npm install
npm start
```

---

## 5. API Documentation

### Authentication APIs

#### Register User
- **Method**: `POST`
- **Route**: `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "Meher",
    "email": "meher@gmail.com",
    "password": "mysecretpassword"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "60c72b2f9b1d8a0015d3a56e",
    "name": "Meher",
    "email": "meher@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```

#### Login User
- **Method**: `POST`
- **Route**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "meher@gmail.com",
    "password": "mysecretpassword"
  }
  ```

---

### Product APIs

#### Get All Products
- **Method**: `GET`
- **Route**: `/api/products`
- **Response**:
  ```json
  [
    {
      "_id": "60c72b2f9b1d8a0015d3a57f",
      "name": "Bluetooth Speaker",
      "price": 999,
      "image": "https://images.unsplash.com...",
      "stock": 10
    }
  ]
  ```

---

### Cart APIs

#### Get User Cart
- **Method**: `GET`
- **Route**: `/api/cart/:userId`

#### Add Product to Cart
- **Method**: `POST`
- **Route**: `/api/cart/add`
- **Body**:
  ```json
  {
    "userId": "60c72b2f9b1d8a0015d3a56e",
    "product": {
      "_id": "60c72b2f9b1d8a0015d3a57f",
      "name": "Bluetooth Speaker",
      "price": 999,
      "image": "https://images.unsplash.com..."
    }
  }
  ```

#### Remove Product from Cart
- **Method**: `POST`
- **Route**: `/api/cart/remove`
- **Body**:
  ```json
  {
    "userId": "60c72b2f9b1d8a0015d3a56e",
    "productId": "60c72b2f9b1d8a0015d3a57f"
  }
  ```

---

## 6. Deployment Guidelines

### Backend Deployment (Render)
1. Sign up on [Render](https://render.com) using your GitHub account.
2. Click **New +** and select **Web Service**.
3. Import the `ShopEz-MERN` repository.
4. Set the configurations:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **Environment Variables** and add:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT=5000`
6. Click **Create Web Service**.

### Frontend Deployment (Vercel)
1. Sign up on [Vercel](https://vercel.com) using GitHub.
2. Click **Add New Project** and import `ShopEz-MERN`.
3. Set the configurations:
   - **Root Directory**: `client`
   - **Framework Preset**: `Create React App`
4. Click **Deploy**.
