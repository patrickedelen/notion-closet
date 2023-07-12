// @ts-nocheck

import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Row,
  Badge
} from "@nextui-org/react";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

import styles from './Header.module.css'

import { motion, AnimatePresence } from 'framer-motion'

import HeaderForm from '@/components/headerForm'
import SuccessScreen from '@/components/successScreen'
import ClothesBar from '@/components/clothesBar'
import OutfitForm from '@/components/outfitForm'

import Filter from '@/components/filter'

import { useSelector, useDispatch } from "react-redux"
import { selectFormOpen, setFormState, selectSuccessScreenOpen } from "../../store/clothesSlice";
import { selectShowClothesBar, selectOutfitFormOpen, selectWearingCount, setOutfitFormOpen } from "../../store/outfitSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons'

const PlusLink = () => {
  return (
    <Link className={styles.uploadLink} href="/upload">
      <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
        <FontAwesomeIcon icon={faPlus} />
      </motion.span>
    </Link>
  )
}

const DownLink = ({ wearingCount, onClick }) => {
  return (
    <motion.div className={styles.clothesLink} onClick={onClick}>
      <Badge disableOutline disableAnimation content={wearingCount}
        css={{ background: 'white', color: 'black', top: '18px' }}
      >

      <motion.span
          initial={{ scale: 0.9}}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={wearingCount}
          >
        <FontAwesomeIcon icon={faChevronDown} />
      </motion.span>
      </Badge>
    </motion.div>
  )
}

// container styles, flex row

const headerVariants = {
  closed: { height: '100px', transition: { duration: 0.5 }},
  open: { height: '90%', transition: { duration: 0.5 }},
}

export default function Header() {
  const [open, setOpen] = useState(true);
  console.log('got render', open)
  const dispatch = useDispatch()


  const openHeader = () => {
    console.log('got open event', open)
    setOpen(!open)
  }

  const closeHeader = () => {
    console.log('got close event')
    dispatch(setFormState({ formOpen: false }))
    
  }
  const closeSuccessScreen = () => {
    console.log('got close event')
    dispatch(selectSuccessScreenOpen(false))
  }

  const formOpen = useSelector(selectFormOpen)
  const successScreenOpen = useSelector(selectSuccessScreenOpen)


  // logic for outfit creation header transform
  // if has selected any clothes, show down arrow
  // else show plus button
  // animate down arrow on outfit add
  const wearingCount = useSelector(selectWearingCount)
  const showOutfitButton = wearingCount > 0
  const showOutfitForm = useSelector(selectOutfitFormOpen)



  const showClothesBar = useSelector(selectShowClothesBar)
  const [waitClothesBar, setWaitClothesBar] = useState(false)
  useEffect(() => {
      if (showClothesBar) {
        setWaitClothesBar(true)
      } else {
        setTimeout(() => {
          setWaitClothesBar(false)
        }, 100)
      }
  }, [showClothesBar])

  console.log('formOpen', formOpen)

  const headerHeight = formOpen || successScreenOpen || showOutfitForm  ? '90vh' : '100px'
  const shadowHeaderHeight = '100px'

  console.log('header height', headerHeight)


  // logic for show / hide filter
  const router = useRouter()

  const containerRef = useRef()

  const [showFilter, setShowFilter] = useState(false)
  const [onHomePage, setOnHomePage] = useState(false)
  const toggleFilter = () => {

  }

  useEffect(() => {
    if (router.pathname === '/') {
      setOnHomePage(true)
    } else {
      setOnHomePage(false)
    }
  }, [router])

  useEffect(() => {
      function handleScroll() {
        setShowFilter(true)
      }

      document.addEventListener('scroll', handleScroll)

      return () => {
          document.addEventListener('scroll', handleScroll)
      }
  })

  const onShowOutfitClick = () => {
    console.log('got click event')
    if (showFilter) {
      setShowFilter(false)
    }
    dispatch(setOutfitFormOpen(!showOutfitForm))
  }




  return (
    <header className={styles.header}>


      <motion.div 
        animate={{
          height: headerHeight,
        }}
        className={styles.headerContainer}
      >
        <div className={styles.headerRow}>
          <AnimatePresence>
            <Link href="/" className={styles.titleLarge}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                What are you wearing today?
              </motion.span>
            </Link>
            <Link href="/" className={styles.titleSmall}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WYWT?
              </motion.span>
            </Link>

            <motion.div className={styles.absoluteContainer}>
              { !showOutfitButton && <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
              >
                <PlusLink />
                </motion.div> }
                
              { onHomePage && showOutfitButton && <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
              ><DownLink wearingCount={wearingCount} onClick={onShowOutfitClick} /></motion.div> }
            </motion.div>

          </AnimatePresence>
        </div>

        <AnimatePresence>
          {
            showOutfitForm &&
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: '3vh', width: '100%', height: '100%' }}
            >
              <OutfitForm />
              <span className={styles.closeArea} onClick={onShowOutfitClick}></span>
            </motion.div>
          }

        </AnimatePresence>


        <AnimatePresence>
          {
            formOpen && 
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: '10vh'}}
            >
              <HeaderForm />
              <span className={styles.closeArea} onClick={closeHeader}></span>
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {
            successScreenOpen && 
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: '10vh'}}
            >
              <SuccessScreen />
              <span className={styles.closeArea} onClick={closeSuccessScreen}></span>
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
            { showFilter && onHomePage &&
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                <Filter />
              </motion.div>
            }
        </AnimatePresence>

        <div className={styles.headerBottom}></div>
      </motion.div>

    </header>
  );
}
