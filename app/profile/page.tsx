import styles from "/app/page.module.css";
import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { InvoiceCalculator } from './invoice'

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
      <div>
        <dl>
          <dt>Name</dt>
          <dd>{userData.user?.full_name}</dd>
          <dt>Email</dt>
          <dd>{userData.user?.email}</dd>
          <dt>Company name</dt>
          <dd>{userData.user?.Company?.name}</dd>
          <dt>Expected activity</dt>
          <dd>{userData.user?.Company?.expected_activity}</dd>
        </dl>
      </div>
      <hr/>
      <div>
        <InvoiceCalculator />
      </div>
    </div>
  );
}
