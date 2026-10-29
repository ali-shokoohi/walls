{
  "id": "invitation",
  "chapter": "Before the walls",
  "title": "Your first visitor",
  "goal": "Understand what sharing an AI bot really means.",
  "scene": "A friend asks to use your new AI bot. It can chat, read files, and run programs. Their Telegram account is allowed to use it.",
  "speaker": "Your friend",
  "message": "It’s just a chatbot. What could go wrong if you let me in?",
  "task": "What should you assume before sharing it?",
  "options": [
    {
      "title": "Only a server expert could make it dangerous",
      "detail": "An ordinary message cannot become a computer action.",
      "feedback": {
        "reason": "This assumes that an ordinary message cannot cause a computer action. But this bot already has tools for reading files and running programs; the person asking does not have to implement those actions themselves.",
        "consequence": "For example, someone using the allowed account can ask the bot to read a file. If that file is accessible to an enabled tool, lack of server expertise is not a barrier."
      }
    },
    {
      "title": "An allowed account may trigger every enabled tool",
      "detail": "Someone using that account could also ask the bot to take actions."
    },
    {
      "title": "The bot will recognize every bad request",
      "detail": "Its instructions are enough to protect the server.",
      "feedback": {
        "reason": "This relies on the model reliably recognizing every bad request. Untrusted content can disguise an instruction as a normal part of a document, so that recognition can fail.",
        "consequence": "For example, a document can tell the bot to read private settings as part of an urgent check. If the bot follows it and has access, a safety instruction alone does not stop the read."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Exactly. Access is not just the ability to send messages. It can also be access to whatever tools the bot is allowed to use.",
  "lesson": "An AI agent is a chatbot with hands. Before sharing one, consider what those hands can reach.",
  "why": [
    "No special technical skill is needed to ask an agent to use an enabled tool.",
    "That includes a person who steals your friend’s account.",
    "Models and their instructions are not reliable security boundaries."
  ],
  "term": {
    "word": "AI agent",
    "meaning": "An AI system that can take actions through tools, not just answer in text."
  },
  "source": "s1",
  "reward": "Think in actions, not messages",
  "unlocks": [],
  "weight": 1,
  "challenge_type": "choice"
}
