<template>
    <div class="home">
        <div class="list" v-for="item in users">
            <div class="item">
                <label class="item-label arrow" :id="'item-'+item.id">{{item.name}}</label>
            </div>
        </div>

        <div class="img-rem-wrapper">
            <h4>img作为div背景，须设置高度，用到rem，实现图片自适应</h4>
            <div class="img-rem m-t-10"></div>
        </div>


    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
