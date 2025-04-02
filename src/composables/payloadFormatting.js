export function usePayloadFormatting() {
  function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  function processPayload(payload) {
    var newPayload = {};

    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const element = payload[key];
        newPayload[camelToSnake(key)] = element;
      }
    }

    return newPayload;
  }

  return { processPayload };
}
