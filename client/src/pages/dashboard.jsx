import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllTvseriesQuery,
  useDeleteOneTvseriesMutation,
} from "../redux/api/tvseries-api-slice";
import { setTvseries } from "../redux/features/tvseries/tvseries-slice";
import Searchbar from "../components/searchbar/searchbar";
import WelcomeGuideUserParagraphs from "../components/welcome-guide-user-paragraphs/welcome-guide-user-paragraphs";
import Table from "../components/table/table";
import ModalDelete from "../components/modal-delete/modal-delete";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [tableRowToDelete, setTableRowToDelete] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const { data, isLoading, isSuccess } = useGetAllTvseriesQuery();
  const [deleteOneTvseries, { isLoading: isDeleting }] =
    useDeleteOneTvseriesMutation();

  useEffect(() => {
    if (isSuccess && data.body) {
      const sortedItems = data.body
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      dispatch(setTvseries([...sortedItems]));
    } else {
      dispatch(setTvseries([]));
    }
  }, [data, isSuccess]);

  // modal delete reference to toggle it
  const modalRef = useRef(null);
  const toggleModalToDelete = () => {
    const modal_classes = modalRef?.current.classList;
    if (modal_classes.contains("modalHidden")) {
      modal_classes.remove("modalHidden");
    } else {
      modal_classes.add("modalHidden");
    }
  };

  // select table row to delete
  const selectTableRowToDelete = (id) => {
    const tableRow = tvseries.find((singleSeries) => singleSeries._id === id);
    setTableRowToDelete((prev) => ({ ...prev, ...tableRow }));
  };

  // delete table row
  const deleteTableRow = async () => {
    try {
      const res = await deleteOneTvseries(tableRowToDelete).unwrap();
      if (res.body) {
        toast.success(res.message);
        setTableRowToDelete(null);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // do not delete table row
  const doNotDeleteTableRow = () => {
    setTableRowToDelete(null);
  };

  return (
    <section>
      <ModalDelete
        modalRef={modalRef}
        toggleModalToDelete={toggleModalToDelete}
        confirm={deleteTableRow}
        doNotConfirm={doNotDeleteTableRow}
      />
      <Searchbar filter={filter} setFilter={setFilter} />
      <WelcomeGuideUserParagraphs
        userLoggedIn={user}
        kreateTvseriesRoute={"/dashboard/kreate-tvseries"}
      />
      <Table
        filter={filter}
        contentIsLoading={isLoading}
        contentIsBeingDeleted={isDeleting}
        toggleModalToDelete={toggleModalToDelete}
        selectTableRowToDelete={selectTableRowToDelete}
      />
    </section>
  );
}
