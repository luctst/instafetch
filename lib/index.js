const stopInterval = setInterval(() => {
  followInsta(20);
}, 2000);
let startAt = 0;
let follows = 0;

function followInsta(stopFollow) {
  if (follows === stopFollow) {
    return clearInterval(stopInterval);
  }

  const keyWords = [
    "InteriorStudio",
    "Architecture",
    "Architect",
    "Furniture",
    "Designer",
    "Decorator",
    "Interieur",
    "Mobilier",
    "Meuble",
    "Decorateur",
    "Decoration",
    "Design",
    "Archi",
    "Atelier",
    "Deco",
    "Workshop",
    "Gallery",
    "Galerie",
    "Ceramic",
    "Ceramique",
    "Art",
    "Maison",
    "Home",
    "House",
    "Edition",
    "Collection",
    "Store",
    "Shop",
    "Wood",
    "Creation",
  ].map((key) => key.toLowerCase());
  const getBtn = [...document.getElementsByClassName("sqdOP  L3NKy   y3zKF     ")];
  const arrayParsed = getBtn.slice(startAt);

  startAt = getBtn.length;

  arrayParsed.forEach((btnElement) => {
    if (follows < stopFollow) {
      const [pseudo, ...other] =
        btnElement.parentElement.parentElement.innerText.split("\n");

      if (
        other[other.length - 1].toLowerCase() === "follow" ||
        other[other.length - 1].toLowerCase() === "s'abonner"
      ) {
        keyWords.forEach((word) => {
          if (other.length >= 2) {
            if (pseudo.includes(word) || other[1].includes(word)) {
              btnElement.click();
              follows++;
              console.warn("People follow ->", follows);
            }
          } else if (pseudo.includes(word)) {
            btnElement.click();
            follows++;
            console.warn("People follow ->", follows);
          }
        });
      }
    }
  });

  const scrollStuff = [...document.getElementsByClassName("isgrP")][0];
  scrollStuff.scrollTop = scrollStuff.scrollHeight;
}

/**
 * Scroll instagram followers and follow them by searching keywords
 * @param {Array} arrayKeywords - Array of keywords to find in the pseudo or name account
 * @param {Number} stopFollow - Stop sending follow request when this number is complete
 * @param {Number} waitBeforeCallFn - Timeout in ms before calling next function.
 */
function main(...args) {
  if (args.length !== 3) return new Error("Params incorrect");

  const [arrayKeywords, stopFollow, waitBeforeCallFn] = args;

  if (!Array.isArray(arrayKeywords)) return new Error("First params must be array");
  if (typeof stopFollow !== "number") return new Error("Second params must be number");
  if (typeof waitBeforeCallFn !== "number")
    return new Error("Third params must be number");
}
