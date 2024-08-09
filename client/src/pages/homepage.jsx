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

const images = [
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
  imageFive,
  imageSix,
  imageSeven,
  imageEight,
  imageNine,
  imageTen,
];

import HomeHeadingOne from "../components/home-heading-one/home-heading-one";
import HomeParagraph from "../components/home-paragraph/home-paragraph";
import HomeTelevision from "../components/home-television/home-television";

export default function Homepage() {
  return (
    <section>
      <div className="home-text-content--home-tv">
        <div>
          <HomeHeadingOne />
          <HomeParagraph />
        </div>
        <HomeTelevision carouselImages={images} />
      </div>
    </section>
  );
}
