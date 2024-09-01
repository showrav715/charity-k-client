

export default function NotFounds({
  message = "",
}: {
  message?: string | undefined | null;
}) {
  if (message) {
    return (
      <div className="container mt-60 mb-120">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">{message}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="d-flex justify-center">
          <img
            className="w-50"
            width={750}
            height={600}
            src={`/assets/images/no-data-found.png`}
            alt="img"
          />
        </div>
      </>
    );
  }
}
