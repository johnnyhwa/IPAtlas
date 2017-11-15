class Entity {
  constructor ({
        id = '',
        label = '',
        color = '',
        entityType = '',
        entityName = '',
        root = true,
        ext = null,
        hidden = false,
        selected = true,
        
    }) {
    // id
    this.id = id
    // 节点名称
    this.name = name
    // 节点类型
    this.entityType = entityType
    // 节点对应的图像容器
    this.graphic = graphic
    // 是否为根节点
    this.root = root
  }

  /**
   * @method getGraphic
   * @description 获取图像容器
   * @returns {Object} graphic
   */
  getGraphic () {
    return this.graphic
  }
}

export { Entity }
