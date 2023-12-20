/* istanbul ignore file */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore, orderBy,doc} from "firebase/firestore";
import { collection, addDoc,query,where,getDocs, deleteDoc,updateDoc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5gP-m3Tfn_0Cao9-_RtgTDFcCnsF3nBA",
  authDomain: "personal-expense-tracker-dbb0d.firebaseapp.com",
  projectId: "personal-expense-tracker-dbb0d",
  storageBucket: "personal-expense-tracker-dbb0d.appspot.com",
  messagingSenderId: "33795573188",
  appId: "1:33795573188:web:b72ed71684aa4a02695091"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

/* export async function updateUserName(uid, name) {
  await set(ref(database, `users/${uid}/name`), name);
} */

export async function getUserName(uid) {
  console.log(uid)
  const collectionRef = collection(firestore, 'users');
  const q = query(collectionRef, where('userId', '==', uid))
  const docunmenet = await getDocs(q)
  console.log(docunmenet.docs[0].data().hasCompletedSurvey)
  return docunmenet.docs[0].data().hasCompletedSurvey
}
export async function saveSurveyData(data) {
  try {
      const docRef = await addDoc(collection(firestore, "surveys"), data);
      return docRef.id;
  } catch (error) {
      console.error("Error saving survey data: ", error);
  }
}
export async function markSurveyAsCompleted(uid) {
  await set(ref(database, `users/${uid}/hasCompletedSurvey`), "true");
}


export async function addTransactionToDb(data){
      try {
/*         const transactionsRef  = collection(doc(firestore, "User_TransactionDoc",uid), "transaction");
        const docRef = await addDoc(transactionsRef, data); */
        const docRef = await addDoc(collection(firestore,"User_TransactionDoc"),data)
        return docRef.id;
    } catch (error) {
        alert("Error saving transaction data: ");
  }
}


export async function getTransactionFromDB(userID) {
  const collectionRef = collection(firestore, 'User_TransactionDoc');
  let trans = [];
  try{
     const q = query(collectionRef, where('userID', '==', userID),orderBy('date','desc'));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id;
        trans.push({...data, id});
      });
  }catch(error){
    console.log(error)
  }

  return trans
}

export async function deleteTransactionFromDB(transactionID){
  try{

    const DTransaction = doc(firestore,'User_TransactionDoc',transactionID)
    await deleteDoc(DTransaction)
  }catch(error){
    console.error("Error deleting transaction: ", error);
  }
}

export async function saveUserData(uid, data) {
  try {
      await setDoc(doc(firestore, "users", uid), data);
  } catch (error) {
      console.error("Error saving user data: ", error);
  }
}

export async function upDdateIncome(userID,income)
{
  const collectionRef = collection(firestore, 'surveys');
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    if(!docunmenet.empty){
      const docID = docunmenet.docs[0].id
      await updateDoc(doc(collectionRef, docID),{
        monthlyIncome : income
      })
    }
 }
 catch(error){
   console.log(error)
 }
}

export async function getIncome(userID){
  const collectionRef = collection(firestore, 'surveys');
  let income = ""
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    if(!docunmenet.empty){
      income = docunmenet.docs[0].data().monthlyIncome
      return income
    }
 }
 catch(error){
   console.log(error)
 }

  return income
}

export async function upDateSavingGoal(userID,goal)
{
  const collectionRef = collection(firestore, 'surveys');
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    console.log(docunmenet.docs[0].id)
    if(!docunmenet.empty){
      const docID = docunmenet.docs[0].id
      await updateDoc(doc(collectionRef, docID),{
        savingsGoal : goal
      })
    }
 }
 catch(error){
   console.log(error)
 }
}

export async function getSavingGoal(userID){
  const collectionRef = collection(firestore, 'surveys');
  let Sgoal = ""
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    if(!docunmenet.empty){
      Sgoal = docunmenet.docs[0].data().savingsGoal
      return Sgoal
    }
 }
 catch(error){
   console.log(error)
 }

  return Sgoal
}


export async function getBudget(userID){
  const collectionRef = collection(firestore, 'surveys');
  let Budget = ""
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    if(!docunmenet.empty){
      Budget = docunmenet.docs[0].data().maximumBudget
      return Budget
    }
 }
 catch(error){
   console.log(error)
 }

  return Budget
}

export async function getSurveyDB(userID) {
  const collectionRef = collection(firestore, 'surveys'); 
  let trans = [];
  try{
     const q = query(collectionRef, where('userID', '==', userID));
     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id;
        trans.push({...data, id});
      });
  }catch(error){
    console.log(error)
  }

  return trans
}

export async function upDateBudget(userID,budget)
{
  const collectionRef = collection(firestore, 'surveys');
  try{
    const q = query(collectionRef, where('userId', '==', userID))
    const docunmenet = await getDocs(q)
    //console.log(docunmenet.docs[0].id)
    if(!docunmenet.empty){
      const docID = docunmenet.docs[0].id
      await updateDoc(doc(collectionRef, docID),{
        maximumBudget : budget
      })
    }
 }
 catch(error){
   console.log(error)
 }
}