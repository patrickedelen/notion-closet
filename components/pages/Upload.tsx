// @ts-nocheck
import { Container, Grid } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from 'next/dynamic'
import Webcam from 'react-webcam'

import { Input } from '@nextui-org/react'

import HeroButton from '@/components/heroButton'

import ClothingCard from "@/components/ClothingCard";
import Card from "@/components/card/Card"

import { motion, AnimatePresence } from 'framer-motion'

import styles from './Upload.module.css'
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux"
import { setNewName, setFormState, selectNewItem, setImage, addItem } from '../../store/clothesSlice'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from '@fortawesome/free-solid-svg-icons'



const videoConstraints = {
    facingMode: "environment"
}

// 

const DarkButton = ({ title, onClick, className = styles.darkButton, filled }) => {
    return (
        <motion.button onClick={onClick} className={className}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ background: filled ? 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)' : 'black' }}
        >
            {title}
        </motion.button>
    )
}

export default function UploadPageDeferred() {
    const webcamRef = useRef(null)
    const [imageB64, setImageB64] = useState('')
    const [webcamIsOpen, setWebcamIsOpen] = useState(false)
    const [imageTaken, setImageTaken] = useState(false)
    const nameRef = useRef(null)

    const newItem = useSelector(selectNewItem)

    console.log('newItem', newItem)

    const dispatch = useDispatch()
    console.log('webcamIsOpen', webcamIsOpen)

    const formValid = (
        newItem.name && newItem.type && newItem.cost && newItem.age && imageB64 !== ''
    )

    const checkUserPerms = useCallback(() => {
        if (webcamRef?.current?.state?.hasUserMedia) {
            setTimeout(() => {
                setWebcamIsOpen(true)
            }, 500)
        } else {
            setTimeout(() => {
                checkUserPerms()
            }, 250)
        }
    }, [webcamRef])

    useEffect(() => {
        checkUserPerms()
    }, [checkUserPerms])

    useEffect(() => {
        if (webcamRef?.current?.state?.hasUserMedia) {
            setTimeout(() => {
                setWebcamIsOpen(true)
            }, 1000)
        }
    }, [webcamRef?.current?.state?.hasUserMedia])

    const openForm = (type) => {
        console.log('openForm', type)
        dispatch(setFormState({ formOpen: true, formType: type }))
    }

    const onNameChange = (e) => {
        dispatch(setNewName(e.target.value))
    }

    const captureImage = () => {
        if (imageTaken) {
            // reset state of image and restart the camera
            setImageB64('')
            setImageTaken(false)
            setTimeout(() => {
                setWebcamIsOpen(true)
            }, 1000)
        } else {
            setWebcamIsOpen(false)
            const image = webcamRef.current.getScreenshot()
            setImageB64(image)
            setImageTaken(true)
            setWebcamIsOpen(false)
            dispatch(setImage(image))
        }
        // const file = urltoFile(image, 'image.png', 'image/jpeg').then((file) => {
        //     console.log('promise', file)
        //     // runUpload(file)
        // })
    }


    

    const uploadClothes = (file) => {
        console.log('will run upload')
        dispatch(addItem())
        // const formData = new FormData();
        // formData.append("photo", file);
        // formData.append("cost", `100`);
        // formData.append("name", `test`);
        // formData.append("timesWorn", "0");
        // axios.post("/api/uploadImage", formData).then((data) => console.log(data));
    };

    return (
        <div className={styles.uploadContainer}>

            <div className={styles.webcamContainer}>
                <AnimatePresence>
                    {
                        (!webcamIsOpen && !imageTaken) && (
                            <motion.div
                                initial={{ opacity: 0.1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.webcamLoader}
                            >
                                <FontAwesomeIcon icon={faCamera} size="4x"/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
                {
                    !imageTaken && (
                    <Webcam
                        width={350}
                        height={263}
                        className={styles.uploadWebcam}
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        forceScreenshotSourceSize={true}
                        screenshotQuality={1}
                    />)
                }
                {
                    imageB64 && (
                        <Image className={styles.uploadedImage} src={imageB64} width="380" height="263" alt="" />
                    )
                }
            </div>
            <div className={styles.captureButtonContainer}>
                <DarkButton title={imageTaken ? "retake" : "capture"} onClick={captureImage} className={styles.darkButtonLarge} />
            </div>

            <div className={styles.nameInputContainer}>
                <Input value={newItem.name} onChange={onNameChange} placeholder="Name" clearable fullWidth className={styles.nextInput} size="lg" bordered/>
            </div>
            
            <div className={styles.formContainer}>
                <DarkButton title={"type"} onClick={() => openForm('type')} filled={!!newItem.type} />
                <DarkButton title={"cost"} onClick={() => openForm('cost')} filled={!!newItem.cost}/>
                <DarkButton title={"age"}  onClick={() => openForm('age')} filled={!!newItem.age}/>

            </div>

            <div className={styles.uploadButtonContainer}>
                <HeroButton title={"upload"} onClick={uploadClothes} valid={formValid} loading={true} />
            </div>
        </div>
    )
}
