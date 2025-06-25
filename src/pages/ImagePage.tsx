import { useState } from "react";
import { Lightbox, Image, Label, Card } from "xyz-comp";

import image1 from "../assets/images/image1-src.avif";
import image1Placeholder from "../assets/images/image1-placeholder.avif";
import image2 from "../assets/images/image2-src.avif";
import image2Placeholder from "../assets/images/image2-placeholder.avif";
import image3 from "../assets/images/image3-src.avif";
import image3Placeholder from "../assets/images/image3-placeholder.avif";
import image4 from "../assets/images/image4-src.avif";
import image4Placeholder from "../assets/images/image4-placeholder.avif";
import image5 from "../assets/images/image5-src.avif";
import image5Placeholder from "../assets/images/image5-placeholder.avif";
import image6 from "../assets/images/image6-src.jpg";
import image6Placeholder from "../assets/images/image6-src.jpg";

const localImages = [
  { src: image1, placeholder: image1Placeholder },
  { src: image2, placeholder: image2Placeholder },
  { src: image3, placeholder: image3Placeholder },
  { src: image4, placeholder: image4Placeholder },
  { src: image5, placeholder: image5Placeholder },
  { src: image6, placeholder: image6Placeholder },
];

const urlImages = localImages.map(i => ({ src: i.src }));

export default function ImagePage() {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState<{ src: string }[]>([]);
  const [lbStart, setLbStart] = useState(0);

  const openLightbox = (imgs: { src: string }[], start = 0) => {
    setLbImages(imgs);
    setLbStart(start);
    setLbOpen(true);
  };

  return (
    <Card className="space-y-8 p-5">
      {/* -------- Tekli (local) -------- */}
      <section className="w-72 space-y-2">
        <Label className="text-lg">Tekli resim (Local)</Label>
        <Image
          src={localImages[0].src}
          placeholderSrc={image1Placeholder}
          className="w-full h-full cursor-pointer"
          onClick={() => openLightbox([localImages[0]], 0)}
        />
      </section>

      {/* -------- Galeri (local) -------- */}
      <section className="space-y-2">
        <Label className="text-lg">Fotoğraf koleksiyonu (Local)</Label>
        <div className="flex flex-wrap gap-3">
          {localImages.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              placeholderSrc={img.placeholder}
              className="w-72 h-96 cursor-pointer object-cover"
              onClick={() => openLightbox(localImages, i)}
            />
          ))}
        </div>
      </section>

      {/* -------- Tekli (URL) -------- */}
      <section className="w-72 space-y-2">
        <Label className="text-lg">Tekli resim (URL)</Label>
        <Image
          src={localImages[0].src}
          placeholderSrc={localImages[0].placeholder}
          className="h-[435px] w-72 cursor-pointer object-cover"
          onClick={() => openLightbox([urlImages[0]], 0)}
        />
      </section>

      {/* -------- Galeri (URL) -------- */}
      <section className="space-y-2">
        <Label className="text-lg">Fotoğraf koleksiyonu (URL)</Label>
        <div className="flex flex-wrap gap-3">
          {localImages.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              placeholderSrc={img.placeholder}
              className="w-72 h-96 cursor-pointer object-cover"
              onClick={() => openLightbox(urlImages, i)}
            />
          ))}
        </div>
      </section>

      <Lightbox
        open={lbOpen}
        images={lbImages}
        startIndex={lbStart}
        onClose={() => setLbOpen(false)}
      />
    </Card>
  );
}
