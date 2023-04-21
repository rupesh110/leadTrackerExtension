

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function imgData(arr){
    
    `<img src= ${arr.img})'>`
}
function render(leads) {
    let listItems = ""
    //let img = <img src="./delete.png">
    for (let i = 0; i < leads.length; i++) {
         
                listItems += `
                
                    <li className="displayText">
            
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a> 

                     <img src="./delete.png" class="delete-trash">
                    </li>
                `
               
           
    }
    ulEl.innerHTML = listItems
}

ulEl.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-trash")) {
        const index = event.target.dataset.index
        console.log(index)
        myLeads.splice(index, 1)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    let newData = {
        img: "./delete.png",
        inputValue: inputEl.value.length > 0 ? inputEl.value: inputValue,
    }
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    console.log(myLeads)
})

