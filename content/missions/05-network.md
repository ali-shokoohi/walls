{
  "id": "network",
  "chapter": "Build the boundaries",
  "title": "Close the side doors",
  "goal": "Understand default-deny networking.",
  "scene": "A compromised bot wants to upload a private chat to an unfamiliar website. You decide which outside connections its environment should be able to make.",
  "speaker": "Network gatekeeper",
  "message": "Give me an explicit list. Everything not on it stays closed.",
  "task": "Allow only the one route this bot needs in the guide’s design.",
  "options": [
    {
      "title": "Its own controlled proxy",
      "detail": "The proxy checks destinations and supplies the real credentials."
    },
    {
      "title": "Any website if the bot says it is useful",
      "detail": "Let the model decide which sites are trustworthy."
    },
    {
      "title": "A public DNS resolver",
      "detail": "Let it look up arbitrary domain names directly."
    },
    {
      "title": "The other friend’s proxy",
      "detail": "Useful as a backup if its own one fails."
    }
  ],
  "answer": [
    0
  ],
  "success": "One controlled exit. Requests still face the proxy’s checks, and other direct routes remain closed.",
  "lesson": "Default deny means ‘nothing is allowed unless we deliberately allow it.’ An allowlist is smaller than a list of every possible bad destination.",
  "why": [
    "The friend’s network has no internet NAT, no external DNS, and a narrowly scoped network rule.",
    "DNS lookups can themselves carry encoded data, so ‘no web browsing’ is not the same as ‘no way out.’",
    "These restrictions are enforced by the network and proxy, not by trusting the model to behave."
  ],
  "term": {
    "word": "Proxy",
    "meaning": "A controlled middle service that handles requests on another system’s behalf."
  },
  "source": "s9",
  "reward": "Gatekeeper",
  "unlocks": [
    "Network"
  ],
  "weight": 5,
  "challenge_type": "multi"
}

Default deny means ‘nothing is allowed unless we deliberately allow it.’ An allowlist is smaller than a list of every possible bad destination.
