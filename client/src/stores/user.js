import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    setToken(token) {
      this.token = token
      console.log(token)
      localStorage.setItem('token', token)
    },
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    async updateUserInfo(userInfo){
      this.user = userInfo
      
      try{
        const response = await axios.post('http://localhost:3000/api/update', {uuid:this.user.uuid, username:userInfo.username, email:userInfo.email, password:userInfo.password})
        if(response.status === 200){
          this.setUser(userInfo)
          alert(response.data.message)
        }else{
          alert(response.data.message)
        }
        
      }catch(err){
        console.log(err)
      }
    
    }
    
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser(){
      return this.user
    }

  }
})

export const userStore = useUserStore()
