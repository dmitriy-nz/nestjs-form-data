import parsePath from './parse-path'
import setValue from './set-value'

export default function appendField (store, key, value) {
  const steps = parsePath(key)

  steps.reduce((context, step) => {
    return setValue(context, step, context[step.key], value)
  }, store)
}