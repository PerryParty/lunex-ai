exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  const API_TOKEN = process.env.HF_TOKEN; // This pulls your secret key safely

  const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inputs: message, options: { wait_for_model: true } }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data[0]?.generated_text || "I'm thinking..." }),
  };
};
