export function cleanUp(obj: any, filter: Array<any> = [undefined, '']): void {
  for (const attrKey in obj) {
    const attrValue = obj[attrKey];
    if (filter.some((v) => v === attrValue)) {
      delete obj[attrKey];
    } else if (
      Object.prototype.toString.call(attrValue) === '[object Object]'
    ) {
      cleanUp(attrValue);
    } else if (Array.isArray(attrValue)) {
      attrValue.forEach(function (arrayValue) {
        cleanUp(arrayValue);
      });
    }
  }
}
