{
  "id": "foreign",
  "chapter": "Build the boundaries",
  "title": "The allowed-address trick",
  "goal": "See why an allowed domain is not enough.",
  "scene": "Your proxy allows Telegram. A malicious request tries to send data through an attacker’s own Telegram bot, using the attacker’s token instead of Reza’s replacement token.",
  "speaker": "Suspicious request",
  "message": "I’m going to Telegram, and Telegram is allowed. Please let me through.",
  "task": "What should the proxy do?",
  "options": [
    {
      "title": "Allow it because the website is Telegram",
      "detail": "Every request to an allowed domain is safe."
    },
    {
      "title": "Ask the AI whether the request feels suspicious",
      "detail": "Let the model make the final security decision."
    },
    {
      "title": "Reject it unless it carries Reza’s expected replacement token",
      "detail": "Check identity as well as destination before anything reaches Telegram."
    }
  ],
  "answer": [
    2
  ],
  "success": "The destination check passes, but the credential requirement stops the request. ‘Allowed website’ does not mean ‘allowed use of every account there.’",
  "lesson": "Check both where a request goes and which identity it can use.",
  "why": [
    "The guide uses a proxy option called require to reject requests missing the expected replacement token.",
    "A Telegram 401 error is not proof of proxy rejection: it can mean the request reached Telegram and failed there.",
    "Real implementations must be tested, including how credential requirements behave in proxy tunnel mode."
  ],
  "term": {
    "word": "Allowlist",
    "meaning": "An explicit list of what is permitted. Everything else is denied."
  },
  "source": "s13",
  "reward": "Identity checker",
  "unlocks": [],
  "weight": 7,
  "challenge_type": "choice"
}

Check both where a request goes and which identity it can use.
