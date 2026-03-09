import { useEffect, useState } from "react";
import { getUsers, searchUsers } from "@api/userApi";
import type { User } from "@models/user";
import useDebounce from "@hooks/useDebounce";

const LIMIT = 10;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);

      try {
        const { users, total } = debouncedQuery
          ? await searchUsers(debouncedQuery, LIMIT, skip, controller.signal)
          : await getUsers(LIMIT, skip, controller.signal);
        setUsers(users);
        setTotal(total);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "CanceledError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [skip, debouncedQuery]);

  return {
    users,
    total,
    skip,
    setSkip,
    query,
    setQuery,
    loading,
    limit: LIMIT,
    error,
  };
};
