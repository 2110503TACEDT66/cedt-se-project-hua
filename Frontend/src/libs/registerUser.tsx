export default async function registerUser(payload: UserPayload) {
    const response =  await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...payload
        })
    });

    if (!response.ok) throw new Error("Registration failed");
    console.log("Register Success");

    return response.json();
}