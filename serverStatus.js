import fetch from "node-fetch";

export async function checkServerStatus(ip) {
  try {
    const response = await fetch(`http://${ip}/players.json`, { timeout: 2000 });

    if (!response.ok) return false;

    const data = await response.json();
    return Array.isArray(data);
  } catch (err) {
    return false;
  }
}
