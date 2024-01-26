import { Button, Col, Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { selectLoadingArticle } from '../../store/slices/articleSlice'
import { selectToken } from '../../store/slices/loginSlice'

import style from './CreateEditArticleForm.module.scss'

function CreateEditArticleForm({
  asyncEditCreatArticleFunc,
  article,
  slug,
  titleText,
}) {
  const dispatch = useDispatch()
  const loadingState = useSelector(selectLoadingArticle)
  const [inputValues, setInputValues] = useState(article.tagList || [])
  const { TextArea } = Input
  const [form] = Form.useForm()
  const token = useSelector(selectToken)

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

  const handleAddInput = () => {
    setInputValues([...inputValues, ''])
    form.setFieldsValue({ tagList: [...inputValues, ''] })
  }

  const onFinish = async (values) => {
    const tagList = values.tagList
      ? values.tagList.map((tag) => tag.trim())
      : []
    const articleData = {
      title: values.title,
      description: values.description,
      body: values.body,
      tagList,
    }
    await dispatch(
      asyncEditCreatArticleFunc({
        jwtToken: token,
        article: articleData,
        slug,
      })
    )
  }

  return (
    <Form
      initialValues={{
        title: article.title || '',
        description: article.description || '',
        body: article.body || '',
        tagList: article.tagList || '',
      }}
      onFinish={onFinish}
      className={style.form}
      form={form}
    >
      <h1 className={style.title}>{titleText}</h1>
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
          <TextArea name="text" style={{ minHeight: 168 }} placeholder="Text" />
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

export default CreateEditArticleForm
