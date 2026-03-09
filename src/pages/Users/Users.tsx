import Pagination from "@components/Pagination/Pagination";
import Skeleton from "@components/Skeleton/Skeleton";
import UserCard from "@components/UserCard/UserCard";
import Input from "@components/Input/Input";
import { useUsers } from "@hooks/useUsers";
import styles from "./Users.module.css";

const UsersPage = () => {
  const {
    users,
    total,
    skip,
    setSkip,
    query,
    setQuery,
    loading,
    limit,
    error,
  } = useUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>

      <div className={styles.searchWrapper}>
        <Input
          className={styles.search}
          type="text"
          placeholder="Search users..."
          aria-label="Search users"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSkip(0);
          }}
        />

        {query && (
          <button
            type="button"
            className={styles.clearSearch}
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setSkip(0);
            }}>
            x
          </button>
        )}
      </div>

      {loading && (
        <div className={styles.list}>
          {Array.from({ length: limit }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className={styles.empty}>No users found</div>
      )}

      {!loading && !error && users.length > 0 && (
        <>
          <div className={styles.list}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination
            total={total}
            limit={limit}
            skip={skip}
            onChange={setSkip}
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;
