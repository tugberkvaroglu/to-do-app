import OpenAI from "openai";


const openai = new OpenAI({ apiKey: "sk-2etPEtsXPGngrxz65v3mIGKgWgkcN7p2DTCkVkJM7gT3BlbkFJCttMicCljvsiUM-kt_RQbS0k6Ft_PEaWx6U-SmvhcA", dangerouslyAllowBrowser: true});

class Taskbot {

  async sendMessage(prompt) {
    try {
      const response = await openai.chat.completions.create(
        {
          messages: [{ role: "system", content: "you are a helpfull asistant that helps users with finding new tasks and helping them scedule their tasks."},
            {role: "user", content: prompt}
          ],
          model: "babbage-002", // or another model you want to use
        });
        console.log(response)
      if (response.choices && response.choices.length > 0) {
        return JSON.parse(response.choices[0].text);
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
