let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");

// showTable:==>

document.addEventListener("DOMContentLoaded",()=>{

    const tasks=JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach((el) => {

        const tableRow=document.createElement("tr")
        tableRow.innerHTML=
            `<td>${el[0]}</td>
            <td>${el[1]}</td>
            <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
            <td><button onclick="removeArchive('${el[0]}')">Archive</button></td>` 

        tableBody.append(tableRow)
    });

    addTodoButton.addEventListener("click", ()=>{

        if (inputTitle.value===""){
            alert("Todo cannot be empty!")
            return
        }
        const inputValue=inputTitle.value
        const priorityValue=prioritySelect.value
        
        const tableRow=document.createElement("tr")
        tableRow.innerHTML=
            `<td>${inputValue}</td>
            <td>${priorityValue}</td>
            <td><button>Pending🔃</button></td>
            <td><button>Archive</button></td>`

        tableBody.append(tableRow)

        let row=[]
        row.push(inputValue,priorityValue,"Pending🔃","Archive")
        tasks.push(row)

        localStorage.setItem("tasks",JSON.stringify(tasks))

        location.reload()
    })
})

// changeStatus:==>

function changeStatus(taskName,statusValue){

    let tasks=JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach((el)=>{

        if (el[0]==taskName){
            
            if (statusValue=="Pending🔃"){
                el[2]="Completed✅"
            }
            else{
                el[2]="Pending🔃"
            }
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
    location.reload()
}

// removeArchive:==>

let archiveArr=JSON.parse(localStorage.getItem("archiveArr")) || []

function removeArchive(task){

    let tasks=JSON.parse(localStorage.getItem("tasks")) || []

    tasks.forEach((el,idx)=>{
        
        if (el[0]==task){
            archiveArr.push(el)
            tasks.splice(idx,1)
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
    localStorage.setItem("archiveArr", JSON.stringify(archiveArr))

    location.reload()
}