import { CardsSkeleton } from "@/app/ui/skeletons";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function GalleryBox({ images }) {

  if (!images) {
    return <CardsSkeleton />;
  }

  const [index, setIndex] = useState(-1);
  const [check, setCheck] = useState(false);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex];
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex];

  const handleClick = (index) => {
    setIndex(index);
    setTimeout(() => {
      setCheck(!check);
    }, 400);
  };

  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div>
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      />
      {currentImage && (
        <Lightbox
          mainSrc={currentImage.src}
          nextSrc={nextImage.src}
          prevSrc={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
}
