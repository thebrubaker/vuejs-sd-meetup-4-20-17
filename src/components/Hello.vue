<template>
  <div>
    <ul v-for="message in messages">
      <li>{{ message.text }} - {{ message.user }}</li>
    </ul>

    <input type="text" name="message" v-model="message">
    <button @click="create">Create Message</button>


    <input type="text" name="username" v-model="username">
    <input type="password" name="password" v-model="password">
    <button @click="login">Submit</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data () {
    return {
      messages: [],
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login () {
      this.$firebase.auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log('No!!!!')
        })
    },
    create () {
      let key = this.$firebase.database().ref('messages').push({
        text: this.message,
        user: 1
      }).then(() => {
        this.message = ''
      })
    }
  },
  created () {
    this.$firebase.database().ref('messages').on('value', snapshot => {
      let messages = snapshot.val()
      this.messages = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
