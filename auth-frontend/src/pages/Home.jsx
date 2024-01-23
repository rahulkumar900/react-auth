import ProfilePic from "../components/atoms/profile-pic";
import Grid from "../components/molecules/grid";
import { useGetAllroomsQuery } from "../slices/roomQuery";
import { useGetAllQuery } from "../slices/userQuery";

export default function Home() {
  // const { data : allUsers, error : allUserError, isLoading : allUserLoading, isFetching: allUserFetching } = useGetAllQuery();
  const {
    data: allRooms,
    error: allRoomError,
    isLoading: allRoomLoading,
  } = useGetAllroomsQuery();

  return (
    <div className="w-full">
      <h1 className="text-xl uppercase font-bold mb-4">Home</h1>
      {allRooms && <Grid data={allRooms.data} />}
    </div>
  );
}
