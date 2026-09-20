# VPLAK Order Search & Management Panel

A full-stack Order Search Panel matching the VPLAK e-commerce admin recruitment task. Built with **Laravel 11 REST API** (PHP 8.2+) on the backend and a modern **React (Vite + Tailwind CSS)** frontend.

---

## 📸 Preview & Features

- **Pixel-Accurate UI**: Matches the VPLAK top navigation bar, teal background, fieldset search box, and order card layout.
- **Multi-Criteria Search**: Instant search filtering by:
  - `OrderId`
  - `Mobile`
  - `Name`
  - `Email`
- **Order Tracking**: Interactive **TRACK** popup showing real-time milestone progress (Ordered ➔ Packed ➔ Dispatched ➔ Delivered).
- **Invoice Generation**: One-click **Generate Invoice** preview with `window.print()` / PDF export support.
- **Pre-Seeded Data**: Comes pre-populated with the exact dummy orders shown in the recruitment test (Vivo phone `78369274`, `88451236`, etc.).

---

## 🏗️ Architecture & Project Structure

```
order-search-panel/
├── backend/                  # Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/OrderController.php  # Search, Track, Invoice logic
│   │   └── Models/ (Order.php, Buyer.php, OrderItem.php)
│   ├── database/
│   │   ├── migrations/      # buyers, orders, order_items schemas
│   │   └── seeders/         # OrderSeeder with screenshot test records
│   ├── routes/
│   │   ├── api.php          # /api/orders, /api/orders/{id}/track, etc.
│   │   └── web.php          # Serves compiled React app
│   └── public/app/          # Built React production bundle
│
└── frontend/                 # React (Vite + Tailwind CSS)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Header with VPLAK branding
    │   │   ├── SearchBox.jsx    # Search fieldset with radio filters
    │   │   ├── OrderCard.jsx    # Order card with nested items
    │   │   ├── TrackModal.jsx   # Shipment tracking progress modal
    │   │   └── InvoiceModal.jsx # Printable tax invoice modal
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

---

## 🚀 Quick Start (Local Setup)

### 1. Backend (Laravel)
```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan serve --port=8000
```
*The backend will start at `http://127.0.0.1:8000`.*

### 2. Frontend (React Dev Mode)
```bash
cd frontend
npm install
npm run dev
```
*The frontend will run at `http://localhost:5173` with automated API proxying to `http://127.0.0.1:8000`.*

### 3. Unified Production Build (Single Server)
```bash
cd frontend
npm run build
```
Once built, access the complete unified app directly at:
👉 **`http://127.0.0.1:8000/app/`**

---

## 📡 API Reference

### 1. Search Orders
`GET /api/orders`

**Query Parameters:**
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `search_by` | `string` | Field to filter by: `order_id`, `mobile`, `name`, `email` |
| `keyword` | `string` | Keyword to search |

**Sample Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "order_number": "78369274",
      "order_date": "30-08-2017 03:29:17",
      "payment_mode": "cod",
      "total_amount": 799,
      "status": "fulfilled",
      "buyer": {
        "name": "dummy",
        "state": "Delhi",
        "email": "dummy@test.com",
        "phone": "9876543210"
      },
      "items": [
        {
          "product_name": "Blue Vivo Mobile Phone",
          "model": "Y11",
          "price": 799,
          "quantity": 1,
          "delivery_charges": 0,
          "discount": 0,
          "status": "fulfilled"
        }
      ]
    }
  ]
}
```

### 2. Track Order
`GET /api/orders/{order_number}/track`

### 3. Order Invoice
`GET /api/orders/{order_number}/invoice`

---

## 🌐 Free Deployment Guide

### Deploying to Render.com (Recommended)
1. Push this repository to **GitHub**.
2. Go to [Render.com](https://render.com) ➔ New **Web Service**.
3. Set Root Directory to `backend`.
4. Build Command:
   ```bash
   composer install --no-dev --optimize-autoloader && php artisan migrate --force --seed
   ```
5. Start Command:
   ```bash
   php artisan serve --host 0.0.0.0 --port 10000
   ```
6. Set Environment Variables:
   - `APP_KEY`: *(Generated via `php artisan key:generate --show`)*
   - `APP_ENV`: `production`
   - `DB_CONNECTION`: `sqlite` (or configure MySQL)

