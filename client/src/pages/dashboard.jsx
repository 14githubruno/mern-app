import { useHeadTags } from "../hooks/use-head-tags";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useGetAllTvseriesQuery,
  useDeleteOneTvseriesMutation,
} from "../redux/api/tvseries-api-slice";
import { setTvseries } from "../redux/features/tvseries/tvseries-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import Searchbar from "../components/searchbar/searchbar";
import WelcomeGuideUserParagraphs from "../components/welcome-guide-user-paragraphs/welcome-guide-user-paragraphs";
import Table from "../components/table/table";
import ModalDelete from "../components/modal-delete/modal-delete";
import ModalView from "../components/modal-view/modal-view";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tableRowToDelete, setTableRowToDelete] = useState(null);
  const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
  const [tableRowToView, setTableRowToView] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetAll = useResetApiAndUser();
  const user = useSelector((state) => state.auth.user);
  const tvseries = useSelector((state) => state.tvseries.tvseries);
  const { data, isLoading, error } = useGetAllTvseriesQuery();
  const [deleteOneTvseries, { isLoading: isDeleting }] =
    useDeleteOneTvseriesMutation();

  const methods = useForm({
    defaultValues: { searchbar: "" },
  });

  useEffect(() => {
    if (error) {
      resetAll();
      navigate("/", { replace: true });
    } else if (data) {
      dispatch(setTvseries([...data.body]));
    }
  }, [data]);

  // this below fires a useEffect
  useHeadTags("dashboard", user);

  /* modal delete starts */
  const modalDeleteRef = useRef(null);

  const toggleModalToDelete = useCallback(() => {
    const modalClasses = modalDeleteRef?.current.classList;
    modalClasses.toggle("modalDeleteHidden");
  }, [modalDeleteRef]);

  const selectTableRowToDelete = useCallback(
    (id) => {
      const tableRow = tvseries.find((singleSeries) => singleSeries._id === id);
      setTableRowToDelete((prev) => ({ ...prev, ...tableRow }));
    },
    [tvseries]
  );

  const deleteTableRow = useCallback(async () => {
    try {
      const res = await deleteOneTvseries(tableRowToDelete).unwrap();
      if (res.body) {
        toast.success(res.message);
        setTableRowToDelete(null);
      }
    } catch (err) {
      if (err.data.type === "token") {
        toast.error("Token has expired. Log in again");
        resetAll();
        return;
      }
      toast.error(err.data.message);
    }
  }, [tvseries, tableRowToDelete]);

  const doNotDeleteTableRow = useCallback(() => {
    setTableRowToDelete(null);
  }, []);
  /* modal delete ends */

  /* modal view starts */
  const showTableRowInModalView = useCallback(
    (id) => {
      const rowToDisplay = tvseries.find(
        (singleSeries) => singleSeries._id === id
      );
      setTableRowToView((prev) => ({ ...prev, ...rowToDisplay }));
      setModalViewIsOpen(true);
    },
    [tvseries]
  );

  const closeModalView = useCallback(() => {
    setTableRowToView(null);
    setModalViewIsOpen(false);
  }, []);
  /* modal view ends */

  return (
    <section>
      <ModalDelete
        nameOfItemToDelete={tableRowToDelete?.title}
        modalDeleteRef={modalDeleteRef}
        toggleModalToDelete={toggleModalToDelete}
        confirm={deleteTableRow}
        doNotConfirm={doNotDeleteTableRow}
      />
      {modalViewIsOpen && (
        <ModalView closeModalView={closeModalView} {...tableRowToView} />
      )}
      <FormProvider {...methods}>
        <Searchbar contentIsLoading={isLoading} />
      </FormProvider>
      <WelcomeGuideUserParagraphs
        userLoggedIn={user}
        kreateTvseriesRoute={"/dashboard/kreate-tvseries"}
      />
      <FormProvider {...methods}>
        <Table
          contentIsLoading={isLoading}
          contentIsBeingDeleted={isDeleting}
          toggleModalToDelete={toggleModalToDelete}
          selectTableRowToDelete={selectTableRowToDelete}
          showTableRowInModalView={showTableRowInModalView}
        />
      </FormProvider>
    </section>
  );
}
