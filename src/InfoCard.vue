<script setup>
const props = defineProps({
    title: String,
    info: String,
})
</script>

<template>
    <div class="card__container">
        <h3>{{ title }}</h3>
        <p>{{ info }}</p>
    </div>
</template>

<style scoped>
.card__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

h3 {
    text-transform: uppercase;
    font-size: min(calc(0.7rem + .4vw), 16px);
    letter-spacing: 0.05em;
    color: var(--gray400);
    margin-bottom: 1em;
}

p {
    font-size: 1.5rem;
    font-size: min(calc(1.1rem + .5vw), 255px);
    font-weight: 500;
    color: var(--gray950);
}

::selection {
    background: #4463d5;
    color: #ffffff;
}

@media (max-width: 900px) {
    h3 {
        margin-bottom: .3em;
    }
    h3, p {
        text-align: center;
    }
    .card__container {
        display: block;
    }
}
</style>
