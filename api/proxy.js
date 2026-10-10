module.exports = async (req, res) => {
  const u = req.query.url;
  if (!u || !/^https?:\/\//.test(u)) return res.status(400).send("bad url");
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    res.setHeader("Content-Type", r.headers.get("content-type") || "text/html");
    res.send(await r.text());
  } catch (e) { res.status(500).send("fetch failed"); }
};
