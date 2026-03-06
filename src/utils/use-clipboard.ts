const isSupported = () => Boolean(navigator && 'clipboard' in navigator)

const copy = async (value: string) => {
  if (isSupported() && value != null) {
    await navigator!.clipboard.writeText(value)
    return true
  }
  return false
}

const read = async () => {
  if (isSupported()) {
    let value = await navigator!.clipboard.readText()
    return value
  }
  return ''
}

export const useClipboard = () => {
  return {
    copy,
    read,
  }
}
