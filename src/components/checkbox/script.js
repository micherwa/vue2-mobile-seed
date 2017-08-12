import './style.scss';

export default {
    name: 'Checkbox',
    template: require('./index.html'),
    props: {
        itemObject: Object,
        disabled: Boolean,
        checked: Boolean,
        label: String,
        value: {
            validator () {
                return true;
            }
        },
        onChange: Function,
        align: {
            type: String,
            default: 'left'
        }
    },
    data () {
        return {
            itemObjectData: {
                value: this.value,
                label: this.label,
                checked: this.checked,
                disabled: this.disabled,
                align: this.align
            }
        };
    },
    methods: {
        handleChange (e) {
            if (this.onChange) {
                this.onChange(e.target.checked, this.value);
            }
        }
    }
};
