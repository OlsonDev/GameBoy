const newPlacement = ({ top, bottom, left, right, width, height, transformX, transformY}) => ({
  top: top ?? null,
  bottom: bottom ?? null,
  left: left ?? null,
  right: right ?? null,
  width: width ?? null,
  height: height ?? null,
  transformX: transformX ?? 0,
  transformY: transformY ?? 0,
})

const placementStyle = (placement) => {
  const p = placement
  if (p == null) return null
  const styles = []
  if (p.top != null) styles.push(`top: ${p.top}`)
  if (p.bottom != null) styles.push(`bottom: ${p.bottom}`)
  if (p.left != null) styles.push(`left: ${p.left}`)
  if (p.right != null) styles.push(`right: ${p.right}`)
  if (p.width != null) styles.push(`width: ${p.width}`)
  if (p.height != null) styles.push(`height: ${p.height}`)
  if (p.transformX || p.transformY) styles.push(`transform: translate(${p.transformX}px, ${p.transformY}px)`)
  return styles.length
    ? styles.join(';')
    : null
}

const makeFloatingPlacement = (placement, elem) => {
  const p = placement
  if (isFloatingPlacement(p)) return
  p.width = `${elem.offsetWidth}px`
  p.height = `${elem.offsetHeight}px`
  p.top = 0
  p.bottom = null
  p.left = 0
  p.right = null
  p.transformX = elem.offsetLeft
  p.transformY = elem.offsetTop
}

const isFloatingPlacement = (placement) => {
  const p = placement
  return p.top === 0 && p.left === 0 && p.bottom === null && p.right === null
}

const edges = (top, bottom, left, right) => ({ top, bottom, left, right })

const getPlacementResizeEdges = (placement) => {
  const edges = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  }
  const p = placement
  if (isFloatingPlacement(p)) return edges
  edges.top = !p.bottom
  edges.bottom = !p.top
  edges.left = !p.right
  edges.right = !p.left
  return edges
}

export default {
  newPlacement,
  placementStyle,
  makeFloatingPlacement,
  isFloatingPlacement,
  getPlacementResizeEdges,
}
