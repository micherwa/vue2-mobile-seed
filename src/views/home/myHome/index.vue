<template>
    <div class="home">
        <div class="list" v-for="item in users">
            <div class="item">
                <label class="item-label arrow" :id="'item-'+item.id">{{item.name}}</label>
            </div>
        </div>
    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
