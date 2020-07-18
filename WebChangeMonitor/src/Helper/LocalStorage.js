const localNames = {
  Domain: "domain",
  User: "authUser",
};
export function setDomain(domain) {
  setItem(localNames.Domain, domain);
}

export function getDomain() {
  return getItem(localNames.Domain);
}

export function setUser(user) {
  setItem(localNames.User, { user, time: Date.now() });
}

export function getUser() {
  let user = getItem(localNames.User);
  if (user === undefined) return null;
  else if ((Date.now() - user.time) / (60 * 60 * 24) > 1) return null;
  else return user.user;
}

function setItem(localname, value) {
  window.localStorage.setItem(localname, JSON.stringify(value));
}
function getItem(localname) {
  return JSON.parse(window.localStorage.getItem(localname));
}
