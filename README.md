# Specscraft Blog

- **Modern Blog Platform**: Built with Next.js 14 App Router and TypeScript
- **Dynamic Content Blocks**: Custom block system for embedding products and rich content within blog posts
- **Full CRUD Operations**: Create(In-memory), Read, Update(In-memory), and Delete (not done as we doing it memory it will be removed automatically).
- **Dark/Light Theme**: Toggle between themes with system preference detection for first time users
- **Markdown Support**: Rich text content with React Markdown
- **Product Integration**: Embed product showcases within blog content
- **SEO Optimized**: Server-side rendering.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: React Markdown
- **Icons**: Custom theme toggle with emojis
- **Fonts**: Geist (Vercel's custom font)


### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd specscraft
```

### 2. Install Dependencies

```bash
npm install

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variable:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000(the port you are running the app)
```

### 4. Run the Development Server

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎯 Key Features Explained

### 1. Dynamic Content Blocks

The application supports custom content blocks within blog posts using the syntax:

```markdown
{{block name="Block Title" image="image-url" products="SKU123,SKU456"}}
```

###  Blog Post Management

- **Create Posts**: `/create` - Form to create new blog posts
- **View Posts**: `/posts/[slug]` - Individual blog post pages
- **Edit Posts**: `/edit/[id]` - Edit existing blog posts
- **List Posts**: `/` - Homepage with all blog posts

###  API Endpoints (Create and Edit is in-memory right now)

- `GET /api/posts` - Get all blog posts
- `GET /api/posts/[slug]` - Get specific blog post
- `POST /api/posts/create` - Create new blog post
- `PUT /api/posts/edit/[id]` - Update existing blog post

### Adding New Content Blocks

1. Extend the `BlockRenderer` component in `app/components/ui/BlockRenderer.tsx`
2. Update the parsing logic in `app/lib/utils/parseBlocks.tsx`
3. Add new block types to the markdown content

### Data Management

Currently, the application uses mock data stored in:
- `app/data/posts.ts` - Blog posts data
- `app/data/products.ts` - Product catalog
