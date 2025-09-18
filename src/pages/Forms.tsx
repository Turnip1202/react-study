import React, { useState, useRef, useEffect } from 'react'
import './Forms.css'

// 受控组件示例
const ControlledForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    hobbies: [] as string[],
    newsletter: false,
    terms: false
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 实时验证
  useEffect(() => {
    const newErrors: {[key: string]: string} = {}
    
    if (formData.username && formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确'
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符'
    }
    
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致'
    }
    
    if (formData.age && (parseInt(formData.age) < 18 || parseInt(formData.age) > 100)) {
      newErrors.age = '年龄必须在18-100之间'
    }
    
    setErrors(newErrors)
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      
      if (name === 'hobbies') {
        setFormData(prev => ({
          ...prev,
          hobbies: checked 
            ? [...prev.hobbies, value]
            : prev.hobbies.filter(hobby => hobby !== value)
        }))
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 最终验证
    const finalErrors: {[key: string]: string} = {}
    
    if (!formData.username) finalErrors.username = '用户名不能为空'
    if (!formData.email) finalErrors.email = '邮箱不能为空'
    if (!formData.password) finalErrors.password = '密码不能为空'
    if (!formData.age) finalErrors.age = '年龄不能为空'
    if (!formData.gender) finalErrors.gender = '请选择性别'
    if (!formData.terms) finalErrors.terms = '请同意用户协议'
    
    // 合并实时验证错误
    Object.assign(finalErrors, errors)
    
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('注册成功！\n' + JSON.stringify(formData, null, 2))
      
      // 重置表单
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        hobbies: [],
        newsletter: false,
        terms: false
      })
      setErrors({})
    } catch (error) {
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-demo">
      <h3>受控组件表单</h3>
      
      <form onSubmit={handleSubmit} className="controlled-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="username">用户名 *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
              placeholder="请输入用户名"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">邮箱 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="请输入邮箱"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">密码 *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
              placeholder="请输入密码"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">确认密码 *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="请确认密码"
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">年龄 *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={errors.age ? 'error' : ''}
              placeholder="请输入年龄"
              min="18"
              max="100"
            />
            {errors.age && <span className="error-text">{errors.age}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">性别 *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">请选择</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
            {errors.gender && <span className="error-text">{errors.gender}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label>兴趣爱好：</label>
          <div className="checkbox-group">
            {['阅读', '运动', '音乐', '电影', '旅行', '游戏'].map(hobby => (
              <label key={hobby} className="checkbox-item">
                <input
                  type="checkbox"
                  name="hobbies"
                  value={hobby}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={handleInputChange}
                />
                {hobby}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            订阅邮件通知
          </label>
        </div>
        
        <div className="form-group">
          <label className="checkbox-item required">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
            />
            我同意用户协议和隐私政策 *
          </label>
          {errors.terms && <span className="error-text">{errors.terms}</span>}
        </div>
        
        <div className="form-summary">
          <h4>表单数据预览：</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="submit-btn"
        >
          {isSubmitting ? '提交中...' : '注册'}
        </button>
      </form>
    </div>
  )
}

// 非受控组件示例
const UncontrolledForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  
  const [submittedData, setSubmittedData] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    // 使用 FormData 获取表单数据
    const formData = new FormData(formRef.current)
    const data: any = {}
    
    // 获取所有表单字段
    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // 处理多选值
        if (Array.isArray(data[key])) {
          data[key].push(value)
        } else {
          data[key] = [data[key], value]
        }
      } else {
        data[key] = value
      }
    }
    
    setSubmittedData(data)
    
    // 手动验证
    if (!usernameRef.current?.value) {
      alert('请输入用户名')
      usernameRef.current?.focus()
      return
    }
    
    if (!emailRef.current?.value) {
      alert('请输入邮箱')
      emailRef.current?.focus()
      return
    }
  }
  
  const handleReset = () => {
    formRef.current?.reset()
    setSubmittedData(null)
    usernameRef.current?.focus()
  }
  
  const focusUsername = () => {
    usernameRef.current?.focus()
    usernameRef.current?.select()
  }

  return (
    <div className="form-demo">
      <h3>非受控组件表单</h3>
      
      <form ref={formRef} onSubmit={handleSubmit} className="uncontrolled-form">
        <div className="form-group">
          <label htmlFor="uncontrolled-username">用户名：</label>
          <input
            ref={usernameRef}
            type="text"
            id="uncontrolled-username"
            name="username"
            defaultValue=""
            placeholder="请输入用户名"
          />
          <button type="button" onClick={focusUsername}>聚焦到用户名</button>
        </div>
        
        <div className="form-group">
          <label htmlFor="uncontrolled-email">邮箱：</label>
          <input
            ref={emailRef}
            type="email"
            id="uncontrolled-email"
            name="email"
            defaultValue=""
            placeholder="请输入邮箱"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="uncontrolled-category">类别：</label>
          <select id="uncontrolled-category" name="category" defaultValue="general">
            <option value="general">一般</option>
            <option value="business">商务</option>
            <option value="personal">个人</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="uncontrolled-message">消息：</label>
          <textarea
            ref={messageRef}
            id="uncontrolled-message"
            name="message"
            rows={4}
            defaultValue=""
            placeholder="请输入消息内容"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="uncontrolled-file">文件：</label>
          <input
            ref={fileRef}
            type="file"
            id="uncontrolled-file"
            name="file"
            multiple
            accept=".jpg,.png,.pdf,.txt"
          />
        </div>
        
        <div className="form-group">
          <label>通知方式：</label>
          <div className="radio-group">
            <label className="radio-item">
              <input type="radio" name="notification" value="email" defaultChecked />
              邮箱
            </label>
            <label className="radio-item">
              <input type="radio" name="notification" value="sms" />
              短信
            </label>
            <label className="radio-item">
              <input type="radio" name="notification" value="push" />
              推送
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit">提交</button>
          <button type="button" onClick={handleReset}>重置</button>
        </div>
      </form>
      
      {submittedData && (
        <div className="submitted-data">
          <h4>提交的数据：</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// 动态表单示例
const DynamicForm: React.FC = () => {
  const [fields, setFields] = useState([
    { id: 1, label: '姓名', type: 'text', value: '', required: true },
    { id: 2, label: '邮箱', type: 'email', value: '', required: true }
  ])
  
  const [nextId, setNextId] = useState(3)

  const addField = (type: string, label: string) => {
    setFields(prev => [
      ...prev,
      { id: nextId, label, type, value: '', required: false }
    ])
    setNextId(prev => prev + 1)
  }
  
  const removeField = (id: number) => {
    setFields(prev => prev.filter(field => field.id !== id))
  }
  
  const updateField = (id: number, updates: Partial<typeof fields[0]>) => {
    setFields(prev => prev.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }
  
  const handleFieldChange = (id: number, value: string) => {
    updateField(id, { value })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const requiredFields = fields.filter(field => field.required && !field.value)
    if (requiredFields.length > 0) {
      alert(`请填写必填字段: ${requiredFields.map(f => f.label).join(', ')}`)
      return
    }
    
    const formData = fields.reduce((acc, field) => {
      acc[field.label] = field.value
      return acc
    }, {} as {[key: string]: string})
    
    alert('动态表单提交成功！\n' + JSON.stringify(formData, null, 2))
  }

  return (
    <div className="form-demo">
      <h3>动态表单</h3>
      
      <div className="dynamic-form">
        <div className="field-controls">
          <button onClick={() => addField('text', '文本字段')}>+ 文本字段</button>
          <button onClick={() => addField('email', '邮箱字段')}>+ 邮箱字段</button>
          <button onClick={() => addField('number', '数字字段')}>+ 数字字段</button>
          <button onClick={() => addField('date', '日期字段')}>+ 日期字段</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.id} className="dynamic-field">
              <div className="field-header">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="field-label-input"
                  placeholder="字段标签"
                />
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  />
                  必填
                </label>
                <button 
                  type="button" 
                  onClick={() => removeField(field.id)}
                  className="remove-btn"
                  disabled={fields.length <= 1}
                >
                  删除
                </button>
              </div>
              
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={`请输入${field.label}`}
                required={field.required}
                className="field-input"
              />
            </div>
          ))}
          
          <button type="submit" className="submit-btn">
            提交动态表单
          </button>
        </form>
      </div>
    </div>
  )
}

const Forms: React.FC = () => {
  return (
    <div className="forms">
      <h1>表单处理</h1>
      <p>学习 React 中受控组件、非受控组件和动态表单的处理方法</p>

      <div className="forms-container">
        <ControlledForm />
        <UncontrolledForm />
        <DynamicForm />
      </div>

      <section className="concepts">
        <h2>表单处理概念</h2>
        <div className="concepts-grid">
          <div className="concept">
            <h4>🎮 受控组件</h4>
            <p>表单数据由 React 组件的 state 来管理，推荐使用</p>
          </div>
          
          <div className="concept">
            <h4>🆓 非受控组件</h4>
            <p>表单数据由 DOM 节点来处理，使用 ref 获取值</p>
          </div>
          
          <div className="concept">
            <h4>✅ 表单验证</h4>
            <p>客户端验证提升用户体验，服务端验证保证安全</p>
          </div>
          
          <div className="concept">
            <h4>🔄 实时验证</h4>
            <p>使用 useEffect 实现实时验证反馈</p>
          </div>
          
          <div className="concept">
            <h4>📝 FormData API</h4>
            <p>现代浏览器提供的表单数据处理接口</p>
          </div>
          
          <div className="concept">
            <h4>🚀 动态表单</h4>
            <p>根据用户需求动态添加或删除表单字段</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Forms