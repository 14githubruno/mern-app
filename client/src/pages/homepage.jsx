import HomeHeadingOne from "../components/ui/home-heading-one/home-heading-one";
import HomeTelevision from "../components/ui/home-television/home-television";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/features/counter/counter-slice";
import { useGetPokemonByNameQuery } from "../redux/api/pokemon";

export default function Homepage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
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
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>
    </section>
  );
}
