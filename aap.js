import { addDoc, collection , getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firestoreconfig.js";



const form = document.querySelector("#form");
const title = document.querySelector("#title");
const discription = document.querySelector("#discription");
const content = document.querySelector("#content");



async function getDataFromFireBase() {
   const arr = []
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    console.log(arr);
    arr.map((item)=>{
        content.innerHTML += `
           <div id="mini-div">

        <h4>Tittle : ${item.title}</h4>
        <h4>Description :${item.discription}</h4>

    </div>
        
        
        
        
        
        
        
        `

    })

}
getDataFromFireBase();








form.addEventListener('submit' , async(event)=>{
event.preventDefault();

try {
  const docRef = await addDoc(collection(db, "todos"), {
    title: title.value , 
    discription : discription.value 
  });


  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

})