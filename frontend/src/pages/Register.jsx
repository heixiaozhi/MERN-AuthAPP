import { useState } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  function onChange(e) {
    // 利用计算属性覆盖之前的属性
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }))
  }

  function onSubmit(e) {
    // 组织默认表单提交
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter your name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />{' '}
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              id='password2'
              value={password2}
              placeholder='confirm your password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
