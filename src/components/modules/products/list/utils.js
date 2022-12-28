const keysAllowed = ['perTask', 'perDozen', 'perCurve', 'perQuantity', 'retail', 'wholesale']

const TEXT_PRICES = {
    perTask: 'Por tarea',
    retail: 'Por mayor y menor',
    perDozen: 'Por Docena',
    wholesale: 'Solo por mayor',
    perCurve: 'Por curva',
    perQuantity: 'Por cantidad'
  }

 export const showNameInTable = (prices) => {
    let name = ''
    const parsePricesObject = Object.entries(prices);
    parsePricesObject.length && parsePricesObject.forEach(price => {
      const key = price[0]
      const value = price[1]
      if (name.length) return
      if (key && keysAllowed.includes(key) && value > 0) return name = key

    })
    return TEXT_PRICES[name] ?? ''
  }

  