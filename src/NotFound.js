import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div>Page not found</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to home page
      </button>
    </>
  );
}
