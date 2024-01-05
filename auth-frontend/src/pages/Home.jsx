import { useGetAllQuery } from "../slices/userQuery";

export default function Home() {
  const { data, error, isLoading, isFetching } = useGetAllQuery();

  console.log(data, error, isLoading, isFetching);

  return (
    <div className="">
      <h1 className="text-4xl ">Home</h1>
      <ul>
        {data &&
          data.map((u) => {
            return <li>{u.name}</li>;
          })}
      </ul>
    </div>
  );
}
