const GetItem = ( itemName ) => {
    return (typeof window !== 'undefined' 
    && localStorage.getItem(itemName) 
    ? JSON.parse(localStorage.getItem(itemName)) : {})
 }

 export default GetItem