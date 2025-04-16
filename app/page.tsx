import styles from "./page.module.css";
import { signup } from '@/app/actions/auth'

export default function Home() {
  return (
    <div className={styles.page}>
      <form action={signup}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}