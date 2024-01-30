import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAll, updateAnecdote} from './services/anecdotes'

const App = () => {

  const queryClient = useQueryClient()

  const mutation = useMutation({
  mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  } )

  

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  })

  console.log(JSON.parse(JSON.stringify(result)))

if(result.isLoading) {
  return <div>Loading...</div>
}

  const handleVote = (anecdote) => {
    mutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }


  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
