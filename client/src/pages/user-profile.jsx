import { useHeadTags } from "../hooks/use-head-tags";
import { useNavigate } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
} from "../redux/api/users-api-slice";
import { useSelector } from "react-redux";
import { useGetAllTvseriesQuery } from "../redux/api/tvseries-api-slice";
import { useResetApiAndUser } from "../hooks/use-reset-api-and-user";
import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader/loader";
import ModalDelete from "../components/modal-delete/modal-delete";
import UserProfileTable from "../components/user-profile-table/user-profile-table";
import UserProfileParagraph from "../components/user-profile-paragraph/user-profile-paragraph";
import UserProfileButtonLinksContainer from "../components/user-profile-button-links-container/user-profile-button-links-container";

export default function UserProfile() {
  const navigate = useNavigate();
  const resetAll = useResetApiAndUser();
  const user = useSelector((state) => state.auth.user);
  const {
    data,
    isLoading: isFetchingUserData,
    error,
  } = useGetUserProfileQuery();
  const { data: tvseries, isLoading: isFetchingTvseries } =
    useGetAllTvseriesQuery();
  const [deleteUserProfile, { isLoading: isDeletingUser }] =
    useDeleteUserProfileMutation();

  if (error) {
    resetAll();
    navigate("/login", { replace: true });
    toast.error("Token has expired. Log in again");
  }

  useHeadTags("userProfile", user);

  /* modal delete starts */
  const modalDeleteRef = useRef(null);

  const toggleModalToDelete = useCallback(() => {
    const modalClasses = modalDeleteRef?.current.classList;
    modalClasses.toggle("modalDeleteHidden");
  }, [modalDeleteRef]);

  const handleDeleteUserProfile = useCallback(async (user) => {
    try {
      const res = await deleteUserProfile(user).unwrap();
      if (res.message) {
        toast.success(res.message);
        resetAll();
      }
    } catch (err) {
      if (err.data.type === "token") {
        resetAll();
        return;
      }
      toast.error(err.data.message);
    }
  }, []);
  /* modal delete ends */

  return (
    <section>
      {isFetchingUserData || isDeletingUser || isFetchingTvseries ? (
        <Loader />
      ) : (
        <>
          <ModalDelete
            isUser={true}
            numberOfTvseriesOfUser={!tvseries?.body ? 0 : tvseries.body.length}
            nameOfItemToDelete={data?.body.name}
            modalDeleteRef={modalDeleteRef}
            toggleModalToDelete={toggleModalToDelete}
            confirm={() => handleDeleteUserProfile(data?.body)}
          />
          <UserProfileTable
            userData={{
              name: data?.body.name,
              email: data?.body.email,
              tvseries: !tvseries?.body ? 0 : tvseries.body.length,
            }}
          />
          <UserProfileParagraph />
          <UserProfileButtonLinksContainer
            toggleModalToDelete={toggleModalToDelete}
          />
        </>
      )}
    </section>
  );
}
