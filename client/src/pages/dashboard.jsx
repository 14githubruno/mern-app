import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllTvseriesQuery } from "../redux/api/tvseries-api-slice";
import { setTvseries } from "../redux/features/tvseries/tvseries-slice";
import Table from "../components/table/table";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const { data, isSuccess } = useGetAllTvseriesQuery();

  // sort and set rows to be displayed in the table
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
      <p className="dashboardParag">
        This is your dashboard,{" "}
        <span className="dashboardUsername">{user}</span>
        <span className="dashboardCTAParag">
          If you want to kreate a table row,{" "}
          <Link
            className="dashboardKreateLink"
            to={"/dashboard/kreate-tvseries"}
          >
            klick here
          </Link>
        </span>
      </p>
      {/* display table with rows */}
      <Table tvseries={tvseries} />
    </section>
  );
}
