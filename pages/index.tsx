import Head from "next/head";
import { useState, useEffect, useRef, useCallback, SyntheticEvent } from "react";
import axios from "axios";
import Image from "next/image";
import Webcam from "react-webcam";

import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";

import styles from '../styles/Home.module.css'

import ClothingCard from "../components/ClothingCard";

// type FileEventTarget = EventTarget & { files: FileList }

interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}

const videoConstraints = {
  facingMode: "environment",
}

export default function Home() {
  const webcamRef = useRef<Webcam>(null);

  const [file, setFile] = useState<any>();
  const [preview, setPreview] = useState<string | undefined>("");
  const [outfitData, setOutfitData] = useState({
    cost: "",
    timesWorn: 0,
    name: "",
  });

  const capture = useCallback(() => {
    const img = webcamRef.current?.getScreenshot();
  }, [webcamRef])

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // @ts-ignore
    return () => URL.revokeObjectURL(preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onFileChange = (e: any) => {
    // @ts-ignore
    console.log(e.target.files[0]);
    // @ts-ignore
    setFile(e.target.files[0]);
  };
  const onTextChange = (e: any) => {
    if (e?.target?.value) {
    console.log("e", e.target.value, e.target.id);
    setOutfitData({
      ...outfitData,
      [e.target.id]: e.target.value,
    });
  };
  const resetState = () => {
    setFile(null);
    setOutfitData({
      cost: "",
      timesWorn: 0,
      name: "",
    });
  };

  const runUpload = () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("cost", `${outfitData.cost}`);
    formData.append("name", outfitData.name);
    formData.append("timesWorn", "0");
    axios.post("/api/uploadImage", formData).then((data) => console.log(data));
  };
  return (
    <div>
      <Head>
        <title>Notion Closet</title>
        <meta name='description' content='todo' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {preview && (
          <Image
            alt='Uploaded clothes item'
            src={preview}
            height={200}
            width={200}
          />
        )}

        <Webcam
          height={1000}
          width={1000}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <Input
          id='file'
          type='file'
          onChange={onFileChange}
          aria-label='file-upload'
        />
        Cost
        <Input
          id='cost'
          type='number'
          onChange={onTextChange}
          aria-label='cost'
          value={outfitData.cost}
        />
        Name
        <Input
          id='name'
          type='text'
          onChange={onTextChange}
          aria-label='name'
          value={outfitData.name}
        />
        <Button onPress={runUpload}>Run Upload</Button>
        <Button onPress={resetState} color='error'>
          Clear
        </Button>
      </main>
    </div>
  );
}
}
