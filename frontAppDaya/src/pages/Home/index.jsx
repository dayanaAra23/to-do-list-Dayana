import './style.css'
import Trash from '../../assets/icons8-lixeira.png'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format } from 'date-fns'


function Home() {

  const inputName = useRef()
  const inputDueDate = useRef()
  const inputDescription = useRef()
  const inputLabel = useRef()

  const [tasks, setTasks] = useState([])

  async function getTasks() {
    const taskApi = await api.get('/tasks')
    setTasks(taskApi.data)
  }

  async function deleteTasks(id) {
    await api.delete(`/tasks/${id}`)
    toast.info('Task deleted!')
    getTasks()
  }

  async function toggleCompleted(id, completed) {
    try {
      await api.put(`/tasks/${id}/toggle`, { completed });
      getTasks();
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
    }
  }


  async function createTasks() {
    try {
      await api.post('/tasks', {
        taskName: inputName.current.value,
        dueDate: new Date(inputDueDate.current.value).toISOString(),
        description: inputDescription.current.value,
        label: inputLabel.current.value
      })
      inputName.current.value = ''
      inputDueDate.current.value = ''
      inputDescription.current.value = ''
      inputLabel.current.value = ''

      toast.success('New task created! 🎉')
      getTasks()
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Task name is already in use. Please choose a different task name and try again')
      } else {
        toast.error('Error when trying to create a task')
      }
    }
  }
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <div className='container'>
        <form>
          <h1>TO DO List Dayana</h1>
          <input name='taskName' type='text' placeholder='Task Name' data-testid='taskName' ref={inputName} />
          <input name='dueDate' type='date' placeholder='Due Date' data-testid='dueDate' ref={inputDueDate} />
          <input name='description' type='text' placeholder='Description' data-testid='description' ref={inputDescription} />
          <select name='label' ref={inputLabel} data-testid='label'>
            <option value="">Select a task label</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Buy">Buy</option>
            <option value="Study">Study</option>
            <option value="Seicho">Seicho</option>
          </select>
          <button type='button' data-testid='addTask' onClick={createTasks}>Add new task</button>
        </form>

        {tasks.length === 0 ? (
          <p className="empty-message">You won! No more tasks for today! ✨</p>
        ) :
          tasks.map(task => (
            <div key={task.id}>
              <div className={`cards ${task.completed ? 'completed' : ''}`}>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={e => toggleCompleted(task.id, e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                <p>Task name: <span>{task.taskName}</span></p>
                <p>Due date: <span>{task.dueDate.slice(0, 10).split('-').reverse().join('/')}</span></p>                <p>Description: <span>{task.description}</span></p>
                <p>Label: <span>{task.label}</span></p>
                <button onClick={() => deleteTasks(task.id)}>
                  <img src={Trash} />
                </button>
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastClassName="custom-toast"
      />
    </>
  )
}

export default Home
