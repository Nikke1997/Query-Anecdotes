import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/anecdotes'
import { useNotifyDispatch } from '../NotifyContext'

const AnecdoteForm = () => {

const dispatch = useNotifyDispatch()



  const queryClient = useQueryClient()

  const newMutation = useMutation({mutationFn: createNew,
  onSuccess: () => {
    queryClient.invalidateQueries('anecdotes')
  },
  onError: () => {
    dispatch({type: 'ADD_NOTI', payload: 'Too short anecdote, must be at least 5 characters'})
    setTimeout(() => {
      dispatch({type: 'REMOVE_NOTI'})
    }, 5000)
  }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({content, votes: 0})
    dispatch({type: 'ADD_NOTI', payload: `you created '${content}'`})
    setTimeout(() => {
      dispatch({type: 'REMOVE_NOTI'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
