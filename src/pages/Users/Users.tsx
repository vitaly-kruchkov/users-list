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

  const from = total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + limit, total);
  const isShowSummary = !loading && !error && total > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Users</h1>

      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSkip(0);
        }}
        showClear={Boolean(query)}
        onClear={() => {
          setQuery("");
          setSkip(0);
        }}
      />

      {isShowSummary && (
        <div className={styles.summary}>
          Showing <b>{from}</b>–<b>{to}</b> of <b>{total}</b> users
        </div>
      )}

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
