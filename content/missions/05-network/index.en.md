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
      "detail": "The proxy checks destinations and supplies the real credentials.",
      "feedback": {
        "reason": "Leaving out the controlled proxy removes the intended route for the bot’s permitted service requests. Keeping unrelated exits closed is not enough if the legitimate route is missing too.",
        "consequence": "With direct internet access blocked and no permitted proxy route, ordinary Telegram or model requests fail as well. A useful design must allow its intended work and reject other traffic."
      }
    },
    {
      "title": "Any website if the bot says it is useful",
      "detail": "Let the model decide which sites are trustworthy.",
      "feedback": {
        "reason": "This gives the security decision back to the same model that may be fooled. A compromised or misled bot can describe an attacker’s site as useful.",
        "consequence": "A poisoned document could persuade the bot to upload a private chat to that site. If the network permits any destination, no external gate stops the upload."
      }
    },
    {
      "title": "A public DNS resolver",
      "detail": "Let it look up arbitrary domain names directly.",
      "feedback": {
        "reason": "An arbitrary DNS lookup is still an outgoing message. Its domain name can contain encoded data even when no web page is opened.",
        "consequence": "For example, a lookup for PRIVATE-DATA.attacker.example can reveal that name to infrastructure controlled by the attacker. Direct DNS therefore opens another possible exit."
      }
    },
    {
      "title": "The other friend’s proxy",
      "detail": "Useful as a backup if its own one fails.",
      "feedback": {
        "reason": "Another friend’s proxy is not this bot’s authorized exit. Permitting that route weakens the intended separation between friends, even if the other proxy has its own credential checks.",
        "consequence": "After a compromise, the attacker could at least connect to and probe the other friend’s proxy. A ‘backup’ exception has created a path that the one-friend boundary was meant to forbid."
      }
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
