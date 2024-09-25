const cloud_name: string = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string
const upload_preset: string = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET as string

export const uploadMedia = async (
  pics: File | null,
  fileType: string
): Promise<any> => {
  if (pics && fileType) {
    const data = new FormData()
    data.append('file', pics)
    data.append('upload_preset', upload_preset)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: 'POST',
        body: data,
      }
    )

    if (!res.ok) {
      throw new Error('Failed to upload image')
    }
    console.log('res:', res)
    const fileData = await res.json()
    console.log('fileData:', fileData.url)
    return fileData.url
  } else {
    console.log('No image or fileType provided')
    return null
  }
}
