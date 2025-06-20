# Specscraft Blog Platform

A full-featured blogging platform built with Next.js 14, featuring dynamic custom blocks, authentication, database integration, and beautiful animations.

## ✨ Features

### Core Features
- **Authentication System** - Secure user registration and login with NextAuth.js
- **Dynamic Block System** - Parse and render custom `{{block}}` components
- **Database Integration** - PostgreSQL with Prisma ORM
- **Protected Routes** - Middleware-based route protection
- **Responsive Design** - Mobile-first design with TailwindCSS
- **Dark Mode** - Toggle between light and dark themes

### Blog Features
- **Create/Edit Posts** - Rich text editor with markdown support
- **Comment System** - Users can comment on posts
- **SEO-Friendly URLs** - Clean slug-based routing
- **Image Support** - Cover images and inline images
- **Author Management** - User roles and permissions

### UI/UX Features
- **Framer Motion** - Smooth animations and transitions
- **Modern Design** - Clean, professional interface
- **Loading States** - Skeleton loaders and spinners
- **Toast Notifications** - User feedback for actions
- **Responsive Grid** - Adaptive layout for all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Markdown**: React Markdown
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd specscraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database (Supabase PostgreSQL recommended)
   DATABASE_URL="postgresql://username:password@localhost:5432/specscraft"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following Prisma schema:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?
  image     String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  posts    Post[]
  comments Comment[]
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  body        String
  coverImage  String?
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  authorId String
  author   User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  postId   String
  post     Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId String
  author   User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
}

model Product {
  id          String   @id @default(cuid())
  sku         String   @unique
  name        String
  price       String
  image       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔐 Authentication

The platform uses NextAuth.js with credentials provider:

- **Sign Up**: `/auth/signup` - Create new account
- **Sign In**: `/auth/signin` - Login to existing account
- **Protected Routes**: Create, edit, and delete operations require authentication
- **User Roles**: Support for USER and ADMIN roles

## 🎨 Dynamic Blocks

The platform supports custom block rendering with the following syntax:

```markdown
{{block name="Top Picks" image="/top-products.png" products="SKU123,SKU456"}}
```

### Block Attributes
- `name`: Display name for the block
- `image`: Optional image URL
- `products`: Comma-separated list of product SKUs

### Example Usage
```markdown
# My Blog Post

This is a regular paragraph.

{{block name="Featured Products" image="https://example.com/image.jpg" products="SKU123,SKU456,SKU789"}}

More content here...
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 📁 Project Structure

```
specscraft/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── posts/          # Blog post endpoints
│   ├── auth/               # Authentication pages
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── lib/                # Utilities and configurations
│   ├── posts/              # Blog post pages
│   └── types/              # TypeScript types
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── middleware.ts           # Route protection
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Roadmap

- [ ] Real-time comments with WebSockets
- [ ] Advanced search and filtering
- [ ] Image upload and management
- [ ] Email notifications
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] PWA features

---

Built with ❤️ using Next.js, Prisma, and TailwindCSS
