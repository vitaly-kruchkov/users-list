import styles from "./UserCard.module.css";
import type { User } from "../../types/user";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <h3>
            {user.firstName} {user.lastName}
          </h3>

          <span className={`${styles.role} ${styles[`role_${user.role}`]}`}>
            {user.role}
          </span>
        </div>

        <p className={styles.subtitle}>
          {user.company.title} - {user.company.name}
        </p>

        <p className={styles.location}>
          {user.address.city}, {user.address.country}
        </p>

        <div className={styles.contacts}>
          <a href={`mailto:${user.email}`} className={styles.email}>
            {user.email}
          </a>

          <a href={`tel:${user.phone}`} className={styles.phone}>
            {user.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
