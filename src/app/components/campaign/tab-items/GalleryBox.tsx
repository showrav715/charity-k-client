import { ImageGalleryInterface } from "@/@types/frontend";

import NotFounds from "@/app/ui/NotFounds";


interface GALProps {
  gal_data: ImageGalleryInterface[];
}


export default function GalleryBox({ gal_data }: GALProps) {
  return (
    <div className="row g-4">
      {gal_data.length != 0 ?
        gal_data.map((gal, index) => (
          <div className="col-md-6" key={index}>
            <img
              src={gal?.original}
              width={648}
              height={648}
              alt="gallery img"
              className="ch-details-gal-img w-100 object-contain"
            />
          </div>
        )) :(
          <NotFounds  />
        )}
    </div>
  );
}
