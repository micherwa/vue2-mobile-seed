<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>hello</h1>
    <div class="flex-wrapper">
        <div class="flex-item" @click="tap">
            flex-item1
            <img src="./assets/icon-eye-close.png" />
        </div>

        <div class="flex-item" @click="tap">
            flex-item2
            <img src="./assets/icon-eye-open.png" />
        </div>
        <div class="flex-item" @click="tap">
            flex-item3
            <img src="./assets/icon-arrow-rt.png" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    methods: {
        tap (e) {
            console.log(e.target);
        },
        dd () {
            // var a = 1;
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

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

.img-responsive {
    display: inline-block;
    max-width: 100%;
    height: auto;
}

.flex-wrapper {
    display: flex;
    .flex-item {
        flex: 1;
    }
}
</style>
