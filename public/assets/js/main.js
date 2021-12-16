
const getDB = async () =>{
    const employeeList = await fetch('model/employees')
    const employeeListLocal = await employeeList.json()
    console.log(`This is the Employee List fetch ${employeeListLocal}`)
    console.log(employeeListLocal)
    return employeeListLocal
}

const initEmployeeDB = async () =>{
    const employeeList = await fetch('model/init-employees')
    const employeeListLocal = await employeeList.json()
    console.log(`This is the initEmployee List fetch ${employeeListLocal}`)
    console.log(employeeListLocal)
    return employeeListLocal
}

let renderEmployeeList = async () =>{
    let dbEmployeeList = await getDB()
    console.log('This is the render Employee List func')
    console.log(dbEmployeeList)

    let outDest = document.querySelector('#people-out')

    outDest.innerHTML = ""

    dbEmployeeList.forEach(xItem =>{
            outDest.innerHTML += `
            <div class="card">
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${xItem.name}<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div class="card sticky-action">
                    <div class="card-action">   </div>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div>
            `
    })

    document.querySelectorAll('.itemTog').forEach(item => item.addEventListener('click', () => {
        let pleaseWork = item.getAttribute('value')
        let tryThis1 = `#a${pleaseWork}`
        let crossOutSelector = document.querySelector(tryThis1)
        crossOutSelector.classList.toggle("completed")
     }))

     document.querySelectorAll('.itemDelete').forEach(xItem => {
        xItem.addEventListener('click', () => {
            let getID = xItem.getAttribute('value')

            deleteFromDB(getID)

            renderEmployeeList()
        })
    }) 
}

document.querySelector('#initButton').addEventListener('click', () => initEmployeeDB())

document.querySelector('body').addEventListener('load', renderEmployeeList())