import { faker } from '@faker-js/faker'

const stores = ()=>(
    [...Array(10).keys()].map(() => ({
        _id: faker.database.mongodbObjectId(),
        location: {
            shed: "Los coreanos",
            corridor: faker.mersenne.rand(1, 50),
            store: faker.mersenne.rand(1, 100)
        },
        seller: faker.company.companyName(1),
        img: `c${faker.mersenne.rand(1,6)}`,
        bgImg: `t${faker.mersenne.rand(1,6)}`,
        rating: faker.mersenne.rand(3, 6),
        followers: faker.mersenne.rand(100, 500)
    }))
)

export default stores