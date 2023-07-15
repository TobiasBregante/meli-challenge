const SetItem = ( itemName, itemValue ) => {
    const newValue = {}
    newValue[itemName] = itemValue 
    localStorage.setItem(itemName, JSON.stringify(newValue))
    return true
}

export default SetItem