import styles from "/app/page.module.css";
import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const userData = await getUser()
  // TODO: Return 401 when supported by NextJS (See https://github.com/vercel/next.js/discussions/49302)
  if (!userData.success) {
    redirect('/')
    // return (
    //   <div className={styles.page}>
    //     <h1>401</h1>
    //     <div>
    //       {userData.message}
    //     </div>
    //   </div>
    // )
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
