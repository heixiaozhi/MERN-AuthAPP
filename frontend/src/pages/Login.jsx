import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset, loginAsync } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { email, password } = formData

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

    const userData = {
      email,
      password,
    }
    dispatch(loginAsync(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button className='btn btn-block'>submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
