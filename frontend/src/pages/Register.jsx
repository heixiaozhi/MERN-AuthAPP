import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset, registerAsync } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name, email, password, password2 } = formData

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // 当信息提交更新后检查状态
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // 本地有用户直接导航到dashboard
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

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

    if (password !== password2) {
      toast.error('密码不一致')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      // 注册信息
      dispatch(registerAsync(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
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
