import httpx

NOMINATIM_BASE = "https://nominatim.openstreetmap.org"
WIKIPEDIA_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary"

# Nominatim's usage policy requires apps to identify themselves —
# requests without a proper User-Agent get silently blocked/empty results.
# https://operations.osmfoundation.org/policies/nominatim/
HEADERS = {
    "User-Agent": "YatraSphere/1.0 (student travel app; contact: rohanvishwakarma2426@gmail.com)",
    "Accept-Language": "en",
}


async def fetch_destination_from_nominatim(query: str, limit: int = 5):
    """Free, keyless place search via OpenStreetMap's Nominatim."""

    url = f"{NOMINATIM_BASE}/search"
    params = {
        "q": query,
        "format": "jsonv2",
        "addressdetails": 1,
        "limit": limit,
    }

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url, params=params, headers=HEADERS)

    print(f"[Nominatim] status={response.status_code} query='{query}' results={len(response.json()) if response.status_code == 200 else 'N/A'}")

    if response.status_code != 200:
        print(f"[Nominatim] ERROR body: {response.text[:300]}")
        return []

    return response.json()


async def fetch_wikipedia_summary(place_name: str):
    """Free Wikipedia summary — gives us a real photo + short description
    for a place. Returns None if the place has no Wikipedia page."""

    url = f"{WIKIPEDIA_BASE}/{place_name}"

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url, headers=HEADERS)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "description": data.get("extract"),
        "image": (data.get("thumbnail") or {}).get("source")
        or (data.get("originalimage") or {}).get("source"),
    }