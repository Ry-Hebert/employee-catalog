const getDB = async () =>{
    const employeeList = await fetch('/employees')
    const employeeListLocal = await employeeList.json()
    console.log(`This is the Employee List fetch ${employeeListLocal}`)
    console.log(employeeListLocal)
    return employeeListLocal
}

const initEmployeeDB = async () =>{
    const employeeList = await fetch('/init')
    const employeeListLocal = await employeeList.json()
    console.log(`This is the initEmployee List fetch ${employeeListLocal}`)
    console.log(employeeListLocal)
    renderEmployeeList()
}

let renderEmployeeList = async () =>{
    let dbEmployeeList = await getDB()
    console.log('This is the render Employee List func')
    console.log(dbEmployeeList)
    let checkSearch = document.querySelector('.employee-search-field').value

    if(checkSearch != ''){

        const search = (arr, s) => {
            console.log('In Search')
            console.log(arr)
            console.log(s)
            
            const doesContain = (item) =>{
                let noPicture = {name: item.name, address: item.address, age: item.age, gender: item.gender, interests: item.interests}
                let getValues = Object.values(noPicture)
                let check = getValues.toString().toLowerCase()
                check = check.replace(/[^a-zA-Z0-9]/g, "")
                console.log(check)
                console.log(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
                console.log(check.includes(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")))
                return check.includes(s.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
            }
            
            let matches = arr.filter(doesContain)
    
            console.log(matches)
            return matches
        };
        
        let data = search(dbEmployeeList, checkSearch)
        console.log("Search Return: ")
        console.log(data)
        dbEmployeeList = data

    }

    let outDest = document.querySelector('.people-out')

    outDest.innerHTML = ""
    outDest.innerHTML = `<ul class="collection people-out-collection"></ul>`

    let outDest2 = document.querySelector('.people-out-collection')

    dbEmployeeList.forEach(xItem =>{
            outDest2.innerHTML += `
                <li class="collection-item avatar">
                    <img src="${xItem.image}" alt="" class="circle">
                    <div class="person-info">
                        <span class="title">${xItem.name}</span>
                        <p>Age: ${xItem.age}<br>
                            Gender: ${xItem.gender}
                        </p>
                    </div>
                    <div class="person-info">
                        <p>Interests: ${xItem.interests}<br>
                        Address: ${xItem.address}
                        </p>
                    </div>
                    <a href="#!" class="secondary-content"><i class="material-icons">favorite_border</i><i class="material-icons right">more_vert</i></a>
                </li>
            `
    })

    // outDest.innerHTML += "</ul>"

    // document.querySelectorAll('.itemTog').forEach(item => item.addEventListener('click', () => {
    //     let pleaseWork = item.getAttribute('value')
    //     let tryThis1 = `#a${pleaseWork}`
    //     let crossOutSelector = document.querySelector(tryThis1)
    //     crossOutSelector.classList.toggle("completed")
    //  }))

    //  document.querySelectorAll('.itemDelete').forEach(xItem => {
    //     xItem.addEventListener('click', () => {
    //         let getID = xItem.getAttribute('value')

    //         deleteFromDB(getID)

    //         renderEmployeeList()
    //     })
    // }) 
}

document.querySelector('#initButton').addEventListener('click', () => initEmployeeDB())

document.querySelector('body').addEventListener('load', renderEmployeeList())

let input = document.querySelector('.employee-search-field')
input.addEventListener('keydown', () => renderEmployeeList())