<script setup>
import { ref, watch } from "vue"

const error = ref(false)

const model = defineModel()
const props = defineProps({
    isIpUnlocatable: Boolean,
})
const emit = defineEmits(["search"])

const search = () => {
    // check if format is good
    let isIpGood = true
    let pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
    if (!pattern.test(model.value.trim())) {
        isIpGood = false
    } else {
        let arrayNumbers = model.value.split(".")
        arrayNumbers.forEach((nb) => {
            if (nb >= 256) {
                isIpGood = false
            }
            if (nb.length > 1 && nb.startsWith("0")) {
                isIpGood = false
            }
        })
    }
    if (isIpGood) {
        error.value = false
        emit("search")
    } else {
        error.value = true
    }
}

watch(
    () => props.isIpUnlocatable,
    () => {
        error.value = props.isIpUnlocatable
    }
)
</script>

<template>
    <form class="searchbar__wrapper" @submit.prevent="search">
        <input
            type="text"
            name=""
            id=""
            v-model="model"
            placeholder="Search for any IP adress"
            :class="{ input_error: error }"
            class=""
            @input="error = false"
        />
        <button type="submit">
            <img src="/icon-arrow.svg" />
        </button>
        <p v-if="error" class="text_error">Invalid IP address entered</p>
    </form>
</template>

<style scoped>
.searchbar__wrapper {
    position: relative;
    width: 600px;
    max-width: 100%;
    cursor: pointer;
}

input {
    font-size: 18px;
    width: 100%;
    padding: 1em 1.3em;
    border-radius: 15px;
    border: none;
    color: var(--gray950);
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.1s;
    cursor: inherit;
}

.input_error {
    outline: 1.5px solid red;
}

.input_error:focus {
    outline: 1.5px solid red;
}

.text_error {
    position: absolute;
    color: red;
    bottom: -25px;
}

input:focus {
    outline: 1.5px solid var(--gray950);
    cursor: auto;
}

button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 0 15px 15px 0;
    border: none;
    background-color: black;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.1s;
    cursor: inherit;
}

button:hover {
    background-color: var(--gray950);
}

@media (max-width: 900px) {
    .searchbar__wrapper {
        width: 600px;
        max-width: 90vw;
    }
}
</style>
