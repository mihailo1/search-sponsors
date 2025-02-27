export default async function handler(req, res) {
    try {
        const { query } = req; // Get query params from request
        const searchQuery = query.q || "Next.js"; // Default query if none provided

        const response = await fetch(`https://www.bing.com/search?q=${searchQuery}`, {
            headers: { "User-Agent": "Mozilla/5.0" }, // Mimic a browser request
        });

        const data = await response.text();
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
