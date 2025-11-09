// Importer Firebase-funksjoner
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"
import { firebaseConfig } from "./firebaseConfig.js";

// Koble til Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funksjon for å legge til ny kontakt
async function addContact() {
    // Henter verdier i fra input-feltene
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mobile = document.getElementById("mobile").value;

    if (!firstName || !lastName || !mobile) { //    ! = ikke       || = eller
        alert("Vennligst fyll inn alle felt");
        return;
    };

    try {
        // Legg til dokument i samlingen "Kontakter"
        await addDoc(collection(db, "kontakter"), {
            fornavn: firstName,
            etternavn: lastName,
            telefon: mobile
        });
        console.log("Kontakt lagt til");

        // Nullstiller feltene etterpå
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("mobile").value = "";

    } catch (e) {
        console.error("Feil ved lagring: ", e);
    };
};

async function getDocuments() {
    let list = document.getElementById("list");
    //Fjerner det som ligger inne i tabellen
    list.innerHTML = "";
    // Henter ut data fra collection elevar
    const snapshot = await getDocs(
        collection(db, "kontakter")
    );

    //Legger til data i tabellen i HTML
    snapshot.forEach((docSnap) => {
        list.innerHTML += `<tr> 
        <td> ${docSnap.data().fornavn}  </td> 
        <td> ${docSnap.data().etternavn}</td>
        <td> ${docSnap.data().telefon}</td>
        <tr>`; 
    });
};

getDocuments();


// Kobler knappen til addContact funksjonen
document.getElementById("addDoc-btn").addEventListener("click", addContact);