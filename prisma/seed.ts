
/*
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

const users = [
  {
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN',
    posts: [
      {
        title: 'Welcome to DevBlog',
        content: 'This is your first post. Edit or delete it, then start writing!',
        published: true,
      },
      {
        title: 'Getting Started with Next.js',
        content: 'Next.js is a powerful framework for building React applications...',
        published: true,
      }
    ]
  },
  {
    email: 'john@example.com',
    name: 'John Developer',
    role: 'USER',
    posts: [
      {
        title: 'My Journey in Web Development',
        content: 'I started programming three years ago...',
        published: true,
      },
      {
        title: 'React Best Practices',
        content: 'Here are some tips for writing better React code...',
        published: true,
      }
    ]
  },
  {
    email: 'sarah@example.com',
    name: 'Sarah Tech',
    role: 'USER',
    posts: [
      {
        title: 'Understanding TypeScript',
        content: 'TypeScript adds static typing to JavaScript...',
        published: true,
      },
      {
        title: 'CSS Grid vs Flexbox',
        content: 'When to use Grid and when to use Flexbox...',
        published: true,
      }
    ]
  },
  {
    email: 'mike@example.com',
    name: 'Mike Frontend',
    role: 'USER',
    posts: [
      {
        title: 'Modern CSS Features',
        content: 'Exploring the latest CSS features...',
        published: true,
      },
      {
        title: 'State Management in 2024',
        content: 'Comparing different state management solutions...',
        published: true,
      }
    ]
  }
]

async function main() {
  // Create users and their posts
  for (const userData of users) {
    const hashedPassword = await hash('password123', 12)
    
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
        theme: 'light',
        posts: {
          create: userData.posts.map(post => ({
            ...post,
            slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
          }))
        }
      },
    })
  }

  // Create some additional random posts
  const allUsers = await prisma.user.findMany()
  const additionalPosts = [
    'Mastering Git Commands',
    'Docker for Beginners',
    'API Design Principles',
    'Testing React Components',
    'Database Optimization Tips',
    'Web Security Best Practices',
    'Responsive Design Patterns',
    'JavaScript Performance Tips',
  ]

  for (const title of additionalPosts) {
    const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)]
    await prisma.post.create({
      data: {
        title,
        content: `This is a sample post about ${title.toLowerCase()}...`,
        published: Math.random() > 0.2, // 80% chance of being published
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        authorId: randomUser.id,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      }
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

*/