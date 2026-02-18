# MongoDB Setup Guide for E-Commerce MERN App

## Option 1: Local MongoDB (Recommended for Development)

### Install MongoDB Locally
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run on `mongodb://localhost:27017`

### Update .env file:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

---

## Option 2: MongoDB Atlas (Cloud)

### Step 1: Create Account & Cluster
1. Go to https://cloud.mongodb.com
2. Sign up or log in
3. Create a **FREE** cluster (M0 Sandbox)

### Step 2: Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Enter:
   - Username: `ecommerce_user` (or your choice)
   - Password: Generate a secure password (copy it!)
5. Set **Database User Privileges** to **Read and write to any database**
6. Click **Add User**

### Step 3: Allow Network Access
1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
4. Click **Confirm**

### Step 4: Get Connection String
1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string

### Step 5: Update .env
Replace `<username>`, `<password>`, and `<cluster>` with your values:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce?retryWrites=true&w=majority
```

**Example:**
```
MONGODB_URI=mongodb+srv://ecommerce_user:MySecurePass123@cluster0.abc123.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## Common Errors

| Error | Solution |
|-------|----------|
| `Authentication failed` | Wrong username/password - recreate database user |
| `Network timeout` | Add your IP to Network Access whitelist |
| `ECONNREFUSED` | MongoDB not running (local) or wrong URI |

---

## Verify Connection
After updating `.env`, restart the backend:
```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: cluster0-shard-00-00...
```
