const url = "https://localhost:5001/api/v1/get";
const btfsPath = "QmYdDodAxMbt9PVayHAB43BietATomB8JhRgamcWVvUY9o";
const output = "data.json";
const queryParams = new URLSearchParams({
  arg: btfsPath,
  output: output
});

fetch(`${url}?${queryParams}`, { method: "POST" })
  .then(async (response) => {
    const decoder = new TextDecoder();
    const reader = response.body.getReader();
    let chunks = [];
    let decodedValue = '';

    // Read the stream
    while (true) {
      const { value, done } = await reader.read();
      if (done) break; // Exit the loop when done is true
      chunks.push(value);
    }

    // Decode each chunk and concatenate
    chunks.forEach(chunk => {
      decodedValue += decoder.decode(chunk, { stream: true });
    });
    decodedValue += decoder.decode(); // Final flush

    console.log("Complete decoded value:", decodedValue);
    try {
      return JSON.parse(decodedValue.split("~json~")[1].split("\x00")[0]);
    } catch (error) {
      throw new Error('Failed to parse JSON: ' + error.message);
    }
  })
  .then((data) => {
    console.log(data, typeof data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });