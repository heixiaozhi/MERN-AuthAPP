import { useDispatch } from 'react-redux'
import { deleteGoalAsync } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('zh-CN')}</div>
      <h2>{goal.text}</h2>
      <button
        className='close'
        onClick={() => dispatch(deleteGoalAsync(goal._id))}
      >
        X
      </button>
    </div>
  )
}
export default GoalItem
