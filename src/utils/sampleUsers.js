import { faker } from '@faker-js/faker'

faker.setLocale("es")

const users = ()=>(
    [...Array(100).keys()].map(() => ({
        _id: faker.database.mongodbObjectId(),
        name:faker.internet.userName(),
        email:faker.internet.email(),
        cellPhone: faker.phone.number(),
        isSeller: faker.datatype.boolean(),
    }))
)

export default users