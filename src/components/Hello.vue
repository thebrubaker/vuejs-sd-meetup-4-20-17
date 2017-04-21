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
    <button @click="logout">Sign out</button>
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
      message: '',
      user: ''
    }
  },
  computed: {

  },
  methods: {
    login () {
      firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.user = user
          console.log('success')
        })
        .catch(error => {
          console.log('No!!!!')
        })
    },
    logout () {
      firebase.auth().signOut().then(function() {
        console.log('signed out')
      }).catch(function(error) {
        console.error('can\'t do it captn')
      });
    },
    register () {
      firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
            console.error(error)
        });
    },
    create () {
      let key = firebase.database().ref('messages').push({
        text: this.message,
        user: this.user
      }).then(() => {
        this.message = ''
      })
    }
  },
  created () {
    firebase.database().ref('messages').on('value', snapshot => {
      let messages = snapshot.val()
      this.messages = snapshot.val()
    })
  },
  mounted () {
    let that = this
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.user = user.email
      } else {
        that.user = null
      }
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
