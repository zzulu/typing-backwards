<template>
  <div class="container">
    <InputBackwards v-on:create-comment="createComment" :user="user" />
    <Comments :comments="comments" :loading="commentsLoading" />
  </div>
</template>

<script>
import firebase, { db } from '@/firebase.js'
import Comments from '@/components/Comments.vue'
import InputBackwards from '@/components/InputBackwards.vue'

export default {
  name: 'App',
  components: {
    Comments,
    InputBackwards,
  },
  data() {
    return {
      user: {
        uid: '',
        author: '',
      },
      comments: [],
      commentsLoading: true,
    }
  },
  methods: {
    createComment(comment) {
      this.$firebaseRefs.comments.push(comment)
    },
    createAuthor(uid) {
      const consonant = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
      const numbers = uid.slice(0, 4).split('').map((char) => char.charCodeAt())
      return numbers.map((number) => consonant[number%14]).join('')
    },
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = {
            uid: user.uid,
            author: this.createAuthor(user.uid),
          }
          this.$rtdbBind('comments', db.ref('comments').limitToLast(100)).then(() => {
            this.commentsLoading = false
          })
        } else {
          this.user = { uid: '', author: '' }
          firebase.auth().signInAnonymously().catch(() => {
            this.user = { uid: '', author: '' }
          })
        }
      })
    },
  },
  mounted() {
    this.onAuthStateChanged()
  },
}
</script>

<style>
body {
  font-family: 'Spoqa Han Sans', sans-serif;
  color: #343a40;
}
</style>
