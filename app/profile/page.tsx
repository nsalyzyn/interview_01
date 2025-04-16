import styles from "/app/page.module.css";
import { getUser } from '@/app/actions/auth'

export default async function Home() {
  const userData = await getUser()
  if (!userData.success) {
    return (
      <div className={styles.page}>
        <h1>401</h1>
        <div>
          {userData.message}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <main>
        TODO: Company info
        TODO: Data section
      </main>
    </div>
  );
}
