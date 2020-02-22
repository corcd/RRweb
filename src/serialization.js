/**
 * DOM序列化
 */
serialization(parent) {
    let element = this.parseElement(parent);
    if (parent.children.length == 0) {
      parent.textContent && (element.textContent = parent.textContent);
      return element;
    }
    Array.from(parent.children, child => {
      element.children.push(this.serialization(child));
    });
    return element;
  },
  /**
   * 将元素解析成可序列化的对象
   */
  parseElement(element, id) {
    let attributes = {};
    for (const {
        name,
        value
      } of Array.from(element.attributes)) {
      attributes[name] = value;
    }
    if (!id) { //解析新元素才做映射
      id = this.getID();
      this.idMap.set(element, id); //元素为键，ID为值
    }
    return {
      children: [],
      id: id,
      tagName: element.tagName.toLowerCase(),
      attributes: attributes
    };
  }
/**
 * 唯一标识
 */
getID() {
  return this.id++;
}