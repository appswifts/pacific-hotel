export function isReactComponent(value) {
  return typeof value === "function" && value.prototype?.isReactComponent !== undefined;
}
