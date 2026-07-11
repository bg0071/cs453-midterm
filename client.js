const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);

  let body = null;

  if (response.status !== 204) {
    body = await response.json();
  }

  console.log(
    `${options.method || "GET"} ${path} -> ${response.status}`
  );

  if (body !== null) {
    console.log(JSON.stringify(body, null, 2));
  }

  return {
    status: response.status,
    body
  };
}

async function runClientDemo() {
  try {
    console.log("\n1. Health check");
    await request("/health");

    console.log("\n2. Create a task");
    const created = await request("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Finish CS453 midterm",
        course: "CS453",
        completed: false
      })
    });

    const createdTaskId = created.body.id;

    console.log("\n3. List all tasks");
    await request("/api/tasks");

    console.log("\n4. Get the created task");
    await request(`/api/tasks/${createdTaskId}`);

    console.log("\n5. Update the created task");
    await request(`/api/tasks/${createdTaskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: true
      })
    });

    console.log("\n6. Delete the created task");
    await request(`/api/tasks/${createdTaskId}`, {
      method: "DELETE"
    });

    console.log("\nClient demonstration completed.");
  } catch (error) {
    console.error("Client request failed:", error.message);
    console.error(
      "Make sure the server is running at http://localhost:3000."
    );
    process.exitCode = 1;
  }
}

runClientDemo();