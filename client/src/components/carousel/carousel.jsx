// styles
import "./carousel.scss";

// icons
import { TfiControlForward, TfiControlBackward } from "react-icons/tfi";

// react lib
import { useCallback } from "react";

// pkgs
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/**
 * Carousel component.
 *
 * It displays a carousel of images with prev/next buttons.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array<object>} props.images - An array of image objects. Each object has URL and alt text.
 *
 * @returns {JSX.Element} The rendered Carousel component.
 */
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
            const { src, alt } = image;
            return (
              <div key={index} className="carousel-slide">
                <img className="carousel-slide--image" src={src} alt={alt} />
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
