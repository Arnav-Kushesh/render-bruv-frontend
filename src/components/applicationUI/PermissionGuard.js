import PermissionDeniedPage from "../../components/customUiForCs/PermissionDeniedPage";

export default function PermissionGuard({ permissionName, action, children }) {
  let user = window.loggedInUser;

  if (!user) return <PermissionDeniedPage />;

  if (user.isSuperAdmin) return children;

  if (!user.role) return <PermissionDeniedPage />;

  if (!user.role[permissionName]) return <PermissionDeniedPage />;

  if (!user.role[permissionName].includes(action))
    return <PermissionDeniedPage />;

  return children;
}
