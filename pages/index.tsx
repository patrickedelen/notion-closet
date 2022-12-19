import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";

import ClothingCard from "../components/ClothingCard";

export default function Home() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const [outfitData, setOutfitData] = useState({
    cost: "",
    timesWorn: 0,
    name: "",
  });

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    return () => URL.revokeObjectURL(preview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const onTextChange = (e) => {
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
