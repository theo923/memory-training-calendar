import { auth } from 'lib/firebase'

export const remove_cookie = async () => {
  document.cookie =
    'calendar-user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie =
    'calendar-user-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie =
    'calendar-user-name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  
  await auth.signOut()
  
}
