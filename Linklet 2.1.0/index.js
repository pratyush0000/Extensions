//inputbutton
let myLeads = []
const inputButton = document.getElementById("inputButton")
const inputText = document.getElementById("inputText")
const tabButton = document.getElementById("tabButton")
const deleteButton = document.getElementById("deleteButton")
let alertmessage = document.getElementById("alertmessage")
let ulEl = document.getElementById("ulEl")




const ls = JSON.parse(localStorage.getItem("myLeads"))

console.log(ls)

if(ls){
    myLeads=ls
    printList(myLeads)
}


inputButton.addEventListener("click", function(){

    if(inputText.value.startsWith("https://")){
        alertmessage.textContent=""
        myLeads.push(inputText.value)

        inputText.value=""
        localStorage.setItem("myLeads",JSON.stringify(myLeads))

        printList(myLeads)


        console.log(localStorage.getItem("myLeads"))
    }
    else if(inputText.value.length==0){
        alertmessage.textContent="Empty input field. Paste a valid link."
        inputText.value=""
    }
    else{
        alertmessage.textContent="Not a link. Please paste a valid link."
        inputText.value=""
    }
})




tabButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs[0]) {
            alertmessage.textContent=""
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            printList(myLeads);
        } else {
            alertmessage.textContent="No actice tab found"
            console.log("No active tab found.");
        }
    });
});



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

