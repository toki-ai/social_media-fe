import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import paymentApi from '../api/paymentApi'

const PaymentPage: React.FC = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      const response = await paymentApi.getPaymentUrl();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = response.json()
      setPaymentUrl(data.url)
    } catch (error) {
      console.error('Error during payment:', error)
    }
  }

  return (
    <section>
      <div>
        <button onClick={handlePayment}>Pay Now</button>
        {paymentUrl && <QRCodeSVG value={paymentUrl} />}
      </div>
    </section>
  )
}

export default PaymentPage
