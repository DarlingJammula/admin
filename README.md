# Woodzon Admin Panel

A production-ready Admin Panel for Woodzon e-commerce platform built with Next.js 15, NestJS, and PostgreSQL.

## 🚀 Features

- **Authentication**: JWT-based auth with role-based access control (RBAC)
- **Dashboard**: Real-time metrics and KPIs
- **Seller Management**: Approve/reject seller applications with document review
- **Product Management**: Review and approve product listings
- **Order Management**: Track and manage customer orders
- **Category Management**: Hierarchical category structure with infinite nesting
- **CMS**: Banner management for promotional content
- **Responsive Design**: Works seamlessly on desktop and mobile

## 📋 Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL 15 with Prisma ORM
- **Authentication**: JWT with Passport
- **API Docs**: Swagger/OpenAPI
- **Validation**: class-validator & Zod

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: TailwindCSS + ShadCN UI
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **HTTP**: Axios with interceptors

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Cache**: Redis (ready)
- **Storage**: MinIO (S3-compatible)

## 🛠️ Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd c:\Users\jammu\Downloads\admin
cp .env.example .env
```

### 2. Start with Docker Compose

```bash
docker-compose up --build
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MinIO Console**: http://localhost:9001

### 3. Login

Use the default admin credentials:
- **Email**: `admin@woodzon.com`
- **Password**: `admin123`

## 💻 Local Development

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev
```

The backend will be available at http://localhost:3001

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

## 📁 Project Structure

```
admin/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Seed data
│   ├── src/
│   │   ├── auth/              # Authentication
│   │   ├── users/             # User management
│   │   ├── sellers/           # Seller approvals
│   │   ├── products/          # Product approvals
│   │   ├── orders/            # Order management
│   │   ├── categories/        # Categories
│   │   ├── dashboard/         # Dashboard metrics
│   │   └── prisma/            # Prisma service
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── login/             # Login page
│   │   └── dashboard/         # Dashboard pages
│   ├── components/
│   │   ├── ui/                # ShadCN components
│   │   └── app-sidebar.tsx   # Sidebar
│   ├── lib/
│   │   ├── api-client.ts     # API client
│   │   └── store.ts          # State management
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔑 Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
# Database
DB_USER=admin
DB_PASSWORD=adminpassword
DB_NAME=woodzon_db
DB_PORT=5432

# Redis
REDIS_PORT=6379

# MinIO (S3)
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
MINIO_PORT=9000
MINIO_CONSOLE_PORT=9001
MINIO_BUCKET=woodzon-uploads

# Backend
BACKEND_PORT=3001
JWT_SECRET=supersecretkey123
JWT_REFRESH_SECRET=supersecretrefreshkey123

# Frontend
FRONTEND_PORT=3000
```

## 📚 API Documentation

Access the interactive Swagger documentation at:
- http://localhost:3001/api

## 🎯 Key Features Implemented

### ✅ Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Automatic token refresh
- Protected routes

### ✅ Seller Approvals
- View pending applications
- Review business details and documents
- Approve/Reject/Request Info
- Status tracking

### ✅ Product Management
- List pending products
- View product details
- Approve/Reject with reasons
- Category and seller information

### ✅ Order Management
- Comprehensive order listing
- Search functionality
- Status tracking
- Order details with items

### ✅ Category Management
- Hierarchical tree structure
- Create/Edit/Delete categories
- Infinite nesting support
- Active/Inactive status

### ✅ Dashboard
- Real-time KPIs
- Sales metrics
- User statistics
- Recent alerts

## 🧪 Testing

### Manual Testing

1. Login with admin credentials
2. Navigate through all sections
3. Test seller approval workflow
4. Test product approval workflow
5. View and search orders
6. Manage categories

### API Testing

Use the Swagger UI at http://localhost:3001/api to test all endpoints.

## 📝 Assumptions

- **Currency**: INR (Indian Rupees)
- **Timezone**: UTC for storage
- **Pagination**: Default 20 items per page
- **File Storage**: MinIO for local, S3 for production
- **Token Expiry**: Access 60min, Refresh 7 days

## 🔒 Security

- Passwords hashed with bcrypt
- JWT with secure secrets
- CORS enabled
- Input validation on all endpoints
- RBAC enforcement
- SQL injection prevention via Prisma

## 🚧 Known Limitations

- S3 image upload flow (backend ready, frontend needs integration)
- Redis caching (infrastructure ready)
- WebSocket notifications (not implemented)
- Unit tests (not written)

## 🎨 UI/UX

- Modern, clean design with ShadCN UI
- Fully responsive (desktop & mobile)
- Loading states and error handling
- Form validation with Zod
- Accessible components

## 📦 Deployment

### Production Checklist

- [ ] Update JWT secrets to strong random values
- [ ] Configure proper CORS origins
- [ ] Set up SSL/TLS certificates
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Enable Redis caching
- [ ] Set up CDN for static assets

## 🤝 Contributing

This is a production-ready implementation. For enhancements:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

UNLICENSED

## 👥 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js 15, NestJS, and PostgreSQL**

