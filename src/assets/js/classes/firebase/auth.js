// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Make auth and firestore references
const auth = firebase.auth();
const firestore = firebase.firestore();

// // Firestore settings
// // db.settings({timestampsInSnapshots: true});


// listen for auth status changes

auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);

    } else {
      console.log('user logged out');
    }
})


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

    let userData = await createUserProfileDocument(user,
      {
      locations : 
        [{
          sample: {
            lat: null,
            lon: null,
            }
        }]
      }
    )
    console.log(userData)
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
  console.log(userData)

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