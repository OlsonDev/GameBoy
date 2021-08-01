const newPlacement = ({ top, bottom, left, right, width, height, translateX, translateY}) => ({
  top: top ?? null,
  bottom: bottom ?? null,
  left: left ?? null,
  right: right ?? null,
  width: width ?? null,
  height: height ?? null,
  translateX: translateX ?? 0,
  translateY: translateY ?? 0,
})

const px = n => `${n}px`;

const placementStyle = (placement) => {
  const p = placement
  if (p == null) return null
  const styles = []
  if (p.top != null) styles.push(`top: ${px(p.top)}`)
  if (p.bottom != null) styles.push(`bottom: ${px(p.bottom)}`)
  if (p.left != null) styles.push(`left: ${px(p.left)}`)
  if (p.right != null) styles.push(`right: ${px(p.right)}`)
  if (p.width != null) styles.push(`width: ${px(p.width)}`)
  if (p.height != null) styles.push(`height: ${px(p.height)}`)
  if (p.translateX || p.translateY) styles.push(`transform: translate(${px(p.translateX)}, ${px(p.translateY)})`)
  return styles.length
    ? styles.join(';')
    : null
}

const makeFloatingPlacement = (placement, elem) => {
  const p = placement
  if (isFloatingPlacement(p)) return
  p.width = elem.offsetWidth
  p.height = elem.offsetHeight
  p.top = 0
  p.bottom = null
  p.left = 0
  p.right = null
  p.translateX = elem.offsetLeft
  p.translateY = elem.offsetTop
}

const isFloatingPlacement = (placement) => {
  const p = placement
  return p.top === 0 && p.left === 0 && p.bottom === null && p.right === null
}

const getPlacementResizeEdges = (placement) => {
  const edges = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  }
  const p = placement
  if (isFloatingPlacement(p)) return edges
  edges.top = p.top == null && !p.bottom || !!p.top
  edges.bottom = p.bottom == null && !p.top || !!p.bottom
  edges.left = p.left == null && !p.right || !!p.left
  edges.right = p.right == null && !p.left || !!p.right
  return edges
}

export default {
  newPlacement,
  placementStyle,
  makeFloatingPlacement,
  isFloatingPlacement,
  getPlacementResizeEdges,
}
