import ProfilePic from "../components/atoms/profile-pic";
import Grid from "../components/molecules/grid";
import FilterComponent from "../components/molecules/filterComponent";
import { useGetAllroomsQuery } from "../slices/roomQuery";
import { useGetAllQuery } from "../slices/userQuery";

export default function Home() {
  // const { data : allUsers, error : allUserError, isLoading : allUserLoading, isFetching: allUserFetching } = useGetAllQuery();
  const {
    data: allRooms,
    error: allRoomError,
    isLoading: allRoomLoading,
  } = useGetAllroomsQuery();
  console.log(allRoomLoading);

  /** Filter Options  
   * @Object Single Room
   * @Array 
   * @keys ["title","price","rating","etc"]
  */

  const roomKeys = !allRoomLoading && Object.keys(allRooms.data[0]);
  const desiredKeys = ["price", "rating", "type"];






  return (
    <div className="w-full">
      <div className="flex">
        <div className="filter-aside p-4 w-96 ">
          <h2 className="font-bold">Filter By</h2>
          {

            !allRoomLoading && <FilterComponent allFilterKeys={roomKeys} selectedFilterKeys={desiredKeys} className="uppercase font-semibold text-xs" />
          }
        </div>
        {!allRoomLoading && <Grid data={allRooms.data} />}
      </div>
    </div>
  );
}
