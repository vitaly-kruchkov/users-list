import { useEffect, useState } from "react";
import { getUsers, searchUsers } from "@api/userApi";
import type { User } from "@models/user";
import useDebounce from "@hooks/useDebounce";

const LIMIT = 10;

export const useUsers = (initialQuery: string, initialPage: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>((initialPage - 1) * LIMIT);
  const [query, setQuery] = useState<string>(initialQuery);
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

        if (!controller.signal.aborted) {
          setUsers(users);
          setTotal(total);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "CanceledError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
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
