// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Make auth and firestore references
const auth = firebase.auth();
const firestore = firebase.firestore();

// // Firestore settings
// // db.settings({timestampsInSnapshots: true});


// listen for auth status changes

// Current User
const getCurrentUser = async () =>{
  return await firebase.auth().currentUser
}


// sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    const { user } = await auth.createUserWithEmailAndPassword(email, password).then(cred => {

        // console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

        return cred
    });

    let { 
      current_latitude, 
      current_longitude
      } = await new Geolocation()
                  .parseLocation()
                  .then(result => result)

    let userData = await createUserProfileDocument(user,
      {
      locations : 
        [
          {
            default : {
              lat : current_latitude,
              lon : current_longitude
            }
          }
        ]
      }
    )
    // console.log(userData)
});

// logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut()
});

// login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  const { user } = await auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    
    return cred
  });

  let userData = await createUserProfileDocument(user)
  // console.log(userData)

});

//
const createUserProfileDocument = async(userAuth, additionalData) => {
  // console.log(userAuth)
  // if user profile from firebase auth is null/undefined,
  // then exit function with no return value
  if (!userAuth) return ;

  // else get uid from the userAuth
  // then use it for Query reference in firestore
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // The keyword await makes JavaScript wait until ...
  // ...that promise settles and returns its result.
  // await is only used inside async function
  // this one get the document snapshot of the document ref. 
  const snapShot = await userRef.get();
  let userData;
  // document snapshot has 'exists' boolean property
  // if a User with specific uid doesn't exists in firestore ...
  // then create new User account in firestore
  if (!snapShot.exists){
      // destructuring the userAuth
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
          });

          userData = await userRef.get()
          userData = userData.data();

      } catch(error){
          console.log('Error in creating user in firestore', error.message);
      }
  } else {
    userData = snapShot.data();
  }
  return userData;
}

const getUserProfileDocument = async(userAuth)=> {
  if (!userAuth) return  null;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  let userData;

  if (snapShot.exists){
    userData = await userRef.get()
    userData = userData.data();
    return userData
  } else {
    return null
  }
}

const AddLocation = (userAuth, data) => {
  if (!userAuth) return  null;
  
  var userRef = firestore.doc(`users/${userAuth.uid}`);

  // Atomically add a new region to the "regions" array field.
  userRef.update({
        locations: firebase.firestore.FieldValue.arrayUnion(data)
  });

  // const snapShot = await userRef.get();

  // return snapShot.data()

  // Atomically remove a region from the "regions" array field.
  // userData.update({
  //     regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
  // });
}

const RemoveLocation = (userAuth, data) => {
  if (!userAuth) return  null;

  var userRef = firestore.doc(`users/${userAuth.uid}`);

  userRef.update({
      locations: firebase.firestore.FieldValue.arrayRemove(data)
  });

}