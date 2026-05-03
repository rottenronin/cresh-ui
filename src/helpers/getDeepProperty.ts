export default function getDeepProperty(
  obj: {[key: string]: unknown},
  propstr: string,
) {
  const prop = propstr.split('.')
  for (let i = 0; i < prop.length; i += 1) {
    if (typeof obj === 'object') {
       
      obj = obj[prop[i]] as { [key: string]: unknown }
    }
  }
  return obj
}
