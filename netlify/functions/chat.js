exports.handler = async (event) => {
    // 1. Get the message from the user
    const { message } = JSON.parse(event.body);
    
    // 2. This pulls your token from Netlify's secret settings
    const token = process.env.HF_TOKEN; 

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                inputs: message, 
                options: { wait_for_model: true } 
            }),
        });

        const result = await response.json();
        const reply = result[0]?.generated_text || "I'm a bit sleepy... try again?";

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: reply })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "Connection error. Check your API token!" })
        };
    }
};
