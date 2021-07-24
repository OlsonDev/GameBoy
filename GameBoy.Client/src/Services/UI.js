const newPlacement = ({ top, bottom, left, right, width, height}) => ({
  top: top ?? null,
  bottom: bottom ?? null,
  left: left ?? null,
  right: right ?? null,
  width: width ?? null,
  height: height ?? null
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
  return styles.length
    ? styles.join(';')
    : null
}

export default {
  newPlacement,
  placementStyle,
}
