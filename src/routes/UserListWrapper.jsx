// UserListWrapper.jsx
import { useAuth } from "../context/AuthContext";
import UserList from "../pages/Userlist";
import UserListAdmin from "../pages/UserListAdmin";
import UserListBasic from "../pages/UserListBasic";

const UserListWrapper = () => {
  const auth = useAuth();

  if (auth.role === "admin") return <UserList />;
  return <UserListBasic />;
};

export default UserListWrapper;
