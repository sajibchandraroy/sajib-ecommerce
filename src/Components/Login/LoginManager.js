import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const createUserWithEmailAndPassword = (firstName, lastName, email, password, photo) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(firstName, lastName, photo);
      emailVerification()
      return newUserInfo;
    })
    .catch( error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      console.log(newUserInfo.error)
      return newUserInfo;
    });
 }

 const updateUserName = (firstName, lastName, photo) =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: firstName + '' + lastName,
      photoURL: photo
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  const emailVerification = () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }


  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        console.log(res)
        const {displayName, photoURL, email} = res.user
    //   const newUserInfo = res.user;
    //   newUserInfo.error = '';
    //   newUserInfo.success = true;
    const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
    //   setUserToken();
    //   return newUserInfo;
      return signedInUser;
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
 }

 export const handleForgetPassword = (email) => {
    const auth = firebase.auth();
    const emailAddress = email;
    
    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      alert("email link sent") 
    }).catch(function(error) {
        console.log(error)
      // An error happened.
    });
 }

 export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      setUserToken();
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      localStorage.setItem('token', idToken);
    }).catch(function(error) {
      // Handle error
    });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    }).catch(err => {
      // An error happened.
    });
  }