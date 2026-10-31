// Optional Firebase Auth + Firestore. Configuration is provided by the site owner.
// Without configuration the site is fully operational in local guest mode.
export async function openCloud(config,notify){
 if(!config?.apiKey||!config?.projectId||!config?.authDomain)return null;
 const [{initializeApp,getApps},{getAuth,GoogleAuthProvider,signInWithPopup,signInAnonymously,onAuthStateChanged,signOut},{getFirestore,doc,getDoc,setDoc}]=await Promise.all([
  import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js'),
  import('https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js'),
  import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js')
 ]);
 const firebase=getApps().length?getApps()[0]:initializeApp(config),auth=getAuth(firebase),db=getFirestore(firebase,'conjuga');
 const api={user:null,async google(){return signInWithPopup(auth,new GoogleAuthProvider())},async anonymous(){return signInAnonymously(auth)},async logout(){await signOut(auth)},async pull(){if(!api.user)return null;let snapshot=await getDoc(doc(db,'users',api.user.uid,'data','progress'));return snapshot.exists()?snapshot.data():null},async push(data){if(api.user)await setDoc(doc(db,'users',api.user.uid,'data','progress'),data)}};
 onAuthStateChanged(auth,user=>{api.user=user;notify(user)});
 return api;
}
