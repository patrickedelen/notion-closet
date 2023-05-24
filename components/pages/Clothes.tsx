import { Container, Grid } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'

import ClothingCard from "@/components/ClothingCard";
import Card from "@/components/card/Card"

import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectLoading, selectClothes, getClothes, setFormState } from '../../store/clothesSlice'

import styles from './Clothes.module.css'

type ClothesEndpointReturn = {
  data: [ClothesItem];
};
type ClothesItem = {
  timesWorn: number;
  cost: number;
  name: string;
  imageUrl: string;
  id: string;
};

type ClothesProps = {
  clothesData?: [ClothesItem];
  err?: string;
};

const variants = {
  hidden: { opacity: 0, y: 25 },
  show: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1 + 0.2,
    },
  }),
};

const LoadingContainer = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.loadingContainer}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
      >
        <FontAwesomeIcon icon={faShirt} size="7x" color="black" className="fa-bounce" />
      </motion.div>
    </AnimatePresence>
  )
}

export default function ClothesPageDeferred() {
  const [clothes, setClothes] = useState<[ClothesItem] | []>([]);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();


  const loading = useSelector(selectLoading);
  const clothesData = useSelector(selectClothes);
  // const loading = true
  const reduxClothes = useSelector(selectClothes)

  console.log('redux state', loading, reduxClothes)

  useEffect(() => {
      dispatch(getClothes())
      // try {
      //   axios.get(
      //     `/api/getClothes`
      //   )
      //   .then((clothes: ClothesEndpointReturn) => setClothes(clothes.data))
      // } catch (err: any) {
      //   console.error("could not execute get clothes endpoint, here you go", err);
      //   setErr(err);
      // }
  }, []);



  return (
    <>
    <Container fluid>
      <Grid.Container gap={2}>
        <AnimatePresence>
        {
          loading && (
              <motion.div
                className={styles.loadingContainer}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
              >
                <FontAwesomeIcon icon={faShirt} size="7x" color="black" className="fa-bounce" />
              </motion.div>
          )
        }
        </AnimatePresence>
        {err && <p>{err}</p>}
        {!loading && clothesData.map((el: ClothesItem, i) => (
          <Grid xs={12} sm={6} md={4} justify='center' key={i}>
            <motion.div
              key={i}
              variants={variants}
              initial="hidden"
              animate="show"
              custom={i}
            >
              <Card url={el.imageUrl} name={el.name} id={el.id} />
            </motion.div>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
    </>
  );
}
