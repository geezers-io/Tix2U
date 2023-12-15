import { FC, useRef, useState } from 'react';
import { Image, Box } from '@chakra-ui/react';

interface ZoomImageProps {
  src?: string;
}

const ZoomImage: FC<ZoomImageProps> = ({ src }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    containerRef.current.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    setPosition({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.backgroundPosition = 'center';
    }
    setIsZoomed(false);
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      w="100%"
      h="100%"
      ref={containerRef as React.MutableRefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        objectFit="cover"
        w="100%"
        h="100%"
        transition="transform 0.3s ease-in-out"
        transform={`scale(${isZoomed ? 1.5 : 1})`}
        transformOrigin={`${position.x * 100}% ${position.y * 100}%`}
      />
    </Box>
  );
};

export default ZoomImage;
