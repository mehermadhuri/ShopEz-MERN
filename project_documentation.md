# Full Stack Development with MERN
## Project Documentation

---

### 1. Introduction
* **Project Title:** SHOPEZ : E-commerce Application
* **Team Members:** 
  * **KOTA MEHER MADHURI** — Lead Full-Stack MERN Developer (Frontend UI/UX, Backend API REST endpoints, Database Schemas, and Offline Resilience Architecture).

---

### 2. Project Overview
* **Purpose:** 
  ShopEZ is a modern, responsive full-stack e-commerce web application designed to offer an effortless online shopping experience. It simplifies the user journey from viewing catalog items to final billing and provides robust, fault-tolerant offline capabilities when MongoDB database servers are unreachable.
* **Features:**
  * **Secure Authentication:** JWT-based user registration and login with local database fallbacks.
  * **Interactive Catalog:** Dynamic product grid with a fallback sample catalog.
  * **Interactive Checkout Wizard:** 4-step wizard (Cart Review ➔ Shipping Details ➔ Payment Method Gateway ➔ Order Invoice summary) directly inside the Cart page.
  * **Online & COD Options:** Integrated billing inputs for Cards, UPI, and Cash on Delivery.
  * **Inline Policy Overlays:** Interactive modal dialogs for Free Delivery, Secure Payment, and Easy Returns accessible directly inside the cart to prevent data loss.
  * **Infinite Scrolling Banner:** Smooth horizontal marquee ticker on the homepage highlighting shop benefits.

---

### 3. Architecture
* **Frontend:** 
  Built with **React.js (v19)** utilizing standard components and CSS styling. State management is handled globally via React Context Providers (`AuthContext` and `CartContext`) to persist user profiles and sync shopping cart quantities. Features responsive grid and flexbox wrappers.
* **Backend:** 
  Powered by **Node.js** and **Express.js**. It exposes secure REST endpoints for user accounts, products lists, and cart modifications. Features database connectivity checks (`mongoose.connection.readyState`) and in-memory mock controllers to handle offline database states.
* **Database:** 
  Uses **MongoDB** (Object modeling via **Mongoose**). Database operations are run with `bufferCommands: false` to prevent 10-second request hangs on database failures.
  * **Collections Schemas:**
    * `User` (name, email, password, isAdmin)
    * `Product` (name, price, image, stock)
    * `Cart` (userId, items: `[{ productId, name, price, image, qty }]`)

---

### 4. Setup Instructions
* **Prerequisites:**
  * Node.js (v18 or higher)
  * NPM (Node Package Manager)
  * MongoDB Atlas Account or Local MongoDB Community server
* **Installation Guide:**
  1. **Clone the Repository:**
     ```bash
     git clone https://github.com/mehermadhuri/ShopEz-MERN.git
     cd ShopEz-MERN
     ```
  2. **Install Dependencies:**
     * **Root directory:** `npm install`
     * **Server directory:** `cd server && npm install`
     * **Client directory:** `cd ../client && npm install --legacy-peer-deps`
  3. **Environment Variables:**
     Create a `.env` file inside the `server/` directory and configure the following keys:
     ```env
     PORT=5000
     MONGO_URI=mongodb://[your_mongodb_connection_uri]
     JWT_SECRET=shopez_secret_key_2024
     ```

---

### 5. Folder Structure
* **Client (React Frontend):**
  * `/public` — Static files and index.html
  * `/src/components` — Common layout elements (e.g. `Navbar.js`, `Navbar.css`)
  * `/src/context` — State managers (`AuthContext.js`, `CartContext.js`)
  * `/src/pages` — View pages (`Home.js`, `Products.js`, `Cart.js`, `Login.js`, `Register.js`, `FreeDelivery.js`, `SecurePayment.js`, `EasyReturns.js`)
  * `/src/services` — Axios API endpoints configuration (`api.js`)
  * `App.js` & `index.js` — Main routing and bootstrap entry points
* **Server (Node/Express Backend):**
  * `/config` — Database connection wrapper (`db.js`)
  * `/controllers` — Route controllers (`authController.js`, `cartController.js`, `productController.js`)
  * `/models` — Mongoose Database Schemas (`User.js`, `Product.js`, `Cart.js`)
  * `/routes` — API route mappings (`authRoutes.js`, `cartRoutes.js`, `productRoutes.js`)
  * `server.js` — Server startup file

---

### 6. Running the Application
1. **Start Backend Server:**
   ```bash
   cd server
   npm start
   ```
2. **Start Frontend Server:**
   ```bash
   cd client
   npm start
   ```

---

### 7. API Documentation
* **Authentication Routes:**
  * `POST /api/auth/register` — Registers a new user. 
    * *Payload:* `{ name, email, password }`
    * *Response (201):* `{ _id, name, email, token }`
  * `POST /api/auth/login` — Authenticates user.
    * *Payload:* `{ email, password }`
    * *Response (200):* `{ _id, name, email, token }`
* **Product Routes:**
  * `GET /api/products` — Fetches catalog lists.
    * *Response (200):* Array of products `[{ _id, name, price, image }]`
* **Cart Routes:**
  * `GET /api/cart/:userId` — Retrieves user cart.
    * *Response (200):* `{ userId, items: [...] }`
  * `POST /api/cart/add` — Adds product to cart.
    * *Payload:* `{ userId, product }`
  * `POST /api/cart/remove` — Removes product from cart.
    * *Payload:* `{ userId, productId }`
  * `POST /api/cart/clear` — Clears all cart items on successful order.
    * *Payload:* `{ userId }`

---

### 8. Authentication
* **Bcrypt Hashing:** Users' passwords are encrypted using `bcryptjs` with a salt factor of `10` before insertion into the database.
* **JWT Tokens:** Session management uses JSON Web Tokens (expires in 30 days). The client stores the returned profile and token inside `localStorage`, appending it to headers for authenticated actions.
* **Resilience Fallback:** If the database is disconnected, registration is processed locally via browser storage fallbacks, letting users sign in and test e-commerce workflows without server delays.

---

### 9. User Interface
* **Features Showcase:**
  * **Homepage Ticker:** An infinite scrolling marquee loop displaying "Why Choose ShopEz?" values.
  * **Interactive Checkout Forms:** Elegant wizard steps with client-side form validations (10-digit mobile number, 6-digit pin code, 16-digit card number, CVV masking).
  * **Modals Layout:** Clickable policy links overlay on-screen using glassmorphism backgrounds to display shipping, returns, and safety policies.

---

### 10. Testing
* **Client Unit Tests:** Modified Jest unit test suites inside `App.test.js` to assert the "ShopEz" brand logo rendering, ensuring CI checks compile cleanly (exiting with code 0).
* **Environment variables checks:** Verified REST endpoint functionality through local program scripts.

---

### 11. Screenshots or Demo
* *Visual files are archived inside the `/screenshots` folder at the root directory.*
* **Demo Video Link:** [Add your screen recording link here]

---

### 12. Known Issues
* **Database Whitelist Timeout:** If MongoDB Atlas restricts access (un-whitelisted host IP), queries would ordinarily time out. By turning `bufferCommands: false` on, the app immediately catches the exception and switches to in-memory/Offline Mode fallback.

---

### 13. Future Enhancements
* **Gateway integration:** Transition from a simulated checkout form to live payment processor checkout options (Stripe / Razorpay).
* **Inventory Control Panel:** Build an interactive Seller/Admin dashboard to add, edit, or delete items in the live product database catalog.
