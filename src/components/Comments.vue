<template>
  <div class="row">
    <ul class="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6 mb-5">
      <li v-for="comment in reversedComments" :key="comment.createdAt" class="comment">
        <div class="comment__author">{{ comment.author }}</div>
        <div class="comment__content">{{ comment.content }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    comments: Array,
  },
  computed: {
    reversedComments() {
      return [...this.comments].reverse()
    },
  },
}
</script>

<style>
ul {
  list-style: none;
  padding: 0;
}

.comment {
  border: 1px solid #ced4da;
  padding: 1.25rem 2rem;
  margin-bottom: 1rem;
}

.comment__author {
  font-size: 1rem;
  color: #868e96;
  margin-bottom: .25rem;
}

.comment__content {
  font-size: 1.25rem;
}
</style>
