import React from 'react'
import { Result } from 'antd'
import './ResultErr.scss'

function ResultErr({ error }) {
  return <Result status="error" title="Ошибка загрузки" subTitle={error} />
}
export default ResultErr
