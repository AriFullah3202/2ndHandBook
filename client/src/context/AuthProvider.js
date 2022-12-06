import React, { createContext, useState, useEffect } from 'react'

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut, signInWithPopup, sendPasswordResetEmail, sendEmailVerification, GoogleAuthProvider } from 'firebase/auth';
import app from '../Firebase/firebase.config';


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth(app)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside auth state change', currentUser);

            if (currentUser) {
                setUser(currentUser);
            }
            else {
                setUser(currentUser)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }

    }, [user])


    //  Update Name
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    //  Email Verify
    const verifyEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    // Google Signin
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //  Logout.......
    const logOut = () => {
        setLoading(true)
        localStorage.removeItem('accessToken')
        return signOut(auth)
    }

    // Login with Password
    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Forget Password
    const resetPassword = email => {
        console.log(email)
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }



    const authInfo = {
        user,
        createUser,
        updateUserProfile,
        verifyEmail,
        signInWithGoogle,
        logOut,
        signin,
        resetPassword,
        loading,
        setLoading,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider