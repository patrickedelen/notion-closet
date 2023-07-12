
// @ts-nocheck
import styles from './Card.module.css'
import { Image } from '@nextui-org/react'
import { Text, Button, Row, Tooltip } from "@nextui-org/react";
import { motion } from 'framer-motion'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import CustomIcon from '@/components/customIcon'

import { isWearingItem, addItem, removeItem, isWearingType, replaceItem } from '../../store/outfitSlice';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, title, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [imageClass, setImageClass] = useState(styles.image);
    const [fallbackTries, setFallbackTries] = useState(0);
    
    const pollForFullImage = () => {
        if (fallbackTries < 60) {
            setFallbackTries(fallbackTries + 1);

            setTimeout(() => {
                fetch(src, { method: 'HEAD' })
                    .then((res) => {
                        if (res.ok) {
                            setImgSrc(src)
                            setImageClass(styles.image)
                        } else {
                            pollForFullImage()
                        }
                    })
                    .catch((error) => {
                        console.log('error', error)
                        pollForFullImage()
                    })
            }, 1500)
        } else {
            setImageClass(styles.fallbackImage)
        }
    }
    

    return (
        <Tooltip content={title} style={{ width: '100%', zIndex: '50' }}>
            <Image
                {...rest}
                src={imgSrc}
                onError={() => {
                    setImageClass(styles.fallbackImage)
                    setImgSrc(fallbackSrc)
                    pollForFullImage()
                }}
                alt="clothing item"
                className={imageClass}
            />
        </Tooltip>
    );
};

const variants = {
    wear: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 0%, #001839 43.75%)', transition: { duration: 0.25 } },
    wearing: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)', transition: { duration: 0.25 } },
};

export default function Card({ url, heroUrl, name, id, type }: { url: string, heroUrl: string, name: string, id: string, type: string }) {
    const dispatch = useDispatch()

    const wearing = useSelector(isWearingItem(id))
    const typeBeingWorn = useSelector(isWearingType(type))

    const handleClick = () => {
        if (wearing) {
            dispatch(removeItem({ id: id, type: type }))
        } else if (typeBeingWorn) {
            dispatch(replaceItem({ id: id, type: type }))
        } else {
            dispatch(addItem({ id: id, type: type }))
        }
    }
    
    return (
        <div className={styles.cardContainer} key={id}>
            <div className={styles.icon}>
                <CustomIcon type={type} checked={typeBeingWorn} />
            </div>
            <ImageWithFallback src={heroUrl} fallbackSrc={url} title={name} alt={name} height={250} />
            <Row justify='center'>
                <motion.button
                    onClick={handleClick}
                    variants={variants}
                    animate={wearing ? 'wearing' : 'wear'}
                    initial={false}
                    className={(typeBeingWorn && !wearing) ? styles.cardButtonDisabled : styles.cardButton}
                    >
                    {wearing ? 'Wearing!': (typeBeingWorn && !wearing) ? 'Wear Instead' : 'Wear'}
                </motion.button>
            </Row>
        </div>
    )
}