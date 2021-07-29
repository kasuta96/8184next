import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    articles: {
      create: [
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    articles: {
      create: [
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    articles: {
      create: [
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
        {
          title: 'Before they sold out readymade gluten. Copper mug try-hard pitchfork pour-over',
          content: {
            "time": 1627432176103,
            "blocks": [
                {
                    "id": "nCCymKZIEa",
                    "data": {
                        "text": "rewr"
                    },
                    "type": "paragraph"
                }
            ],
            "version": "2.22.2"
          },
          published: true,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
          thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
