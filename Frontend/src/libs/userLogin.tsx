export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  console.log("Me got email", userEmail);
  console.log("Me got password", userPassword);
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
    console.log("Me got response", response);
    return response;
}
