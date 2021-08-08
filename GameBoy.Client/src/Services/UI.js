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

const px = n => n ? `${n}px` : '0';
const push = (styles, placement, key) => styles.push(`${key}: ${px(placement[key])}`);

const placementStyle = (placement) => {
  const p = placement
  if (p == null) return null
  const styles = []
  if (p.top != null) push(styles, p, 'top')
  if (p.bottom != null) push(styles, p, 'bottom')
  if (p.left != null) push(styles, p, 'left')
  if (p.right != null) push(styles, p, 'right')
  if (p.width != null) push(styles, p, 'width')
  if (p.height != null) push(styles, p, 'height')
  if (p.translateX || p.translateY) styles.push(`transform: translate(${px(p.translateX)}, ${px(p.translateY)})`)
  return styles.length
    ? styles.join('; ')
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

const normalize = (placement, container) => {
  const p = placement
  const c = container
  const left = p.left == null
    ? c.left + c.width - p.right - p.width + p.translateX
    : c.left + p.left + p.translateX
  const top = p.top == null
    ? c.top + c.height - p.bottom - p.height + p.translateY
    : c.top + p.top + p.translateY
  const width = p.width ?? c.width - (p.left ?? 0) - (p.right ?? 0)
  const height = p.height ?? c.height - (p.top ?? 0) - (p.bottom ?? 0)
  return newPlacement({ left, top, width, height })
}

export default {
  newPlacement,
  placementStyle,
  makeFloatingPlacement,
  isFloatingPlacement,
  getPlacementResizeEdges,
  normalize,
}
