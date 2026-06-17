async function runTests() {
  console.log("Starting authentication API tests with fetch...");
  const timestamp = Date.now();
  const testUser = {
    name: "Test User",
    email: `testuser_${timestamp}@example.com`,
    password: "Password123"
  };

  // 1. Test registration
  try {
    console.log(`Attempting to register: ${testUser.email}`);
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const regData = await regRes.json();
    console.log(`Registration Response Status: ${regRes.status}`);
    console.log("Registration Response Data:", regData);

    if (regRes.ok) {
      // 2. Test login
      console.log(`Attempting to login: ${testUser.email}`);
      const loginRes = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      const loginData = await loginRes.json();
      console.log(`Login Response Status: ${loginRes.status}`);
      console.log("Login Successful:", loginData);
    }

  } catch (err) {
    console.error("API test failed:", err.message);
  }
}

runTests();
