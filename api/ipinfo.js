export default async function handler(req, res) {
    const { ip } = req.query

    try {
        const response = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IP_API_KEY}&ipAddress=${ip}`
        )
        const data = await response.json()

        res.status(200).json({
            ip: data.ip,
            latitude: data.location.lat,
            longitude: data.location.lng,
            timezone: data.location.timezone,
            city: data.location.city,
            region: data.location.region,
            country: data.location.country,
            isp: data.isp,
        })
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" })
    }
}
