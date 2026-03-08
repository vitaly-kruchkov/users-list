import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";
import type { User } from "../../types/user";

const LIMIT = 10;

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(LIMIT, skip);
      setUsers(data.users);
    };

    fetchUsers();
  }, [skip]);

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
