// react lib
import { lazy, Suspense } from "react";

// components
import Loader from "../components/loader/loader";
const HomeContentWrapper = lazy(
  () => import("../components/home-content-wrapper/home-content-wrapper")
);
const HomeHeadingOne = lazy(
  () => import("../components/home-heading-one/home-heading-one")
);
const HomeParagraph = lazy(
  () => import("../components/home-paragraph/home-paragraph")
);
const HomeTelevision = lazy(
  () => import("../components/home-television/home-television")
);

// lib
import { useHeadTags } from "../hooks/use-head-tags";

// components data
import imageOne from "/public/images/image-one.jpg";
import imageTwo from "/public/images/image-two.jpg";
import imageThree from "/public/images/image-three.jpg";
import imageFour from "/public/images/image-four.jpg";
import imageFive from "/public/images/image-five.jpg";
import imageSix from "/public/images/image-six.jpg";
import imageSeven from "/public/images/image-seven.jpg";
import imageEight from "/public/images/image-eight.jpg";
import imageNine from "/public/images/image-nine.jpg";
import imageTen from "/public/images/image-ten.jpg";

const defaultAlt = "carousel k-tvseries image";
const images = [
  {
    src: imageOne,
    alt: defaultAlt + " " + "one",
  },
  {
    src: imageTwo,
    alt: defaultAlt + " " + "two",
  },
  {
    src: imageThree,
    alt: defaultAlt + " " + "three",
  },
  {
    src: imageFour,
    alt: defaultAlt + " " + "four",
  },
  {
    src: imageFive,
    alt: defaultAlt + " " + "five",
  },
  {
    src: imageSix,
    alt: defaultAlt + " " + "six",
  },
  {
    src: imageSeven,
    alt: defaultAlt + " " + "seven",
  },
  {
    src: imageEight,
    alt: defaultAlt + " " + "eight",
  },
  {
    src: imageNine,
    alt: defaultAlt + " " + "nine",
  },
  {
    src: imageTen,
    alt: defaultAlt + " " + "ten",
  },
];

/**
 * Home page component.
 *
 * Web app home.
 *
 * @returns {JSX.Element} The rendered Home page component.
 */
export default function Homepage() {
  // this below fires a useEffect
  useHeadTags("homepage");

  return (
    <Suspense fallback={<Loader />}>
      <section>
        <HomeContentWrapper>
          <div>
            <HomeHeadingOne />
            <HomeParagraph />
          </div>
          <HomeTelevision carouselImages={images} />
        </HomeContentWrapper>
      </section>
    </Suspense>
  );
}
