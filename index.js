let userInput;

document.getElementById("user").addEventListener("keyup", (e) => {
    userInput = e.target.value
})

document.getElementById("button").addEventListener("click", (e) => {
    e.preventDefault()

    getFacts()

})

const catchError = (res) => {
    
    // console.log(res)

    if(!res.ok) {
        console.log("There's an error")
        throw Error(res.statusText)  // res.statusText is passed into catch as the argument 
    } 
    

    return res.json()
}


const getFacts = () => {
    fetch(`https://catfact.ninja/facts?limit=${userInput}&max_length=150`)
    .then( (response) => catchError(response))
    .then(res => {
        console.log(res)
        const newElement = document.createElement("p")
        let text = ""
        res.data.forEach( (element, index) => {
            text = `${text} \n ${index + 1}. ${element.fact}` 
        });
        newElement.innerText = text
        document.getElementById("facts").append(newElement)
    })
    .catch(err => console.log(`Error,  ${err}`)) // for all errors
  }


