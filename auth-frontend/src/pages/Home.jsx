import ProfilePic from "../components/atoms/profile-pic";
import { useGetAllQuery } from "../slices/userQuery";

export default function Home() {
  const { data, error, isLoading, isFetching } = useGetAllQuery();

  console.log(data, error, isLoading, isFetching);

  return (
    <div className="w-full">
      <h1 className="text-xl uppercase font-bold ">Home</h1>

      <ul className="space-y-2 my-4">
        {data &&
          data.map((u, i) => {
            return (
              <li key={`${u.name}${i}`} className="flex gap-4 items-center">
                <ProfilePic
                  className="rounded-full w-10 h-10 object-cover"
                  avatar={u.avatar}
                  placeholder="R"
                  profileName={u.name}
                />
                <div>
                  <div className="font-semibold text-lg">{u.name}</div>{" "}
                  <div className="text-gray-600">{u.email}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
