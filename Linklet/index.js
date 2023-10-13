//inputbutton
let myLeads = []
const inputButton = document.getElementById("inputButton")
const inputText = document.getElementById("inputText")
const tabButton = document.getElementById("tabButton")
const deleteButton = document.getElementById("deleteButton")
let ulEl = document.getElementById("ulEl")



const ls = JSON.parse(localStorage.getItem("myLeads"))

console.log(ls)

if(ls){
    myLeads=ls
    printList(myLeads)
}


inputButton.addEventListener("click", function(){
    myLeads.push(inputText.value)

    inputText.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    printList(myLeads)


    console.log(localStorage.getItem("myLeads"))
})




tabButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0]) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            printList(myLeads);
        } else {
            console.log("No active tab found.");
        }
    });
});

// tabButton.addEventListener("click", function(){

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         myLeads.push(tabs[0].URL)
//         localStorage.setItem("myLeads",JSON.stringify(myLeads))
//         printList(myLeads)
//     })
// })


deleteButton.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    printList(myLeads)
    // ulEl.textContent=myLeads
})

function printList(e){
    let listItems = ""
    for(let i=0;i<e.length;i++){
        listItems += `
            <li>
                <a href = '${e[i]}' target='_blank'>
                    ${e[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

