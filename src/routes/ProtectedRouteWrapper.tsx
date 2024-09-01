import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../../src/store/index";

export default function ProtectedRouteWrapper() {
  const { token } = useStore();
  return token ? <Outlet /> : <Navigate to="/login" />;
}
