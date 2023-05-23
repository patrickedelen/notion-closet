// @ts-nocheck
import { Container, Grid } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic'
import Webcam from 'react-webcam'

import { Input } from '@nextui-org/react'

import HeroButton from '@/components/heroButton'

import ClothingCard from "@/components/ClothingCard";
import Card from "@/components/card/Card"

import { motion } from 'framer-motion'

import styles from './Upload.module.css'
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux"
import { selectLoading, selectClothes, getClothes, setFormState } from '../../store/clothesSlice'


const videoConstraints = {
    facingMode: "environment"
}

// 

export default function UploadPageDeferred() {
    const webcamRef = useRef(null)
    const [imageB64, setImageB64] = useState('')

    const dispatch = useDispatch()

    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ audio: false, video: videoConstraints })

    // })

    const openForm = () => {
        dispatch(setFormState({ formOpen: true, formType: 'cost' }))
    }

    const getImage = () => {
        const image = webcamRef.current.getScreenshot()
        console.log(image)
        setImageB64(image)
        const file = urltoFile(image, 'image.png', 'image/jpeg').then((file) => {
            console.log('promise', file)
            runUpload(file)
        })
    }

    function urltoFile(url, filename, mimeType){
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, {type:mime || mimeType});
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename,{type:mimeType}));
    }
    

    const runUpload = (file) => {
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("cost", `100`);
        formData.append("name", `test`);
        formData.append("timesWorn", "0");
        axios.post("/api/uploadImage", formData).then((data) => console.log(data));
    };

    return (
        <div className={styles.uploadContainer}>

            <div className={styles.webcamContainer}>
                <Webcam
                    width={350}
                    height={263}
                    className={styles.uploadWebcam}
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </div>
            <div className={styles.formContainer}>
                <HeroButton title={"Capture"} />
                <Input placeholder="Name" clearable fullWidth className={styles.nextInput} size="lg" bordered />
                <HeroButton title={"type"} />
                <HeroButton title={"cost"} />
                <HeroButton title={"open"} onClick={openForm} />
            
            </div>

            {imageB64 !== '' && (<Image src={imageB64} alt="" />)}
        </div>
    )
}
