import { defineStore } from 'pinia'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export const useAppStore = defineStore('app', () => {
  const supabase = useSupabaseClient()

  const rules = computed(() => {
    return {
      email: { required, email },
      password: { required },
    }
  })

  interface LoginInUser {
    (e: 'logIn'): void
  }

  interface AdminEmail {
    id: number
    created_at: Date
    email: string
    name: string
    user_id: string
  }

  type UserLogin = {
    email: string
    password: string
  }

  const loading = ref<boolean>(false)
  const errMsg = ref<string>('')
  function checkPassword(str: string) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return re.test(str)
  }

  async function loginUser(user: UserLogin) {
    loading.value = true
    const v$l = useVuelidate(rules, user)
    let val: any = await v$l.value.$validate()

    if (!val) {
      v$l.value.$errors.forEach(err => {
        alert(err.$message)
      })
      loading.value = false
    }
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      })
      if (error) throw error
      console.log('Logged In!')
      loading.value = false
      return
    } catch (err: any) {
      errMsg.value = err.message
      setTimeout(() => {
        errMsg.value = ''
      }, 4000)
      return err
    } finally {
      loading.value = false
    }
  }

  return {
    loginUser,
  }
})
