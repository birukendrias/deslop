const BANNED = [
  "delve", "delves", "delving", "tapestry", "testament to", "vibrant", "pivotal",
  "intricate", "meticulous", "bolster", "garner", "underscore", "interplay",
  "multifaceted", "foster", "leverage", "utilize", "commence", "facilitate",
  "encompass", "paramount", "groundbreaking", "cutting-edge", "game-changing",
  "game-changer", "transformative", "revolutionize", "revolutionise", "seamless",
  "seamlessly", "robust", "comprehensive", "harnessing", "spearheading",
  "showcasing", "unprecedented", "remarkable", "synergy", "synergies",
  "pain points", "moving forward", "touch base", "circle back", "deep dive",
  "let's dive in", "dive deeper", "in today's world", "in today's landscape",
  "it goes without saying", "at the end of the day", "when it comes to",
];

function stripEmoji(s) {
  return s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "");
}

function deslop(text) {
  let out = stripEmoji(text);
  out = out.replace(/\u2014|\u2013/g, ", ");
  out = out.replace(/\bnot just\b([^.]*?),\s*but\b/gi, "$1");
  out = out.replace(/\bit'?s not (just )?about\b([^.]*?);\s*it'?s\b/gi, "It is");
  out = out.replace(/\b(Moreover|Furthermore|Additionally|Notably|Importantly),?\s+/gi, "");
  out = out.replace(/\b(In conclusion|To summarize|In summary),?\s+/gi, "");
  for (const w of BANNED) {
    const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    out = out.replace(re, "");
  }
  out = out.replace(/[ \t]{2,}/g, " ");
  out = out.replace(/\n{3,}/g, "\n\n");
  out = out.replace(/ +\n/g, "\n");
  return out.trim();
}

const input = document.getElementById("in");
const output = document.getElementById("out");
document.getElementById("run").addEventListener("click", () => {
  output.value = deslop(input.value);
});
document.getElementById("copy").addEventListener("click", async () => {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
});
