export let isFirstUpdatePhase = {current: true}

const useStateReturnsArr: any[] = []
let useStateReturnsArrGreatestIndex = -1
let indexToRetrieve = 0

export function useState<T>(initialValue: T) {
  let returnArr: [T, (newValue: T) => void] = [initialValue, () => {}]
  if (isFirstUpdatePhase.current) {
    useStateReturnsArrGreatestIndex++

    const updater = (newValue: T) => {
      returnArr[0] = newValue
    }
    returnArr[1] = updater

    useStateReturnsArr.push(returnArr)
  } else {
    returnArr = useStateReturnsArr[indexToRetrieve]

    indexToRetrieve++
    if (useStateReturnsArrGreatestIndex < indexToRetrieve) indexToRetrieve = 0
  }

  return returnArr
}
