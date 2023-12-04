
const convertPrice = (price) => {
    try {
      const result = price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND',})
      return result
    } catch (error) {
      return null
    }
  }

  module.exports = {
    convertPrice
  }