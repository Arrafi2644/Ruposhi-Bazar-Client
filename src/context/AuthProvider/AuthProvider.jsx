

import React, { createContext, use, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';

export const AuthContext = createContext({})
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()

    // create user 
    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser)
    //         setLoading(false)
    //     })
    //     return ()=>{
    //         return unsubscribe()
    //     }
    // }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log("Current user ", currentUser);
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/users/jwt', userInfo)
                    .then(res => {
                        // console.log(res);
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }

                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }

        })

        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo = {
        signUpUser,
        updateUserProfile,
        loginUser,
        logoutUser,
        googleLogin,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;