# Product Requirements Document (PRD)

## Product Name

**E‑Commerce Website using MERN Stack**

## Technology Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens)
* **State Management:** Context API / Redux (optional)
* **Deployment (Optional):** Vercel (Frontend), Render / Railway / AWS (Backend)

---

## 1. Introduction

This document defines the complete Product Requirements for the **E‑Commerce Website using MERN Stack**. The system aims to provide an online platform where users can browse products, add them to a cart, place orders, and manage their profiles. Administrators can manage products, users, and orders through a secure admin panel.

---

## 2. Purpose & Goals

### Purpose

To build a scalable, secure, and user‑friendly e‑commerce platform using modern web technologies.

### Goals

* Enable users to buy products online easily
* Provide secure authentication and payment handling
* Allow admins to manage the store efficiently
* Ensure fast performance and responsive UI

---

## 3. Target Users

### 3.1 End Users (Customers)

* Browse products
* Search and filter products
* Add items to cart
* Place orders
* Track order status
* Manage profile

### 3.2 Admin Users

* Add, update, delete products
* Manage users
* View and update orders
* Manage inventory

---

## 4. System Scope

### In Scope

* User authentication (Login / Register)
* Product management
* Shopping cart
* Order placement
* Admin dashboard

### Out of Scope (Phase 1)

* Mobile app
* Multi‑vendor marketplace
* AI‑based recommendations

---

## 5. Functional Requirements

### 5.1 User Authentication & Authorization

**Features:**

* User registration
* User login/logout
* Password encryption using bcrypt
* JWT‑based authentication
* Role‑based access (User / Admin)

**Backend:**

* POST /api/auth/register
* POST /api/auth/login

---

### 5.2 User Profile Management

**Features:**

* View profile
* Update profile details
* View order history

---

### 5.3 Product Management

**Admin Features:**

* Add new products
* Update product details
* Delete products
* Upload product images

**Product Fields:**

* Name
* Description
* Price
* Category
* Stock quantity
* Image URL

---

### 5.4 Product Browsing & Search

**Features:**

* View all products
* Filter by category
* Search by name
* Sort by price / popularity

---

### 5.5 Shopping Cart

**Features:**

* Add product to cart
* Remove product from cart
* Update quantity
* Persist cart using localStorage / database

---

### 5.6 Order Management

**User Features:**

* Place an order
* View order status

**Admin Features:**

* View all orders
* Update order status (Pending, Shipped, Delivered)

---

### 5.7 Payment Integration (Optional)

* Stripe / PayPal integration
* Secure checkout

---

## 6. Non‑Functional Requirements

### 6.1 Performance

* Page load time < 3 seconds
* API response time < 500ms

### 6.2 Security

* Password hashing
* JWT authentication
* Protected admin routes
* Input validation

### 6.3 Scalability

* Modular backend architecture
* RESTful APIs

### 6.4 Usability

* Responsive UI
* Mobile‑friendly design

---

## 7. Frontend Requirements (React)

### Pages

* Home Page
* Product Listing Page
* Product Details Page
* Cart Page
* Checkout Page
* Login / Register Page
* User Profile Page
* Admin Dashboard

### UI Libraries (Optional)

* Tailwind CSS / Bootstrap / Material UI

---

## 8. Backend Requirements (Node + Express)

### API Structure

* /api/auth
* /api/users
* /api/products
* /api/orders

### Middleware

* Authentication middleware
* Error handling middleware

---

## 9. Database Design (MongoDB + Mongoose)

### User Schema

* name
* email
* password
* role
* createdAt

### Product Schema

* name
* description
* price
* category
* stock
* image

### Order Schema

* userId
* products[]
* totalAmount
* status
* createdAt

---

## 10. Assumptions & Constraints

### Assumptions

* Internet connection is available
* Users have basic browsing knowledge

### Constraints

* Limited budget
* Single database

---

## 11. Future Enhancements

* Wishlist feature
* Product reviews & ratings
* AI‑based recommendations
* Mobile application

---

## 12. Success Metrics

* Number of registered users
* Conversion rate
* Order completion rate
* Page load performance

---

## 13. Conclusion

The **E‑Commerce Website using MERN Stack** is designed to provide a complete online shopping experience with modern technologies, scalability, and security. This PRD serves as a foundation for development, testing, and future enhancements.

---

**Prepared By:** Khayyam Abbasi
**Project Type:** MERN Stack Web Application
