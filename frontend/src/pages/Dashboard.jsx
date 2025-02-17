import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoalsAsync, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'
import useAuth from '../hooks/useAuth'

function Dashboard() {
  const dispatch = useDispatch()
  const { user } = useAuth()

  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  )

  // 处理错误
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
  }, [isError, message])

  // 首次执行时加载数据
  useEffect(() => {
    dispatch(getGoalsAsync())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goal Dashboard</p>
      </section>
      <GoalForm />

      <section className='content'>
        {goals.length > 0 && (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Dashboard
