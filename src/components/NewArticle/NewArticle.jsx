// eslint-disable-next-line object-curly-newline
import { Button, Col, Form, Input } from 'antd'
import { useState } from 'react'

import style from './NewArticle.module.scss'

function NewArticle() {
  const { TextArea } = Input
  const [inputValues, setInputValues] = useState([])

  const handleAddInput = () => {
    setInputValues([...inputValues, ''])
  }
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }
  const handleDeleteInput = (index) => {
    const newInputValues = [...inputValues]
    newInputValues.splice(index, 1)
    setInputValues(newInputValues)
  }

  const onFinish = (values) => {
    console.log('Received values:', values)
  }

  return (
    <Form className={style.form} onFinish={onFinish}>
      <h1 className={style.title}>Create new article</h1>
      <Col>
        <span className={style.span}>Title</span>
        <Form.Item
          className="form__item"
          name="title"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please input short title!',
            },
          ]}
          hasFeedback
        >
          <Input style={{ height: 40 }} placeholder="Title" name="title" />
        </Form.Item>
      </Col>

      <Col>
        <span className={style.span}>Short description</span>
        <Form.Item
          name="shortDescription"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please input Description!',
            },
          ]}
          hasFeedback
        >
          <Input
            style={{ height: 40 }}
            placeholder="Title"
            name="shortDescription"
          />
        </Form.Item>
      </Col>

      <Col>
        <span className={style.span}>Text</span>
        <Form.Item
          name="text"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please input a text!',
            },
          ]}
          hasFeedback
        >
          <TextArea name="text" style={{ height: 168 }} placeholder="Text" />
        </Form.Item>
      </Col>

      <span className={style.span}>Tags</span>
      <Col className={style.form__element}>
        <div className={style.container}>
          <div className={style.input_tag} style={{ flex: 1 }}>
            <div className={style.container_input}>
              {inputValues.map((value, index) => (
                <div
                  className={style.container__item}
                  key={index}
                  style={{
                    display: 'flex',
                    marginTop: 10,
                  }}
                >
                  <Form.Item
                    name={`tagList[${index}]`}
                    rules={[
                      {
                        type: 'string',
                        required: true,
                        message: 'Please input a tag!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ height: 40, width: 300 }}
                      placeholder="Tag"
                      name="tag"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    className={style.btn}
                    style={{ height: 40, width: 118 }}
                    danger
                    onClick={() => handleDeleteInput(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          className={style.btn_add}
          style={{ height: 40, width: 136 }}
          type="primary"
          ghost
          onClick={handleAddInput}
          block
        >
          Add tag
        </Button>
      </Col>
      <Button
        className={style.btn_send}
        style={{ height: 40, width: 319 }}
        type="primary"
        htmlType="submit"
      >
        Send
      </Button>
    </Form>
  )
}

export default NewArticle
