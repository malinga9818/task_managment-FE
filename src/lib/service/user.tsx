const URL = process.env.NEXT_PUBLIC_API_URL

export async function profileAPI() {
  const res = await fetch(`${URL}/users/me`, { // adjust endpoint to match your backend
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  console.log("Data",data)
  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true, user: data };
}

export async function profileUpdateAPI(profile: {firstName: string;lastName: string; email: string;}) {
    console.log("profile",profile);
  const res = await fetch(`${URL}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true, user: data };
}     