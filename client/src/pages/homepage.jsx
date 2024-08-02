import HomeHeadingOne from "../components/ui/home-heading-one/home-heading-one";
import HomeTelevision from "../components/ui/home-television/home-television";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/features/counter/counter-slice";

export default function Homepage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <section>
      <HomeHeadingOne />
      <HomeTelevision />
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span style={{ color: "white" }}>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </section>
  );
}
