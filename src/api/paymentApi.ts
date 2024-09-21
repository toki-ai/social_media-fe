import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const paymentApi = {
  getPaymentUrl: async () => {
    const response = await axios.get(baseURL + 'pod/payment/url')
    return response.data
  },
  getPaymentInfo: async (
    vnp_Amount: string | null,
    vnp_BankCode: string | null,
    vnp_OrderInfo: string | null,
    vnp_ResponseCode: string | null
  ) => {
    const response = await axios.get(
      baseURL +
        `/pod/payment/infor?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_ResponseCode=${vnp_ResponseCode}`
    )
    return response.data
  },
}

export default paymentApi
