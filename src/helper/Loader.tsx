
function Loader({ status }: { status: boolean }) {
  if (!status) return null;

  return (
    <span className="custom-spinner" role="status" aria-hidden="true"></span>
  );
}

export default Loader;
