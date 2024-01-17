/* eslint-disable import/no-duplicates */
// eslint-disable-next-line object-curly-newline
import { Button, Col, Form, Input } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/use-auth.js'
import { createArticleAsync } from '../../store/slices/createArticleSlice.js'

import style from './NewArticle.module.scss'

function NewArticle() {
  const navigate = useNavigate()
  const loadingState = useSelector((state) => state.create.loading)
  console.log(loadingState)
  const { TextArea } = Input
  const { token } = useAuth()
  const [inputValues, setInputValues] = useState([])
  const dispatch = useDispatch()

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

  const onFinish = async (values) => {
    const articleData = {
      title: values.title,
      description: values.description,
      body: values.body,
      tagList: values.tagList.map((tag) => tag.trim()),
    }
    const response = await dispatch(
      createArticleAsync({
        jwtToken: token,
        article: articleData,
      })
    )
    if (response.ok) {
      navigate('/')
    }
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
          name="description"
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
          name="body"
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
                    name={['tagList', index]}
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
                      name={`tagList[${index}]`}
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
        loading={loadingState}
      >
        Send
      </Button>
    </Form>
  )
}

export default NewArticle
