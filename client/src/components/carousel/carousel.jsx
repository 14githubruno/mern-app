import "./carousel.scss";
import { TfiControlForward, TfiControlBackward } from "react-icons/tfi";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Carousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <article className="carousel">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {images.map((image, index) => {
            return (
              <div key={index} className="carousel-slide">
                <img
                  className="carousel-slide--image"
                  loading="lazy"
                  src={image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <span className="carousel-next-button" onClick={scrollNext}>
        <TfiControlForward
          aria-label="next button"
          className="carousel-next-button--svg"
        />
      </span>
      <span className="carousel-prev-button" onClick={scrollPrev}>
        <TfiControlBackward
          aria-label="prev button"
          className="carousel-prev-button--svg"
        />
      </span>
    </article>
  );
}
