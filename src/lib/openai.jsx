import axios from "axios";

class OpenClient {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  async completion(messages) {
    const requestData = {
      model: "gpt-4",
      messages,
    };
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        "Error fetching completion from OpenAI API:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Failed to get completion from OpenAI API");
    }
  }
}

const openai = new OpenClient();
export default openai;
