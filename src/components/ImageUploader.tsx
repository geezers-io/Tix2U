import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Button, Avatar } from '@chakra-ui/react';
import supabase from '@/api/lib/supabase';
import { ProfileImage } from '@/constants/link';
import { useCustomToast } from '@/hooks/useCustomToast';

interface Props {
  url: string | null;
  onUpload: (files: string) => void;
}

const ImageUpload: FC<Props> = ({ url, onUpload }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const toast = useCustomToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    inputRef.current?.click();
  };

  const downloadImage = async path => {
    try {
      const { data } = await supabase.storage.from('avatars').download(path);

      if (data) {
        const url = URL.createObjectURL(data);
        setImageUrl(String(url));
      }
    } catch {
      toast.error('이미지를 다운 받지 못했습니다. ');
    }
  };
  const uploadImage = async event => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      await supabase.storage.from('avatars').upload(filePath, file);

      onUpload(String(file));
      console.log(imageUrl);
    } catch {
      toast.error('이미지를 불러오지 못했습니다');
    }
  };
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  return (
    <>
      <Avatar size="xl" src={imageUrl ? imageUrl : ProfileImage} m="auto 0" objectFit="contain" aspectRatio="1/1" />
      <Button color="white" variant="solid" colorScheme="brand" onClick={handleUploadButtonClick}>
        파일 업로드하기
        <input type="file" ref={inputRef} hidden accept="image/*" onChange={uploadImage} />
      </Button>
    </>
  );
};

export default ImageUpload;
