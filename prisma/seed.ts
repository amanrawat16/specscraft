import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu8.m', // password123
    },
  });

  console.log('✅ Test user created:', testUser.email);

  // Create products
  const products = [
    {
      sku: "SKU123",
      name: "Mechanical Keyboard",
      price: "99.99",
      image: "https://i.redd.it/83biveqo6yva1.jpg",
      description: "Premium mechanical keyboard with RGB lighting and customizable switches"
    },
    {
      sku: "SKU456",
      name: "Gaming Mouse",
      price: "49.99",
      image: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2025/03/logitech-g502-x-plus-hero-2.jpg",
      description: "High-precision gaming mouse with adjustable DPI and programmable buttons"
    },
    {
      sku: "SKU789",
      name: "Gaming Monitor",
      price: "199.99",
      image: "https://external-preview.redd.it/phpFjZIqopb3PORXttPlTEQ5YW4IAJjD9ubStowhZ_M.jpg?width=640&crop=smart&auto=webp&s=515528f04735066e70e0daa8ced435405ad14eca",
      description: "27-inch 144Hz gaming monitor with 1ms response time"
    },
    {
      sku: "NEXT101",
      name: "Next.js Course",
      price: "29.99",
      image: "https://nextjs.org/static/twitter-cards/app-router.png",
      description: "Complete Next.js 14 course with App Router and Server Components"
    },
    {
      sku: "NEXT202",
      name: "Next.js Templates",
      price: "19.99",
      image: "https://nextjs.org/static/twitter-cards/app-router.png",
      description: "Premium Next.js templates and components library"
    },
    {
      sku: "MDXPRO",
      name: "MDX Pro Editor",
      price: "39.99",
      image: "https://mdxjs.dev/img/banner.png",
      description: "Professional MDX editor with live preview and syntax highlighting"
    },
    {
      sku: "MDXEDITOR",
      name: "MDX Basic Editor",
      price: "9.99",
      image: "https://mdxjs.dev/img/banner.png",
      description: "Simple MDX editor for beginners"
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log('✅ Products created:', products.length);

  // Create posts
  const posts = [
    {
      title: "Best Gaming PC Setup in 2025",
      slug: "best-gaming-pc-setup-2025",
      authorId: testUser.id,
      coverImage: "https://www.ilifestore.in/wp-content/uploads/2024/04/image.jpg",
      body: `# The Ultimate Gaming PC Setup in 2025

Gaming in 2025 is not just about raw power—it's about immersive experiences, AI optimization, and aesthetic setups that wow.

## 🔥 Specs That Dominate

If you're aiming for the best, here's what your gaming rig should look like:

- **CPU**: AMD Ryzen 9 9950X or Intel Core i9-14900K
- **GPU**: NVIDIA RTX 5090 Ti or AMD Radeon RX 8900 XT
- **RAM**: 64GB DDR5 @ 6400MHz
- **Storage**: 4TB NVMe Gen 5 SSD
- **Monitor**: 32" OLED 4K 240Hz

> *"Frames win games."* — every esports pro ever.

---

## 🎮 Accessories That Level Up

A top-tier PC needs next-level peripherals:

- Mechanical RGB Keyboard (optical switches)
- Precision Gaming Mouse (8000Hz polling)
- AI Noise Cancelling Microphone
- 7.1 Surround Wireless Headset
- Smart Ambient Lighting (Philips Hue or Nanoleaf)

---

{{block name="Top Gaming Gear 2025" image="https://img.freepik.com/premium-photo/ultimate-rgb-gaming-setup_1312035-2462.jpg?semt=ais_hybrid&w=740" products="SKU123,SKU456"}}

---

## 🧠 Smart Enhancements

AI and automation now play a big role in gaming setups:

- Auto-tuned fan profiles with ML
- AI-powered resolution upscaling
- Game-optimized lighting via Razer Synapse & iCue

## 🛠️ Custom Build or Prebuilt?

While prebuilt options are better than ever, custom builds still win in thermals, aesthetics, and price-to-performance.

---

### 🏁 Final Thoughts

2025 is the golden age of PC gaming. Whether you're streaming in 8K or chasing 300 FPS, the tools are better than ever.

> *"It's not just a PC. It's a command center."*

Let us know your favorite components below!`,
      publishedAt: new Date("2025-06-19T09:15:00Z"),
    },
    {
      title: "TailwindCSS for Beginners",
      slug: "tailwindcss-for-beginners",
      authorId: testUser.id,
      body: `# TailwindCSS for Beginners

Tailwind CSS is a utility-first CSS framework.

It helps you style quickly and consistently using utility classes. You don't need to write custom CSS for every design pattern.

## Advantages:
- Fast prototyping
- Mobile-first responsive styles
- Small bundle sizes with PurgeCSS

{{block name="Top Picks" image="https://i.ebayimg.com/images/g/KpQAAeSw3LJnvTA4/s-l1600.jpg" products="SKU123,SKU456"}}

> "Tailwind lets me build fast and clean UIs." — A developer`,
      coverImage: "https://miro.medium.com/v2/resize:fit:1400/1*__f27S-qQF2CAASt5bOwqg.png",
      publishedAt: new Date("2025-06-16"),
    },
    {
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      authorId: testUser.id,
      body: `# Getting Started with React

React is a popular JavaScript library for building user interfaces.

## Why React?
- Component-based architecture
- Reusable code
- Virtual DOM for efficient updates

### Basic Concepts:
- **JSX**: HTML-like syntax in JavaScript
- **Components**: Small building blocks
- **Props & State**: Manage dynamic data

Start by creating a component:

\`\`\`jsx
function Welcome() {
  return <h1>Hello, world!</h1>;
}
\`\`\`

Use hooks like \`useState\` and \`useEffect\` for state and lifecycle management.

React powers apps like Facebook, Instagram, and more.`,
      coverImage: "https://reactjs.org/logo-og.png",
      publishedAt: new Date("2025-06-15T14:30:00Z"),
    },
    {
      title: "Exploring Next.js App Router",
      slug: "exploring-nextjs-app-router",
      authorId: testUser.id,
      body: `# Exploring Next.js App Router

Next.js 14 introduced a powerful App Router to simplify routing and improve performance.

## Features:
- File-based routing with folders
- Route groups
- Server & Client Components
- Loading UI with suspense

### How it Works
Define layouts at the root level and nest them for consistent design.
Use \`page.tsx\` inside a route folder like:

\`\`\`
/app/posts/[slug]/page.tsx
\`\`\`

You can now stream content from the server directly to the client!

{{block name="Next Tips" image="https://nextjs.org/static/twitter-cards/app-router.png" products="NEXT101,NEXT202"}}`,
      coverImage: "https://media.licdn.com/dms/image/v2/D4E12AQEIIDCbb5draA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696065152678?e=2147483647&v=beta&t=rs8wHzzcy-PY8TK-1tXFBBBPkogj5HFodSVZnZppye0",
      publishedAt: new Date("2025-06-14T09:00:00Z"),
    },
    {
      title: "10 TypeScript Tips for JavaScript Developers",
      slug: "typescript-tips",
      authorId: testUser.id,
      body: `# 10 TypeScript Tips for JavaScript Developers

TypeScript offers type safety and better developer tooling for JavaScript developers.

## Tips:
1. Use \`as const\` to enforce literal types
2. Prefer \`interface\` for object types
3. Avoid \`any\` — use \`unknown\` or proper typing
4. Use enums or union types for constants
5. Leverage type inference for cleaner code
6. Narrow types with type guards
7. Use \`Partial<T>\` and \`Pick<T, K>\` utilities
8. Understand structural typing
9. Add JSDoc for better IntelliSense
10. Configure \`tsconfig.json\` properly

TypeScript grows with your codebase and scales well for teams.`,
      coverImage: "https://kinsta.com/wp-content/uploads/2023/04/what-is-typescript.jpeg",
      publishedAt: new Date("2025-06-13T16:45:00Z"),
    },
    {
      title: "Building Blogs with MDX",
      slug: "building-blogs-with-mdx",
      authorId: testUser.id,
      body: `# Building Blogs with MDX

MDX allows you to write JSX directly in Markdown files.

## Use Cases:
- Documentation sites
- Developer blogs
- Interactive content

### Benefits:
- Reuse React components
- Easy content authoring
- Fully typed Markdown

Example:

\`\`\`mdx
# Hello MDX
<Alert type="info">This is dynamic!</Alert>
\`\`\`

Combine content and code for powerful storytelling.

{{block name="MDX Tools" image="https://mdxjs.dev/img/banner.png" products="MDXPRO,MDXEDITOR"}}`,
      coverImage: "https://opengraph.githubassets.com/1f2347fb531b1eec5e4a8cb2705a8001df50186acf82c1a78ebc80d25215a535/owolfdev/mdx-blog-basic",
      publishedAt: new Date("2025-06-12T11:20:00Z"),
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('✅ Posts created:', posts.length);

  // Create test comments
  const createdPosts = await prisma.post.findMany();
  
  if (createdPosts.length > 0) {
    const firstPost = createdPosts[0];
    
    const comments = [
      {
        content: "Great article! I've been looking for a comprehensive gaming setup guide. The specs you mentioned are exactly what I need for my new build.",
        postId: firstPost.id,
        authorId: testUser.id,
        createdAt: new Date("2025-06-19T10:30:00Z"),
      },
      {
        content: "Thanks for sharing these tips! I especially liked the section about AI enhancements. Do you have any recommendations for specific AI-powered tools?",
        postId: firstPost.id,
        authorId: testUser.id,
        createdAt: new Date("2025-06-19T11:15:00Z"),
      },
      {
        content: "This is exactly what I needed! The peripheral recommendations are spot on. I'm definitely going to invest in that mechanical keyboard.",
        postId: firstPost.id,
        authorId: testUser.id,
        createdAt: new Date("2025-06-19T12:00:00Z"),
      }
    ];

    for (const comment of comments) {
      await prisma.comment.create({
        data: comment,
      });
    }

    console.log('✅ Test comments created:', comments.length);
  }

  console.log('🌱 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 