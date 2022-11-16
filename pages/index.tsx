import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";

import { Button, Input } from "@nextui-org/react";
import styled from "styled-components";

import ClothingCard from "../components/ClothingCard";

export default function Home() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    return () => URL.revokeObjectURL(preview);
  }, [file]);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const runUpload = () => {
    const formData = new FormData();
    formData.append("photo", file);
    axios.post("/api/uploadImage", formData).then((data) => console.log(data));
  };
  return (
    <div>
      <Head>
        <title>Notion Closet</title>
        <meta name='description' content='todo' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {preview && <img src={preview} height={200} width={200} />}
      <Input type='file' onChange={onFileChange} aria-label='file-upload' />
      <Button onPress={runUpload}>Run Upload</Button>
      <main>
        <ClothingCard />
      </main>
    </div>
  );
}
