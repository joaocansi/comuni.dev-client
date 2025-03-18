export function queryParamUrl(url = "", params: any) {
  let newUrl = url;
  let isFirstParam = true;

  for (const key of Object.keys(params)) {
    if (params[key]) {
      if (isFirstParam) {
        newUrl = newUrl.concat(`${key}=${params[key]}`);
        isFirstParam = false;
      } else {
        newUrl = newUrl.concat(`&${key}=${params[key]}`);
      }
    }
  }

  return newUrl;
}
