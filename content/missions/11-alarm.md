{
  "id": "alarm",
  "chapter": "Practice the response",
  "title": "A knock at a forbidden door",
  "goal": "Notice a signal worth investigating.",
  "scene": "The bot usually uses only its permitted services. Today the proxy records an attempt to reach pastebin.com, a destination not allowed by this design.",
  "speaker": "Proxy audit log · simplified",
  "message": "Request rejected: destination not allowed — pastebin.com",
  "task": "How should the operator respond?",
  "options": [
    {
      "title": "Ignore it because the request was blocked",
      "detail": "A stopped attempt cannot teach us anything.",
      "feedback": {
        "reason": "Blocking this request shows one wall worked, not why the unexpected request happened. A misled or compromised bot may keep attempting other actions.",
        "consequence": "Ignoring the event could leave poisoned content, changed state, or an attacker-controlled session undiscovered while the bot continues running."
      }
    },
    {
      "title": "Investigate promptly and check related activity",
      "detail": "A rejection can reveal a misled bot, a compromise, or a configuration problem."
    },
    {
      "title": "Add the website to the allowlist immediately",
      "detail": "Making the warning disappear is the goal.",
      "feedback": {
        "reason": "A rejection is evidence that the request violated policy, not evidence that the policy should be relaxed. Adding the destination removes the wall before you know why it was tested.",
        "consequence": "If the request came from a data-theft attempt, the next upload to that newly allowed website might pass instead of producing a rejection."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "The wall working is good news; the unexpected attempt still matters. Investigate before relaxing the boundary.",
  "lesson": "A rejection is evidence, not a reason to automatically open the door.",
  "why": [
    "The guide monitors proxy rejections, network drops, changed configuration files, and unexpected host logins.",
    "Any unexpected egress from the execution sandbox is especially concerning because it should have no allowed external destination.",
    "Logs can contain sensitive metadata. Protect them, and remember the server operator can see more than a normal bot user."
  ],
  "term": {
    "word": "Audit log",
    "meaning": "A record of actions and decisions that helps an operator understand what happened."
  },
  "source": "s14",
  "reward": "Watchful operator",
  "unlocks": [],
  "weight": 11,
  "challenge_type": "choice"
}

A rejection is evidence, not a reason to automatically open the door.
