export default async function handler(req, res) {
  try {
    const projectId = process.env.VERCEL_PROJECT_ID;
    const token = process.env.VERCEL_ANALYTICS_TOKEN;

    const response = await fetch(
      `https://api.vercel.com/v2/insights/analytics/${projectId}/timeseries?range=7d`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Analytics error" });
  }
}
