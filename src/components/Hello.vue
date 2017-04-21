<template>
  <div>
    <ul v-for="message in messages">
      <li>{{ message.text }} - {{ message.user }}</li>
    </ul>
    <br>
    <input type="text" name="message" v-model="message">
    <button @click="create">Create Message</button>

    <br>
    <label for="email">Email</label>
    <input type="text" name="email" v-model="email">
    <label for="password">Password</label>
    <input type="password" name="password" v-model="password">
    <button @click="login">Sign In</button>
    <button @click="register">Sign Up</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'hello',
  data () {
    return {
      messages: [],
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login () {
      this.$firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log('No!!!!')
        })
    },
    register () {
      this.$firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
            console.error(error)
        });
    },
    create () {
      let key = this.$firebase.database().ref('messages').push({
        text: this.message,
        user: 1
      }).then(() => {
        this.message = ''
      })
      'pk.joel@gmail.com'
      'joelisawesome'
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
