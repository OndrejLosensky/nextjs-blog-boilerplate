
/*
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      theme: 'light',
      posts: {
        create: [
          {
            title: 'Welcome to DevBlog',
            content: 'This is your first post. Edit or delete it, then start writing!',
            published: true,
            slug: 'welcome-to-devblog'
          },
          {
            title: 'Getting Started with Next.js',
            content: 'Next.js is a powerful framework for building React applications...',
            published: true,
            slug: 'getting-started-with-nextjs'
          },
          {
            title: 'Draft Post',
            content: 'This is a draft post that is not yet published.',
            published: false,
            slug: 'draft-post'
          }
        ]
      }
    },
  })

  console.log({ admin })
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