import { Task } from './../interfaces/interfaces'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const _tasks = ref<Task[]>([])
  const loading_task = ref(false)
  const done_task = ref(false)
  const { $SB, $trimStringProperties } = useNuxtApp()

  const setDoneTask = (val: boolean) => {
    done_task.value = val
  }

  const getTasks = async () => {
    let currentSession = await $SB.auth.getSession()

    try {
      let { data, error } = await $SB
        .from('tasks')
        .select('*')
        .eq('user_id', currentSession.data.session!.user.id)

      if (error) throw error
      _tasks.value = data!
    } catch (error) {
      console.log(error)
    }
  }

  const sendTasks = async (task: Task) => {
    loading_task.value = true
    try {
      let { error } = await $SB
        .from('tasks')
        .insert([$trimStringProperties(task)])
      if (error) throw error
      loading_task.value = false
      done_task.value = true
    } catch (error) {
      loading_task.value = false
    } finally {
      loading_task.value = false
    }
  }

  async function updateTask(state: boolean, id: string) {
    try {
      let { data, error } = await $SB
        .from('tasks')
        .update({ done: !state })
        .eq('id', id)
        .select()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  $SB
    .channel('prices-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tasks' },
      async payload => {
        await getTasks()
      }
    )
    .subscribe()

  function reset() {
    _tasks.value = []
    loading_task.value = false
    done_task.value = false
  }

  return {
    reset,
    getTasks,
    sendTasks,
    loading_task,
    done_task,
    _tasks,
    setDoneTask,
    updateTask,
  }
})
