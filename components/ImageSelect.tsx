import { Image } from "@nextui-org/react";
import { useRef } from "react";

type ImageSelectProps = {
  url: string;
  alt?: string;
  onChange: (string) => void;
}

async function getLocalImageAsBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageSelect({ alt, url, onChange }: ImageSelectProps) {
  const inputRef = useRef();

  const openFileSelector = () => {
    const inputElement = inputRef.current as HTMLInputElement;
    inputElement.click();
  }

  const changeImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await getLocalImageAsBase64(file);
    onChange(base64);
  }

  return (
    <>
      <input style={{ display: "none" }} type="file" onChange={changeImage} ref={inputRef} />
      <Image src={url}
        style={{ cursor: "pointer" }}
        onClick={openFileSelector}
        alt={alt}
        objectFit="contain"
        width={240}
        height="100%" />
    </>
  );
}