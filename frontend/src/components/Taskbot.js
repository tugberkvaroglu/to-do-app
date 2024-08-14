import axios from 'axios';

class Taskbot {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.openai.com/v1/completions'; // Endpoint for OpenAI API
  }

  async sendMessage(prompt) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: "text-davinci-003", // or another model you want to use
          prompt: prompt,
          max_tokens: 150, // Adjust token length as needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`, // Add your API key here
          },
        }
      );

      if (response.data && response.data.choices) {
        return response.data.choices[0].text.trim();
      } else {
        return 'I could not process your request. Please try again.';
      }
    } catch (error) {
      console.error('Error sending message to Taskbot:', error);
      return 'There was an error communicating with the Taskbot. Please try again later.';
    }
  }
}

export default Taskbot;
