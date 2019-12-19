export const closestNode = function (element, dataAttribute) {
  while (element.getAttribute("data-type") !== dataAttribute) {
    element = element.parentNode;
  }
  return element;
}

export const childNode = function (element, dataAttribute) {
  const getChildNode = element.querySelector(`[data-type = ${dataAttribute}]`);
  return getChildNode;
}