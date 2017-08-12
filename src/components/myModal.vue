<template>
    <transition name="my-modal">
        <div class="my-modal-mask">
            <div class="my-modal-wrapper">
                <div class="my-modal-container">
                    <div class="my-modal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>

                    <div class="my-modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="my-modal-footer">
                        <slot name="footer">
                            <button class="button modal-button-cancel" @click="$emit('close')">取消</button>
                            <button class="button modal-button-confirm" @click="$emit('confirm')">确定</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
export default {
    name: 'MyModal'
};
</script>

<style lang="scss">
.my-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.my-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.my-modal-container {
    width: 85%;
    margin: 0px auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.my-modal-header h3 {
    margin-top: 0;
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    padding: 15px 0 0;
}

.my-modal-body {
    margin: 10px 20px 15px 20px;
}

.my-modal-enter {
    opacity: 0;
}

.my-modal-leave-active {
    opacity: 0;
}

.my-modal-enter .my-modal-container,
.my-modal-leave-active .my-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.my-modal-footer {
    text-align: center;
    height: 40px;
    display: flex;

    button {
        flex: 1;
        height: 100%;
        border-radius: 0;
        background-color: #fff;
        border-top: 1px solid #ddd;
    }

    .modal-button-confirm {
        border-left: 1px solid #ddd;
    }
}
</style>
