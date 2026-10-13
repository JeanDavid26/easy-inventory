const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true })

// Comparaison pour le tri des tableaux : ordre alphabétique français (sans tenir compte de la casse
// ni des accents, « A2 » avant « A10 »), nombres et dates dans l'ordre naturel, valeurs vides en dernier.
export function compareForSort(a: any, b: any): number {
  const aEmpty = a === null || a === undefined || a === ''
  const bEmpty = b === null || b === undefined || b === ''
  if (aEmpty || bEmpty) {
    return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return collator.compare(a, b)
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime()
  }
  return a < b ? -1 : a > b ? 1 : 0
}
