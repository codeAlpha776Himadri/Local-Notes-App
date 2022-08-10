// lets start js here 
const main = document.querySelector('.main') ; 
const textArea = document.querySelector('.text-area') ; 
const noteSaveButt = document.querySelector('.save-note-butt') ;
const noteContainer = document.querySelector('.all-texts-container') ; 
const delNoteButt = document.querySelector('.delete-note-butt') ; 

window.addEventListener('load' , (e) => {
    if (localStorage != null || localStorage.length >= 1) {
        const notesObj = JSON.parse(localStorage.getItem('notes')) ;
        console.log(notesObj) ;
        if (notesObj == null) {
            delNoteButt.dataset.count = 0 ; 
            console.warn('Local storage is empty!!') ;
            return ; 
        }
        delNoteButt.dataset.count = notesObj.length ; 
        for (const text of notesObj) {
            // let newNote = `<div class="note-box"> <div class="note"> ${text} </div> <button class="delete-note">Delete</button>  </div>`
            noteContainer.innerHTML += `<div class="note-box" data-idx="Note : ${text.id}"> 
                                            <div class="note-head">
                                                <h5 class="date-title">Saved Time : ${text.date}</h5>
                                            </div>
                                            <div class="note"> 
                                                ${text.noteText} 
                                            </div> 
                                            <button class="delete-note">Delete</button>
                                        </div>` ;  
        } 
    }
}) ;

noteSaveButt.addEventListener('click' , (e) => {
    if (textArea.value == "") { window.alert("can't save empty note!!") } 
    else {
        console.log(textArea.value) ; 
        let storedText = localStorage.getItem('notes') ; 
        let notesObj = localStorage.length == 0 || localStorage == null ? [] : JSON.parse(storedText) ;
        const _date = new Date() ; 
        // const _date = `${date.getDate()}.${date.getUTCMonth()+1}.${date.getFullYear()}` ; 
        noteContainer.innerHTML += `<div class="note-box" data-idx="Note : ${notesObj.length + 1}"> 
                                        <div class="note-head">
                                            <h5>Saved Time : ${_date.toLocaleString()}</h5>
                                        </div>
                                        <div class="note"> 
                                            ${textArea.value} 
                                        </div>
                                        <button class="delete-note">Delete</button>
                                    </div>` ; 
        notesObj.push({
            noteText : textArea.value , 
            date : _date.toLocaleString() ,
            id : notesObj.length + 1
        }) ; 
        delNoteButt.dataset.count = notesObj.length ; 
        textArea.value = "" ;  
        localStorage.setItem('notes' , JSON.stringify(notesObj)) ; 
        console.log(notesObj) ; 
    }
    return ; 
});

delNoteButt.addEventListener('click' , (e) => {
    if (window.confirm("Do you want to delete the note permanently ? Press OK to confirm")) { 
        if(localStorage.length == 0 || localStorage == null)  return ;  
        let notesArr = JSON.parse(localStorage.getItem('notes')) ; 
        if (notesArr.length > 0) {
            notesArr.pop() ; 
            if (notesArr.length == 0) {
                localStorage.clear() ;
                window.location.reload() ;
                return ; 
            }
            localStorage.setItem('notes',JSON.stringify(notesArr)) ; 
        }
        window.location.reload() ; 
    }
    return ; 
}) ; 
