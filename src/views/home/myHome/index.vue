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

        <button class="btn btn-default m-l-10" @click="showMyModal = true">show my modal</button>

        <div class="p-t-20 p-l-10">
            <Checkbox value="123" label="选择" align="right"
             :checked="false" :disabled="false" :on-change="handleChange">
            </Checkbox>
        </div>

        <div class="p-t-20 p-l-10">
            <i class="fa fa-camera-retro f18"></i>
        </div>

        <div class="modal-slot">
            <my-modal v-if="showMyModal" @close="showMyModal = false" @confirm="handleConfirm">
                <h3 slot="header">header</h3>
                <div slot="body">
                    <input type="tel" placeholder="请输入手机号" v-model="mobilePhone" maxlength="11" />
                </div>
            </my-modal>
        </div>

    </div>
</template>
<style lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
