export default async function getHotels() {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels`, { next: {tags: ['hotels']}});
    if (!response.ok) throw new Error("Failed to fetch Hotels")

    return response.json();
}