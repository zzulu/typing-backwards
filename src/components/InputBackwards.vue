<template>
  <div class="row">
    <form v-on:submit.prevent="createComment($event)" class="inverted col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
      <input id="sentence" class="box" type="text" v-on:input="updateInput($event)" autocomplete="off" autofocus>
      <label for="sentence" class="box assembled"><span id="caret" :class="{ blink: blink }"></span>{{ assembled }}</label>
    </form>
  </div>
</template>

<script>
import Hangul from 'hangul-js'

export default {
  name: 'InputBackwards',
  props: {
    user: Object,
  },
  data() {
    return {
      history: [],
      blink: true,
    }
  },
  computed: {
    assembled() {
      return Hangul.a([...this.history].reverse())
    },
  },
  methods: {
    updateInput(event) {
      this.history = Hangul.d(event.target.value)
      if (event.inputType === 'deleteContentBackward') {
        event.target.value = [...this.history].join('')
      }
      this.resetBlink()
    },
    createComment(event) {
      this.$emit('create-comment', {
        uid: this.user.uid,
        author: this.user.author,
        content: this.assembled,
        createdAt: Date.now(),
      })
      this.clearInput(event.target.firstElementChild)
    },
    clearInput(target) {
      this.history = []
      target.value = ''
    },
    resetBlink() {
      this.blink = false; window.setTimeout(() => { this.blink = true }, 1);
    },
  },
}
</script>

<style>
input:focus {
  outline: none;
}

.inverted {
  margin-top: 3rem;
}

.box {
  display: block;
  width: 100%;
  border: 1px solid #ced4da;
  padding: 1.25rem 2rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  line-height: 1.5;
  border-radius: 0;
  transition: border-color .15s ease-in-out;
}

#sentence {
  cursor: default;
  caret-color: transparent;
  position: relative;
  opacity: 0;
}

.assembled {
  cursor: text;
  position: relative;
  top: calc((1.5em + 2.5rem + 2px) * -1);
}

.assembled > .blink {
  display: inline-block;
  vertical-align: text-bottom;
  width: 1px;
  height: 1.8rem;
  margin-right: 2px;
}

#sentence:focus + .assembled {
  border-color: #495057;
}

#sentence:focus + .assembled > .blink {
  background-color: #495057;
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from, to {
    background-color: #495057;
  }
  50% {
    background-color: transparent;
  }
}
</style>
