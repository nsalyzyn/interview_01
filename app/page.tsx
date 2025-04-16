'use client'

import styles from "./page.module.css";
import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function Home() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className={styles.page}>
      <form action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" defaultValue={state?.data?.email} />
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit" disabled={pending}>Login</button>
        {state?.message && (
          <div className={styles.error}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}