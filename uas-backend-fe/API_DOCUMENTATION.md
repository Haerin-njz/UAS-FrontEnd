# API Backend Authentication Documentation

## Setup

### 1. Installed Dependencies
```bash
npm install sqlite3 bcryptjs jsonwebtoken
```

### 2. Database Structure

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Transactions Table (optional)
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  film_id INTEGER,
  amount REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
```

## API Endpoints

### 1. Sign Up (Register)

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone_number": "08123456789"
}
```

**Success Response (201):**
```json
{
  "message": "Registrasi berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**Error Responses:**
- `400`: Email sudah terdaftar / Format email tidak valid / Password terlalu pendek
- `500`: Server error

---

### 2. Sign In (Login)

**Endpoint:** `POST /api/auth/signin`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone_number": "08123456789"
  }
}
```

**Error Responses:**
- `401`: Email atau password salah
- `500`: Server error

---

## File Structure

```
uas-backend-fe/
├── app/
│   └── api/
│       └── auth/
│           ├── signup/
│           │   └── route.ts      # Sign up endpoint
│           └── signin/
│               └── route.ts      # Sign in endpoint
├── db/
│   ├── cinema.db                 # SQLite database file (auto-created)
│   └── database.ts               # Database connection & initialization
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   └── db-helpers.ts             # Database helper functions
└── .env.local                    # Environment variables
```

## Usage in Frontend

### Sign Up Example
```typescript
const signUp = async (email: string, password: string, fullName: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
    }),
  });
  
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};
```

### Sign In Example
```typescript
const signIn = async (email: string, password: string) => {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};
```

## Security Notes

1. **Change JWT_SECRET**: Update the `JWT_SECRET` in `.env.local` dengan secret key yang kuat
2. **HTTPS Only**: Selalu gunakan HTTPS di production
3. **Token Expiration**: Token berlaku selama 7 hari
4. **Password Hashing**: Password di-hash menggunakan bcrypt dengan salt 10
5. **Password Strength**: Minimum 6 karakter (bisa ditingkatkan sesuai kebutuhan)

## Token Verification

Token dapat di-verify menggunakan fungsi `verifyToken()` dari `lib/auth.ts`:

```typescript
import { verifyToken } from '@/lib/auth';

const decoded = verifyToken(token);
if (decoded) {
  console.log(decoded.userId, decoded.email);
} else {
  console.log('Token tidak valid');
}
```

## Testing

### 1. UI Testing (Browser-based)

Buka file test UI di browser:
```
http://localhost:3000/test-auth.html
```

Fitur:
- 📝 Form Sign Up dengan validasi
- 🔐 Form Sign In dengan validasi
- 👥 Button untuk melihat semua data user di database
- Real-time feedback dengan UI yang cantik

### 2. Check Database dengan Script Node.js

Jalankan script untuk melihat isi database:
```bash
node scripts/test-db.js
```

Output akan menampilkan:
- Total users di database
- Email, nama, telepon, waktu registrasi setiap user

### 3. Check via API Endpoint

**Endpoint:** `GET /api/auth/users`

Menggunakan cURL:
```bash
curl http://localhost:3000/api/auth/users
```

Menggunakan Postman:
- Method: GET
- URL: http://localhost:3000/api/auth/users
- Response akan menampilkan semua data user

### 4. Check dengan Postman

**Sign Up:**
- Method: POST
- URL: http://localhost:3000/api/auth/signup
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone_number": "08123456789"
}
```

**Sign In:**
- Method: POST
- URL: http://localhost:3000/api/auth/signin
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Get Profile (Protected - perlu token):**
- Method: GET
- URL: http://localhost:3000/api/auth/profile
- Header: 
  - Key: Authorization
  - Value: Bearer {token_dari_signup_atau_signin}

### 5. Database File

Database SQLite tersimpan di:
```
db/cinema.db
```

Anda bisa membuka dengan aplikasi seperti:
- DB Browser for SQLite (gratis, open source)
- SQLite Studio
- atau tools lainnya yang support SQLite

## Additional Features

Anda dapat menambahkan fitur berikut:
- Password reset functionality
- Email verification
- User profile update
- Two-factor authentication
- Rate limiting untuk login attempts
- Refresh token mechanism
