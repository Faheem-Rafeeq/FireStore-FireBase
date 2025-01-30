import { addDoc, collection, getDocs, Timestamp, query, orderBy, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firestoreconfig.js";

// getting elements for html
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const discription = document.querySelector("#discription");
const content = document.querySelector("#content");

const arr = [];

async function getDataFromFireBase() {
  arr.length = 0;
  const q = query(collection(db, "todos"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
  });

  console.log(arr);
  content.innerHTML = ''; 
  arr.map((item) => {
    content.innerHTML += `
      <div id="mini-div">
        <h4>Title: ${item.title}</h4> 
        <h4>Description: ${item.discription}</h4>
        <button class="editBtn" data-id="${item.id}" data-title="${item.title}" data-description="${item.discription}">Edit</button>
        <button class="deleteBtn" data-id="${item.id}">Delete</button>
      </div>
    `;
  });
}

// chatGpt section btns delete and update
content.addEventListener('click', async (event) => {
  const id = event.target.getAttribute('data-id');

  if (event.target.classList.contains('editBtn')) {
    const newTitle = prompt('Edit title:', event.target.getAttribute('data-title'));
    const newDescription = prompt('Edit description:', event.target.getAttribute('data-description'));

    if (newTitle && newDescription) {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, {
        title: newTitle,
        discription: newDescription,
      });
      console.log('Document updated');
      getDataFromFireBase(); 
    }
  } else if (event.target.classList.contains('deleteBtn')) {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    console.log('Document deleted');
    getDataFromFireBase(); 
  }
});


getDataFromFireBase();



// Send data to Firebase on form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  content.innerHTML = ''; 

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      discription: discription.value,
      time: Timestamp.now().toDate(),
    });

    getDataFromFireBase(); 
    title.value = '';
    discription.value = '';
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
