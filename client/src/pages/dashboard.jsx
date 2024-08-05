import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllTvseriesQuery } from "../redux/api/tvseries-api-slice";
import { setTvseries } from "../redux/features/tvseries/tvseries-slice";
import Searchbar from "../components/searchbar/searchbar";
import WelcomeGuideUserParagraphs from "../components/welcome-guide-user-paragraphs/welcome-guide-user-paragraphs";
import Table from "../components/table/table";

export default function Dashboard() {
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const { data, isSuccess } = useGetAllTvseriesQuery();

  useEffect(() => {
    if (isSuccess && data.body) {
      const sortedItems = data?.body
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      dispatch(setTvseries([...sortedItems]));
    }
  }, [data, isSuccess]);

  return (
    <section>
      <Searchbar tvseries={tvseries} filter={filter} setFilter={setFilter} />
      <WelcomeGuideUserParagraphs
        userLoggedIn={user}
        kreateTvseriesRoute={"/dashboard/kreate-tvseries"}
      />
      <Table tvseries={tvseries} filter={filter} />
    </section>
  );
}
