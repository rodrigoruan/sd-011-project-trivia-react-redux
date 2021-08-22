// https://stackoverflow.com/questions/9244824/how-to-remove-quot-from-my-json-in-javascript/39619252
export function decodeHtml(html) {
  const areaElement = document.createElement('textarea');
  areaElement.innerHTML = html;

  return areaElement.value;
}

export function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}
