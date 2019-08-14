/**
 * 上传图片
 */
const imgUploader = () => {
  let fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.style.display = 'none'
  document.body.appendChild(fileInput)

  fileInput.click()
  return new Promise((resolve, reject) => {
    fileInput.addEventListener('change', () => {
      // 检查文件是否选择:
      if (!fileInput.value) {
        const err = new Error()
        err.msg = '没有选择文件'
        reject(err)
      }
      const img = fileInput.files[0]
      var size = img.size
      // 判断文件大小
      if (size >= 10 * 1024 * 1024) {
        const err = new Error()
        err.msg = '文件大于10兆'
        reject(err)
      }
      // 判断类型
      if (img.type !== 'image/jpeg' && img.type !== 'image/png' && img.type !== 'image/gif') {
        const err = new Error()
        err.msg = '不是有效的图片文件'
        reject(err)
      }
      const reader = new FileReader()
      let base
      reader.onload = (e) => {
        base = e.target.result

        if (!base) {
          const err = new Error()
          err.msg = '获取预览失败'
          reject(err)
        }
        resolve({
          file: img,
          base64: base
        })
      }
      reader.readAsDataURL(img)

      fileInput.parentElement.removeChild(fileInput)
    })
  })
}

export default {
  imgUploader
}
