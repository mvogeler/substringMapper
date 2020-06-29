mapSubstrings("There are no substrings.", ["apples", "bananas"])

mapSubstrings("Just one here.", ["one"])

mapSubstrings("Just a few here.", ["e"])

mapSubstrings("In this string there are many results to be found.", ["i","re", "are", "zzz"])

mapSubstrings("We're not even trying.", [])

mapSubstrings("", ["error"])

function mapSubstrings(largeString, substringArray) {
  // Don't bother checking if either parameter is empty
  if (largeString.length == 0 || substringArray.length == 0) {
    console.log("Invalid Search")
    return;
  } 

  console.log("Search '" + largeString + "' for '" + substringArray + "'")

  let resultMap = new Map()
  substringArray.forEach(element => {
    resultMap.set(element, findIndex(largeString.toLowerCase(), element.toLowerCase(), []))
  })

  if (resultMap.size > 0) {
    resultMap.forEach((value, key) => {
      if (value.length == 0) {
        console.log(key + " not found in string")
      } else {
        console.log(key + " : " + value)
      }
    }) 
  } 

  console.log('\n')
}

// search a string for a substring and add it's index to the resultArray if it's found
function findIndex(largeString, element, resultArray) {
  let stringToSearch = largeString
  let stringToNotSearch = ""

  // if there's already a result in resultArray
  if (resultArray.length > 0) {
    // get the index from the last result in the array
    let sliced = resultArray.slice(resultArray.length - 1)

    // limit search to just elements after that index
    let index = +sliced + element.length
    stringToSearch = largeString.substring(index)
    // keep track of parts not searched for use later in setting the index
    stringToNotSearch = largeString.substring(0, index)
  }

  let result = stringToSearch.indexOf(element)
  if (result != -1) {
    // add the index of the string searched to the string not searched length 
    result = +result + stringToNotSearch.length
    //add to results
    resultArray.push(result)

    //continue searching until not found
    findIndex(largeString, element, resultArray)
  }

  return resultArray
}
