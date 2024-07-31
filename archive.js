let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");

// showTable:==>

const archiveArr=JSON.parse(localStorage.getItem("archiveArr"))  || []

archiveArr.forEach(el => {
    
    let tableRow=document.createElement("tr")
    tableRow.innerHTML=`
        <td>${el[0]}</td>
        <td>${el[1]}</td>
        <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
        <td><button onclick="restore('${el[0]}')">Restore</button></td>
        <td><button onclick="deleteTask('${el[0]}')">Delete</button></td>
    `
    tableBody.append(tableRow)
});

// changeStatus:==>

function changeStatus(todoName,status){

    archiveArr.forEach((el)=>{

        if (el[0]==todoName){
            if (status=="Pending🔃"){
                el[2]="Completed✅"
            }   
            else{
                el[2]="Pending🔃"
            }
        }
    })
    localStorage.setItem("archiveArr",JSON.stringify(archiveArr))
    location.reload()
}

// restoreTask:==>

const tasks=JSON.parse(localStorage.getItem("tasks"))

function restore(todoName){

    archiveArr.forEach((el,idx)=>{

        if (el[0]==todoName){
            tasks.push(el)
            archiveArr.splice(idx,1)
        }
    })
    localStorage.setItem("archiveArr",JSON.stringify(archiveArr))
    localStorage.setItem("tasks",JSON.stringify(tasks))
    location.reload()
}

// deleteTask:==>

function deleteTask(todoName){

    archiveArr.forEach((el,idx)=>{

        if (el[0]==todoName){
            archiveArr.splice(idx,1)
        }
    })
    localStorage.setItem("archiveArr",JSON.stringify(archiveArr))
    location.reload()
}

// Filter priority:==>

prioritySelect.addEventListener("click", ()=>{

    const priorityValue=prioritySelect.value

    if (priorityValue==""){
        tableBody.innerHTML=""
    
        archiveArr.forEach(el => {
        
            let tableRow=document.createElement("tr")
            tableRow.innerHTML=`
                <td>${el[0]}</td>
                <td>${el[1]}</td>
                <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
                <td><button onclick="restore('${el[0]}')">Restore</button></td>
                <td><button onclick="deleteTask('${el[0]}')">Delete</button></td>
            `
            tableBody.append(tableRow)
        });
    }

    else{
        const newTableBody=archiveArr.filter((el)=>{
            return el[1].toLowerCase()===priorityValue.toLowerCase()
        })
        
        tableBody.innerHTML=""
    
        newTableBody.forEach(el => {
        
            let tableRow=document.createElement("tr")
            tableRow.innerHTML=`
                <td>${el[0]}</td>
                <td>${el[1]}</td>
                <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
                <td><button onclick="restore('${el[0]}')">Restore</button></td>
                <td><button onclick="deleteTask('${el[0]}')">Delete</button></td>
            `
            tableBody.append(tableRow)
        });
    }
})

// Status Filter:=>

    statusSelect.addEventListener("click", ()=>{

        const statusValue=statusSelect.value
    
        if (statusValue==""){
            tableBody.innerHTML=""
        
            archiveArr.forEach(el => {
            
                let tableRow=document.createElement("tr")
                tableRow.innerHTML=`
                    <td>${el[0]}</td>
                    <td>${el[1]}</td>
                    <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
                    <td><button onclick="restore('${el[0]}')">Restore</button></td>
                    <td><button onclick="deleteTask('${el[0]}')">Delete</button></td>
                `
                tableBody.append(tableRow)
            });
        }
    
        else{
            const newTableBody=archiveArr.filter((el)=>{
                return el[2].toLowerCase()===statusValue.toLowerCase()
            })
            
            tableBody.innerHTML=""
        
            newTableBody.forEach(el => {
            
                let tableRow=document.createElement("tr")
                tableRow.innerHTML=`
                    <td>${el[0]}</td>
                    <td>${el[1]}</td>
                    <td><button onclick="changeStatus('${el[0]}','${el[2]}')">${el[2]}</button></td>
                    <td><button onclick="restore('${el[0]}')">Restore</button></td>
                    <td><button onclick="deleteTask('${el[0]}')">Delete</button></td>
                `
                tableBody.append(tableRow)
            });
        }
    })