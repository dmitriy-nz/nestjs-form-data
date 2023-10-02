const reFirstKey = /^[^[]*/
const reDigitPath = /^\[(\d+)\]/
const reNormalPath = /^\[([^\]]+)\]/

export default function parsePath (key) {
  function failure () {
    return [{ type: 'object', key, last: true }]
  }

  const firstKey = reFirstKey.exec(key)[0]
  if (!firstKey) return failure()

  const len = key.length
  let pos = firstKey.length
  let tail:any = { type: 'object', key: firstKey }
  const steps = [tail]

  while (pos < len) {
    let m

    if (key[pos] === '[' && key[pos + 1] === ']') {
      pos += 2
      tail.append = true
      if (pos !== len) return failure()
      continue
    }

    m = reDigitPath.exec(key.substring(pos))
    if (m !== null) {
      pos += m[0].length
      tail.nextType = 'array'
      tail = { type: 'array', key: parseInt(m[1], 10) }
      steps.push(tail)
      continue
    }

    m = reNormalPath.exec(key.substring(pos))
    if (m !== null) {
      pos += m[0].length
      tail.nextType = 'object'
      tail = { type: 'object', key: m[1] }
      steps.push(tail)
      continue
    }

    return failure()
  }

  tail.last = true
  return steps
}