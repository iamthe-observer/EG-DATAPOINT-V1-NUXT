import { Task } from './../interfaces/interfaces'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const my_tasks = ref<Task[]>([])
  const loading_task = ref(false)
  const done_task = ref(false)
  const { $SB, $curr_session } = useNuxtApp()

  const setDoneTask = (val: boolean) => {
    done_task.value = val
  }

  const getTasks = async () => {
    try {
      let { data, error } = await $SB
        .from('tasks')
        .select('*')
        .eq('user_id', $curr_session.value.user.id!)

      if (error) throw error
      my_tasks.value = data!
    } catch (error) {
      console.log(error)
    }
  }

  const sendTasks = async (task: Task) => {
    loading_task.value = true
    try {
      let { error } = await $SB.from('tasks').insert([task])
      if (error) throw error
      loading_task.value = false
      done_task.value = true
    } catch (error) {
      loading_task.value = false
    } finally {
      loading_task.value = false
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

  return {
    getTasks,
    sendTasks,
    loading_task,
    done_task,
    my_tasks,
    setDoneTask,
  }
})
