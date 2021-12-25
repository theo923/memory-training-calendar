export const remove_cookie = () => {
  document.cookie = 'calendar-user-token' + '=; Max-Age=-99999999;'
}
