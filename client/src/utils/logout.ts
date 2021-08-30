export const logout = (): void => {
  if (localStorage.getItem("jid")) {
    localStorage.removeItem("jid");
  }
};
