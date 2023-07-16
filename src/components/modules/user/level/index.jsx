const levels = {
    '1': 1,
    '2': 51,
    '3': 101,
    '4': 201,
    '5': 500
}

const userLevel = dataUser => {
    let levelMatch = 1
    const {
        countProducts
    } = dataUser
    
    levelMatch = countProducts >= levels['1'] ? 1 : levelMatch
    levelMatch = countProducts >= levels['2'] ? 2 : levelMatch
    levelMatch = countProducts >= levels['3'] ? 3 : levelMatch
    levelMatch = countProducts >= levels['4'] ? 4 : levelMatch
    levelMatch = countProducts >= levels['5'] ? 5 : levelMatch

    return levelMatch
}

export default userLevel