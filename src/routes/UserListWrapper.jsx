import { useAuth } from "../context/AuthContext";
import UserList from "../pages/Userlist";
import UserListAdmin from "../pages/UserListAdmin";

const UserListWrapper = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <UserListAdmin />;
  return <UserList />;
};

export default UserListWrapper;
