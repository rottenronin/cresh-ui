export const convertJpegToJpg = (file: File) => {
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _,
    fileName,
    extension,
  ] = file.name.match(/^(.+)\.([^.]+)$/) || [null, null, null]

  if (!extension) throw new Error(`file name ${file.name} is invalid`)

  if (extension === 'jpeg' || file.type === 'image/jpeg') {
    return new File(
      [file],
      `${fileName}.jpg`,
      { type: 'image/jpg' },
    )
  }
  return file
}

export function downloadURI (uri: string, name: string) {
  // Construct the 'a' element
  const link = document.createElement('a')
  link.download = name
  link.target = '_blank'
  // Construct the URI
  link.href = uri
  document.body.appendChild(link)
  link.click()
  // Cleanup the DOM
  document.body.removeChild(link)
}

export default {
  convertJpegToJpg,
  downloadURI,
}
