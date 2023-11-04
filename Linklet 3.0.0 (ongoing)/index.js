//inputbutton
let myLeads = []
let myVisibleText = []
const inputButton = document.getElementById("inputButton")
const inputText = document.getElementById("inputText")
const visibleText = document.getElementById("visibleText")
const tabButton = document.getElementById("tabButton")
const deleteButton = document.getElementById("deleteButton")
let alertmessage = document.getElementById("alertmessage")
let ulEl = document.getElementById("ulEl")




const ls = JSON.parse(localStorage.getItem("myLeads"))
const vistext = JSON.parse(localStorage.getItem("myVisibleText"))

// console.log(ls)

if(ls,vistext){
    myVisibleText=vistext
    myLeads=ls
    printList(myLeads,myVisibleText)
}


inputButton.addEventListener("click", function(){
    // if(document.getElementById('radio1').checked==true){
    //     console.log("yes")
    // }

    if(inputText.value.startsWith("https://")){
        alertmessage.textContent=""

        myVisibleText.push(visibleText.value)
        visibleText.value=""

        myLeads.push(inputText.value)
        inputText.value=""

        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        localStorage.setItem("myVisibleText",JSON.stringify(myVisibleText))

        printList(myLeads,myVisibleText)


        // console.log(localStorage.getItem("myLeads"))
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
    myVisibleText=[]
    myLeads=[]
    printList(myLeads,myVisibleText)
})

function printList(e,vt){
    // if(document.getElementById('radio1').checked==true){
    //     document.getElementById(a).style.color="blue"
    // }
    let listItems = ""
    for(let i=0;i<e.length;i++){
        listItems += `
            <li>
                <a href = '${e[i]}' target='_blank' id = "risk${i}">
                    ${vt[i]}
                </a>
            </li>
        `
    }
    // riskkk = document.getElementById("risk0")
    // console.log(riskkk)
    ulEl.innerHTML = listItems
}

