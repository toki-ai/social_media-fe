import React, { useEffect, useState } from 'react'
import paymentApi from '../api/paymentApi'
const BookingConfirm: React.FC = () => {
  interface TransactionInfo {
    status: string
    message: string
    data: string
  }

  const [transactionInfo, setTransactionInfo] =
    useState<TransactionInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactionInfo = async () => {
      const searchParams = new URLSearchParams(window.location.search)
      const vnp_Amount: string | null = searchParams.get('vnp_Amount')
      const vnp_BankCode: string | null = searchParams.get('vnp_BankCode')
      const vnp_OrderInfo: string | null = searchParams.get('vnp_OrderInfo')
      const vnp_ResponseCode: string | null =
        searchParams.get('vnp_ResponseCode')
      if (
        (!vnp_Amount && !vnp_BankCode) ||
        !vnp_OrderInfo ||
        !vnp_ResponseCode
      ) {
        setError('Missing required query parameters.')
        setLoading(false)
      } else {
        try {
          const response = await paymentApi.getPaymentInfo(
            vnp_Amount,
            vnp_BankCode,
            vnp_OrderInfo,
            vnp_ResponseCode
          )
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          const data = await response.json()
          setTransactionInfo(data)
        } catch (error) {
          setError('Failed to fetch transaction information.')
          console.error('Error fetching transaction info:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchTransactionInfo()
  }, [])

  if (loading) {
    return <div>Loading transaction information...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      {transactionInfo ? (
        <div>
          <h2>Transaction Information</h2>
          <p>Message: {transactionInfo.message}</p>
          <p>Status: {transactionInfo.status}</p>
          <p>data: {transactionInfo.data}</p>
        </div>
      ) : (
        <div>
          <div>No transaction information found.</div>
        </div>
      )}
    </div>
  )
}

export default BookingConfirm
