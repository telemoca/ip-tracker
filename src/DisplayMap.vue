<script setup>
import { onMounted, watch } from "vue"

const props = defineProps({
    lat: Number,
    lng: Number,
})

watch(
    () => [props.lat, props.lng],
    () => {
        let offset = 0.003
        if (window.innerWidth <= 900) {
            offset = 0.007
        }
        map.panTo({ lat: props.lat + offset, lng: props.lng })
        map.removeLayer(marker)
        marker = L.marker([props.lat, props.lng], { icon: icon }).addTo(map)
    }
)

let marker
let map
let icon = L.icon({
    iconUrl: "./icon-location.svg",
    iconAnchor: [23, 56],
    popupAnchor: [0, -63],
})
onMounted(() => {
    let options = {
        zoomControl: false,
        boxZoom: false,
        center: [props.lat, props.lng],
        zoom: 13
    }
    map = L.map("map", options)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20
}).addTo(map);
    marker = L.marker([props.lat, props.lng], { icon: icon }).addTo(map)
})
</script>

<template>
    <div id="map"></div>
</template>

<style>
.leaflet-marker-icon {
    cursor: default;
}
</style>
