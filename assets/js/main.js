import { createI18n } from "./core/i18n.js";
import { startGame } from "./app.js";

const readData = (id) => JSON.parse(document.getElementById(id).textContent);
const i18n = createI18n({
  locale: document.documentElement.lang,
  direction: document.documentElement.dir,
  strings: readData("game-ui"),
});
// Access to localStorage can itself throw in restricted browsing contexts.
let storage;
try {
  storage = window.localStorage;
} catch {
  storage = null;
}
startGame({ missions: readData("mission-data"), i18n, storage });
