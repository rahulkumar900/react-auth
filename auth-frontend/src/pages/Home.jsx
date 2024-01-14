import ProfilePic from "../components/atoms/profile-pic";
import { useGetAllQuery } from "../slices/userQuery";

export default function Home() {
  const { data, error, isLoading, isFetching } = useGetAllQuery();

  console.log(data, error, isLoading, isFetching);

  return (
    <div className="">
      <h1 className="text-xl font-bold ">Home</h1>
      {true ? (<div>

        <div role="status" className="my-4 animate-pulse flex gap-4 items-center max-w-md ">
          <div className="w-10 h-10 flex-shrink-0 bg-zinc-200 rounded-full">

          </div>
          <div className="space-y-2 block w-full" >
            <div className="h-2.5 w-full bg-zinc-200 rounded-full">
            </div>
            <div className="h-2.5 w-full bg-zinc-200 rounded-full">
            </div>
            <span className="sr-only">Loading ..</span>
          </div>


        </div>
      </div>) :
        (<ul className="space-y-2 my-4">
          {data &&
            data.map((u, i) => {
              return (
                <li key={`${u.name}${i}`} className="flex gap-4 items-center">
                  <ProfilePic
                    className="rounded-full object-cover w-10 h-10"
                    avatar={u.avatar}
                    placeholder="R"
                    userName={u.name.toUpperCase()}
                  />
                  <div>
                    <div className="font-semibold text-lg">{u.name}</div>{" "}
                    <div>{u.email}</div>
                  </div>
                </li>
              );
            })}
        </ul>)
      }
    </div>
  );
}
