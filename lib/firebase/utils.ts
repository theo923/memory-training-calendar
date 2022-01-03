export const getRecipientEmail = (users: string[], currentUser: string) =>
  users?.filter((recipientUser: string) => recipientUser !== currentUser)[0]
