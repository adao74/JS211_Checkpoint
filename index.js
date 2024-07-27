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


const getFacts = async () => {
    try {
        const response = await fetch(`https://catfact.ninja/facts?limit=${userInput}&max_length=150`)

        const res = await catchError(response)
    
        console.log(res)

        
        let text = ""
        res.data.forEach( (element, index) => {
            text = `${text} \n ${index + 1}. ${element.fact}` 
        });

        const newElement = document.createElement("p")
        newElement.innerText = text

        const parent = document.getElementById("facts")
        if (parent.firstElementChild) {
            parent.removeChild(parent.firstElementChild)
        }
            
        parent.append(newElement)

        // Note: could reset properties here (see CSS file)
        // document.documentElement.style.setProperty('--dynamic-color2', 'purple');
        // document.documentElement.style.setProperty('--dynamic-font-size', '70px');

        parent.classList.add('dynamic-style');

    } catch (error) {
        console.log(`Error,  ${err}`)
    }

}


// Same thing, but using fetch:
// const getFacts = () => {
//     fetch(`https://catfact.ninja/facts?limit=${userInput}&max_length=150`)
//     .then( (response) => catchError(response))
//     .then(res => {
//         console.log(res)

        
//         let text = ""
//         res.data.forEach( (element, index) => {
//             text = `${text} \n ${index + 1}. ${element.fact}` 
//         });

//         const newElement = document.createElement("p")
//         newElement.innerText = text

//         const parent = document.getElementById("facts")
//         if (parent.firstElementChild) {
//             parent.removeChild(parent.firstElementChild)
//         }
            
//         parent.append(newElement)
//     })
//     .catch(err => console.log(`Error,  ${err}`)) // for all errors
// }


