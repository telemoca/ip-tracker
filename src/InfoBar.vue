<script setup>
import InfoCard from "./InfoCard.vue"

const props = defineProps({
    ip_adress: String,
    location: String,
    timezone: String,
    isp: String,
})
</script>

<template>
    <div class="infobar__container">
        <InfoCard title="ip address" :info="ip_adress" class="infocard" v-if="ip_adress" />
        <InfoCard title="location" :info="location" class="infocard" v-if="location && location !== ', , ZZ'" />
        <InfoCard title="timezone" :info="'UTC ' + timezone" class="infocard" v-if="timezone" />
        <InfoCard title="isp" :info="isp" class="infocard" v-if="isp" />
    </div>
</template>

<style scoped>
.infobar__container {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    width: 80%;
    padding: 3em;
    margin: auto;
    border-radius: 15px;
    box-shadow: 0 0 12px -5px black;
    z-index: 1000; /* must be 450 at least to be above the map */
}

.infocard + .infocard{
    border-left: 1px solid var(--gray400);
    padding-left: 1em;
    margin-left: .7em;
}

@media (max-width: 900px) {
    .infobar__container {
        display: block;
        padding: 1.5em 2em;
        width: 600px;
        max-width: 90vw;
    }

    .infocard + .infocard{
        border: none;
        padding: 0;
        margin: 0;
        margin-top: 1em;
    }
}
</style>
