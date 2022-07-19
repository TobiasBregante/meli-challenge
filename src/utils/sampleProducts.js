import { faker } from '@faker-js/faker'

const imgs = [...Array(10).keys()].map((e,i) => (`e${i+1}.webp`))

const data = (limit=10)=>(
    [...Array(limit).keys()].map(() => ({
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        location: {
            shed: "Los coreanos",
            corridor: faker.mersenne.rand(1, 50),
            store: faker.mersenne.rand(1, 100)
        },
        seller: faker.company.companyName(1),
        price: faker.commerce.price(100, 15000, 0),
        img: `e${faker.mersenne.rand(1,38)}.webp`,
        imgs: imgs,
        sellerImage: `c${faker.mersenne.rand(1,6)}`,
        description: faker.lorem.lines(8),
        rating: faker.mersenne.rand(1, 5)
    }))
)

export default data