import { faker } from '@faker-js/faker'

faker.setLocale("es")

const chats = ()=>(
    [...Array(15).keys()].map(() => ({
        _id: faker.database.mongodbObjectId(),
        user:{
            img: `c${faker.mersenne.rand(1,6)}`,
            name:faker.internet.userName()
        },
        messages:[...Array(10).keys()].map(() => ({
            _id: faker.database.mongodbObjectId(),
            madeByMe: faker.datatype.boolean(),
            text: faker.lorem.sentences(faker.mersenne.rand(1,6)),
            date: `${faker.date.recent()}`
        })),
        date: `${faker.date.recent()}`
    }))
)

export default chats