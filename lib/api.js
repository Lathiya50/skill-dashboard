export async function fetchUsers() {
  const response = await fetch("https://forinterview.onrender.com/people");
  return response.json();
}

export async function fetchUserData(userId) {
  const response = await fetch(
    `https://forinterview.onrender.com/people/${userId}`
  );
  return response.json();
}
