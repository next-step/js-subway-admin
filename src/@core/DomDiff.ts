function replaceAttributes (realNode: Element, virtualNode: Element): void {

  for (const { name, value } of [ ...realNode.attributes ]) {
    const virtualAttribute = virtualNode.getAttribute(name);
    if (value === virtualAttribute) continue;
    if (!virtualAttribute) {
      realNode.removeAttribute(name);
      continue;
    }
    realNode.setAttribute(name, virtualAttribute);
  }

  for (const { name, value } of [ ...virtualNode.attributes ]) {
    if (!realNode.getAttribute(name)) {
      realNode.setAttribute(name, value);
    }
  }

}

function applyDomDiffDeep (parentNode: Element, realNode: ChildNode, virtualNode: ChildNode): void {
  if (realNode instanceof Text && virtualNode instanceof Text && realNode.nodeValue !== virtualNode.nodeValue) {
    realNode.nodeValue = virtualNode.nodeValue;
    return;
  }

  if (realNode && !virtualNode) {
    return realNode.remove();
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if ((typeof realNode) !== (typeof virtualNode) || realNode.nodeName !== virtualNode.nodeName) {
    parentNode.removeChild(realNode);
    parentNode.appendChild(virtualNode);
    return;
  }

  if (!(realNode instanceof Text || virtualNode instanceof Text)) {
    replaceAttributes(realNode as Element, virtualNode as Element);
  }

  const realChildren: ChildNode[] = [ ...realNode.childNodes ];
  const virtualChildren: ChildNode[] = [ ...virtualNode.childNodes ];

  Array(Math.max(realChildren.length, virtualChildren.length))
    .fill(0)
    .forEach((v, k) => applyDomDiffDeep(realNode as Element, realChildren[k], virtualChildren[k]));
}

export function applyDomDiff (realNode: Element, virtualNode: Element) {

  const realChildren: ChildNode[] = [ ...realNode.childNodes ];
  const virtualChildren: ChildNode[] = [ ...virtualNode.childNodes ];

  Array(Math.max(realChildren.length, virtualChildren.length))
    .fill(0)
    .forEach((v, k) => applyDomDiffDeep(realNode, realChildren[k], virtualChildren[k]));

}