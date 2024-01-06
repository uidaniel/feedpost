import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaTruckField } from 'react-icons/fa6';
import { IoIosArrowBack } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { auth, createUserWithEmailAndPassword, onAuthStateChanged, database, firestore} from '../firebase';
import { addDoc, collection, doc, setDoc  } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import {ref, uploadString, getDownloadURL} from 'firebase/storage'
import SyncLoader from 'react-spinners/SyncLoader'

const SignUp = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false)
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [ProfilePicture, setProfilePicture] = useState('')
    const [toastMessage, setToastMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toastSuccessMessage, setToastSuccessMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [passwordShow, setPasswordShow] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const navigate = useNavigate();

    const db = getDatabase()

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file){
            const reader = new FileReader()

            reader.onload = () => {
                setProfilePicture(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }

    
    const handleCreateAccount = async() => {
        if (emailAddress && password && fullName && ProfilePicture){
            setButtonLoading(true)
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, password)
                const user = userCredential.user
                const userID = user.uid

                // const storageRef = ref(storage, `profilePictures/${user.uid}`);
                // await uploadString(storageRef, ProfilePicture, 'data_url');

                // // Get the download URL of the uploaded image
                // const downloadURL = await getDownloadURL(storageRef);

                const userDocRef = doc(firestore, 'users', userID)

                const userData = {
                    Name: fullName,
                    EmailAddress: emailAddress,
                    ProfilePicture: ProfilePicture,
                }

                await setDoc(userDocRef, userData)
                    
            } catch(error) {
                setToastMessage(true)
                setErrorMessage(error.message)
                setToastSuccessMessage(false)
                setButtonLoading(false)
            }
            onAuthStateChanged(auth, (user)=> {
                if (user){
                    setToastMessage(false)
                    setToastSuccessMessage(true)
                    setButtonLoading(false)
                    setSuccessMessage('Sign Up Successful')
                    setTimeout(()=> {
                        setToastSuccessMessage(false)
                        navigate('/')
                    }, 3000)
                } else {
                    setToastMessage(true)
                    setButtonLoading(false)
                }
            })

        } else {
            setToastMessage(true)
            setErrorMessage('Please input your full, email address and password to signup')
        }
    }

    if (isCreatingAccount){
        setTimeout(()=> {
            setIsCreatingAccount(false)
        }, 5000)
    }

    if (toastMessage){
        setTimeout(()=> {
            setToastMessage(false)
        }, 5000)
    }
    
  return (
    <section className='flex flex-col items-center bg-[#fcf7df] h-[100vh] w-[100vw] p-[30px] px-[18px] md:flex md:flex-row'>
        {toastSuccessMessage && (
            <motion.div 
            initial={{y: -1000}}
            animate={{y: 0}}
             className='fixed top-4 left-[10vw] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between'>
                <div className='flex items-center'>
                    <FaCheckCircle size={60} color='#22c55e' className='ms-3'/>
                    <p className=' text-[14px] ms-5 w-[90%]'><span className='text-green-500 font-bold'>Success: </span>{successMessage}</p>
                </div>
                <IoMdClose size={40} className='me-3' onClick={()=> {
                    setToastSuccessMessage(false)
                    navigate('/')
                }}/>
            </motion.div>
        )}
        {toastMessage && (
            <motion.div 
            initial={{y: -1000}}
            animate={{y: 0}}
             className='fixed top-4 left-[10vw] bg-white w-[80vw] h-[100px] rounded-[10px] flex items-center gap-6 shadow-xl border justify-between'>
                <div className='flex items-center'>
                    <FcCancel size={60} color='#FF2424' className='ms-3'/>
                    <p className=' text-[14px] ms-5 w-[90%]'><span className='text-[#FF2424] font-bold'>Error: </span>{errorMessage}</p>
                </div>
                <IoMdClose size={40} className='me-3' onClick={()=> {
                    setToastMessage(false)
                }}/>
            </motion.div>
        )}
        {isCreatingAccount && (
            <div className='fixed top-0 left-0 bg-black/40 w-[100vw] h-[100vh] flex items-center justify-center'>
                <div className="w-[50%] bg-white h-[50%] rounded-[10px] flex flex-col gap-12 items-center justify-center">
                    <div className='w-[100px] h-[100px] rounded-full bg-[#FFE4E4]'></div>
                    <p className='text-[25px] font-bold text-[#FF2424]'>Creating Account..</p>
                </div>
            </div>
        )}
        <div className="hidden md:flex md:flex-col md:w-[50vw] md:items-center md:justify-center">
            <img src="https://bafybeibwm2p6evzko2347enjs6gzp66gkjsllq3lq3xu3bjrlvcaz5s6k4.ipfs.w3s.link/Sign up-pana.svg" alt="" className='w-[450px]'/>
        </div>
        <div className='w-[100%] md:w-[50vw]'>
            <div className="flex gap-5 items-center">
                <div>
                    <IoIosArrowBack size={30} onClick={()=> {
                        navigate(-1)
                    }}/>
                </div>
                <img src="https://bafybeigfti5usy3rsztdbbqu2bnox4fbbvykrueijnmeoaw625xglbo7xq.ipfs.w3s.link/FeedPost Logo.svg" className="w-[150px]" alt="" />
            </div>
            <div className='mt-[34px]'>
                <p className='font-bold text-[36px]' onClick={()=> {
                    setPasswordShow(true)
                }}>Create an account!</p>
                <Link to='/signin' className='decoration-none'>Already have an account? <span className='text-[#FF2424]'>Login</span></Link>
            </div>
            <div className='w-[100%] mt-[34px]'>
                <div className='mt-3 mb-5 w-[100%]'>
                    <label htmlFor="Content/Body">Full Name<span className='text-[#FF2424]'>*</span></label>
                    <input type="text" value={fullName} className='border rounded-[10px] h-[50px] w-[100%] mt-1 ps-4 focus:outline-red-500' onChange={(e)=> {
                        setFullName(e.target.value)
                    }}/>
                </div>
                <div className='mt-3 mb-5 w-[100%]'>
                    <label htmlFor="Content/Body">Email Address<span className='text-[#FF2424]'>*</span></label>
                    <input type="email" value={emailAddress} className='border rounded-[10px] h-[50px] w-[100%] mt-1 ps-4 focus:outline-red-500' onChange={(e)=> {
                        setEmailAddress(e.target.value)
                    }}/>
                </div>
                <div className='mt-3 mb-5 w-[100%]'>
                    <label htmlFor="Content/Body">Password<span className='text-[#FF2424]'>*</span></label>
                    <div className='border rounded-[10px] h-[50px] w-[100%] mt-1 flex items-center bg-white justify-between pe-6'>
                        <input type={passwordShow ? 'text' : 'password'} value={password} className='h-[100%] w-[100%] bg-transparent mt-1 ps-4 focus:outline-none' onChange={(e)=> {
                            setPassword(e.target.value)
                        }}/>
                        <div>
                            {passwordShow && (
                                <div>
                                    <FaEyeSlash size={23} onClick={()=> {
                                        setPasswordShow(false)
                                    }}/>
                                </div>
                            )}
                            {!passwordShow && (
                                <div>
                                    <FaEye size={22} onClick={()=> {
                                        setPasswordShow(true)
                                    }}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-3 mb-5 w-[100%]'>
                    <label htmlFor="Content/Body">Profile Picture<span className='text-[#FF2424]'>*</span></label>
                    <input type="file" accept='image/*' className='border rounded-[10px] h-[50px] w-[100%] mt-1 ps-4 flex items-center' onChange={handleImageChange}/>
                </div>
                <div className="w-[100%] h-[60px] rounded-[10px] flex items-center gap-2 justify-center bg-[#FF2424] hover:bg-[#d41717] hover:duration-200 hover:ease-in text-white text-[18px] font-bold" onClick={handleCreateAccount}>{buttonLoading ? <SyncLoader color='#fff' size={10}/> : 'Sign Up'}</div>
            </div>
        </div>
    </section>
  )
}

export default SignUp