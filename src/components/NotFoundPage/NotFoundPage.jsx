import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleRedirect}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
