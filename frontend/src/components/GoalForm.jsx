import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoalAsync } from '../features/goals/goalSlice'

function GoalForm() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    dispatch(createGoalAsync(text))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            id='text'
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
  )
}
export default GoalForm
