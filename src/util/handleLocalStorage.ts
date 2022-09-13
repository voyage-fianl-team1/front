export function getItemFromLS(key: string) {
  return window.localStorage.getItem(key);
}

export function setItemToLS(key: string, value: any) {
  window.localStorage.setItem(key, value);
}

export function removeItemFromLS(key: string) {
  window.localStorage.removeItem(key);
}
