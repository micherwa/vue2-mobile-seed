<template>
    <div class="home">
        users:{{users}}
        <div v-for="item in users">
            {{item.id}}==={{item.name}}
        </div>
    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
