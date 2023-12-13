import { FC, useEffect, useRef, useState } from 'react';
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

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const downloadImage = async (path: string) => {
    try {
      const { data } = await supabase.storage.from('avatars').download(path);

      if (data) {
        const url = URL.createObjectURL(data);
        setImageUrl(String(url));
        console.log(imageUrl);
      }
    } catch {
      toast.error('이미지를 다운 받지 못했습니다. ');
    }
  };
  const uploadImage = async event => {
    event.preventDefault();
    try {
      if (!event.target.files || event.target.files.length === 0) {
        toast.error('이미지가 없습니다.');
      } else {
        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        await supabase.storage.from('avatars').upload(filePath, file);

        onUpload(filePath);
      }
    } catch {
      toast.error('이미지를 불러오지 못했습니다');
    }
  };
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  return (
    <>
      <Avatar size="2xl" src={imageUrl ? imageUrl : ProfileImage} m="auto 0" objectFit="contain" aspectRatio="1/1" />
      <Button color="brand" variant="outline" size="xs" colorScheme="brand" onClick={handleUploadButtonClick}>
        이미지 변경하기
        <input type="file" ref={inputRef} hidden accept="image/*" onChange={uploadImage} />
      </Button>
    </>
  );
};

export default ImageUpload;
