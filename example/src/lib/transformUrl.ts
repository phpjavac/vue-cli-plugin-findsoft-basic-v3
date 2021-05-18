/* eslint-disable import/prefer-default-export */
function transformSpace(url: string): string {
  return url.replace(/\s/g, encodeURIComponent(' '));
}

export { transformSpace };
