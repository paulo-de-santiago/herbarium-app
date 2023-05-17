import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-edf9d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const herbariumListInDB = ref(database, "herbarium")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const herbariumListEl = document.getElementById("herbarium-list")

const removeButtonEl = document.getElementById("remove-button")





addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    /* Validation for empty input */
    if (inputValue == null || inputValue == "") {
        alert("Please enter a plant name.")
      
    } else {
         push(herbariumListInDB, inputValue)
    
    clearInputFieldEl()
        
    }
    
   
})

/* Button to remove the herbarium database */

removeButtonEl.addEventListener("dblclick", function() {
          let exactLocationOfItemInDB = ref(database, `herbarium/`)
        
          remove(exactLocationOfItemInDB)
          clearHerbariumListEl()
          herbariumListEl.innerHTML = "Your data base is now empty."
})

onValue(herbariumListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearHerbariumListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToHerbariumListEl(currentItem)
        }    
    } else {
        herbariumListEl.innerHTML = "No items here... yet"
    }
})

function clearHerbariumListEl() {
    herbariumListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToHerbariumListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `herbarium/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    herbariumListEl.append(newEl)
}


/* 

TO DO
let copyButton = document.getElementsByTagName("copy-button");
copyButton.addEventListener("click", function () {
  navigator.clipboard
    .writeText(document.getElementById("copy-text-input").value)
    .then(
      (success) => console.log("text copied"),
      (err) => console.log("error copying text")
    );
});

 */