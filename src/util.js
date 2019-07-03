/**
 * 上传图片
 */
const imgUploader = () => {
  console.log('img')

  let fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.style.display = 'none'
  document.body.appendChild(fileInput)

  fileInput.click()
  return new Promise((resolve, reject) => {
    fileInput.addEventListener('change', () => {
      // 检查文件是否选择:
      if (!fileInput.value) {
        reject(new Error('没有选择文件'))
      }
      const img = fileInput.files[0]
      var size = img.size
      // 判断文件大小
      if (size >= 2 * 1024 * 1024) {
        reject(new Error('文件大于2兆'))
      }
      // 判断类型
      if (img.type !== 'image/jpeg' && img.type !== 'image/png' && img.type !== 'image/gif') {
        reject(new Error('不是有效的图片文件'))
      }
      const reader = new FileReader()
      let base
      reader.onload = (e) => {
        base = e.target.result

        if (!base) reject(new Error('获取预览失败'))
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
