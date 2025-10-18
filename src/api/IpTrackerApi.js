export default async function getIpInfos(ip) {
    const response = await fetch(`/api/ipinfo?ip=${ip}`)
    return await response.json()
}
