import { useRouteError } from "react-router-dom";

export default function errorPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="h-screen flex flex-col justify-center items-center space-y-4"
    >
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
