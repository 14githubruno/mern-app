import {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} from "../redux/api/users-api-slice";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../redux/features/auth/auth-slice";
import { resetTvseries } from "../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../redux/api/api-slice";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader/loader";
import ModalDelete from "../components/modal-delete/modal-delete";
import UserProfileTable from "../components/user-profile-table/user-profile-table";
import UserProfileParagraph from "../components/user-profile-paragraph/user-profile-paragraph";
import UserProfileButtonLinkContainer from "../components/user-profile-button-link-container/user-profile-button-link-container";

export default function UserProfile() {
  const dispatch = useDispatch();
  const tvseries = useSelector((state) => state.tvseries.tvseries);
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
    <section>
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
          <UserProfileTable
            data={{
              name: data?.body.name,
              email: data?.body.email,
              tvseries: tvseries.length,
            }}
          />
          <UserProfileParagraph />
          <UserProfileButtonLinkContainer
            toggleModalToDelete={toggleModalToDelete}
          />
        </>
      )}
    </section>
  );
}
