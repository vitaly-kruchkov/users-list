import { useEffect, useState } from "react";
import { getUsers, searchUsers } from "../api/userApi";
import type { User } from "../types/user";
import useDebounce from "../hooks/useDebounce";

const LIMIT = 10;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);

      try {
        const data = debouncedQuery
          ? await searchUsers(debouncedQuery, LIMIT, skip, controller.signal)
          : await getUsers(LIMIT, skip, controller.signal);

        setUsers(data.users);
        setTotal(data.total);
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
