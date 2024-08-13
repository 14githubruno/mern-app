import {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} from "../redux/api/users-api-slice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/loader/loader";
import ModalDelete from "../components/modal-delete/modal-delete";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserProfileQuery();
  const [deleteUserProfile, { isLoading: isDeleting }] =
    useDeleteUserProfileMutation();

  /* modal delete starts */
  const modalDeleteRef = useRef(null);
  const toggleModalToDelete = useCallback(() => {
    const modal_classes = modalDeleteRef?.current.classList;
    if (modal_classes.contains("modalDeleteHidden")) {
      modal_classes.remove("modalDeleteHidden");
    } else {
      modal_classes.add("modalDeleteHidden");
    }
  }, [modalDeleteRef]);

  const handleDeleteUserProfile = useCallback(async (user) => {
    try {
      const res = await deleteUserProfile(user).unwrap();
      if (res.message) {
        toast.success(res.message);
        dispatch(clearCredentials());
        dispatch(resetTvseries());
        dispatch(apiSlice.util.resetApiState());
      }
    } catch (err) {
      toast.error(err.data.message);
    }
  }, []);
  /* modal delete ends */

  return (
    <section style={{ color: "whitesmoke" }}>
      {isLoading || isDeleting ? (
        <Loader />
      ) : (
        <>
          <ModalDelete
            question={`Sure you want to delete your account, ${data?.body.name}?`}
            modalDeleteRef={modalDeleteRef}
            toggleModalToDelete={toggleModalToDelete}
            confirm={() => handleDeleteUserProfile(data?.body)}
          />
          <p>{data.body.name}</p>
          <p>{data.body.email}</p>
          <button onClick={toggleModalToDelete}>Delete user</button>
          <Link to={"/profile/update-user"}>update user</Link>
        </>
      )}
    </section>
  );
}
