<script setup>
import { onMounted, ref } from "vue"
import InfoBar from "./InfoBar.vue"
import SearchBar from "./SearchBar.vue"
import DisplayMap from "./DisplayMap.vue"
import getIpInfos from "./api/IpTrackerApi"
import getPublicIP from "./api/publicIP"

const value_searched = ref("")
const isIpUnlocatable = ref(false)
const ip = ref("")
const timezone = ref("")
const isp = ref("")
const location = ref("")
const lat = ref(0)
const lng = ref(0)

const exploitIpInfos = (publicIp) => {
    getIpInfos(publicIp).then((infos) => {
        if (!infos.latitude) {
            isIpUnlocatable.value = true
        } else {
            isIpUnlocatable.value = false
            ip.value = infos.ip
            timezone.value = infos.timezone
            isp.value = infos.isp
            location.value = `${infos.city}, ${infos.region}, ${infos.country}`
            lat.value = infos.latitude
            lng.value = infos.longitude
        }
    })
}

onMounted(() => {
    getPublicIP().then((publicIp) => {
        exploitIpInfos(publicIp)
    })
})
</script>

<template>
    <header class="header">
        <h1 class="title">IP Adress Tracker</h1>
        <SearchBar
            v-model="value_searched"
            @search="exploitIpInfos(value_searched.trim())"
            class="searchbar"
            :isIpUnlocatable="isIpUnlocatable"
        />
        <InfoBar
            :ip_adress="ip"
            :location="location"
            :timezone="timezone"
            :isp="isp"
            class="infobar"
        />
    </header>
    <DisplayMap :lat="lat" :lng="lng" class="map" />
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
    --gray950: hsl(0, 0%, 17%);
    --gray400: hsl(0, 0%, 58%);
}

* {
    margin: 0;
    padding: 0;
    font-family: "Rubik", sans-serif;
}

html,
body,
#app {
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    display: flex;
    flex-direction: column;
}

.header {
    position: relative;
    background-image: url(/pattern-bg-desktop.png);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em 0.5em 10em;
}

.title {
    color: white;
    margin-bottom: 1em;
    font-weight: 700;
}

.infobar {
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
}

.map {
    height: 100%;
    cursor: default;
}

@media (max-width: 300px) {
    h1 {
        font-size: 1.5rem;
    }
}
</style>
