/**
 * Scroll instagram followers and follow them by searching keywords
 * @param {Array} arrayKeywords - Array of keywords to find in the pseudo or name account
 * @param {Number} stopFollow - Stop sending follow request when this number is complete
 */
(function main(...args) {
  if (args.length !== 3) throw new Error("Params incorrect");

  const [arrayKeywords, stopFollow] = args;

  if (!Array.isArray(arrayKeywords)) throw new Error("First params must be array");
  if (typeof stopFollow !== "number") throw new Error("Second params must be number");
  if (!location.host.includes('instagram')) throw new Error('You must be on instagram website');
  if (!location.pathname.includes('followers')) throw new Error('You must be on instagram followers account page');

  const keyWords = arrayKeywords.map(key => key.toLowerCase());
  const accountFollows = [];
  let spliceAt = 0;

  function follow(startAtIndex) {
    const waitBeforeCallFn = Math.floor(Math.random() * (10 - 5 + 1) + 5)
    const getBtn = [...document.getElementsByClassName("sqdOP  L3NKy   y3zKF     ")];
    const arrayParsed = getBtn.slice(spliceAt);

    let indexToStart = startAtIndex ? startAtIndex : 0;
    let returnIndex = 0;
    let loopBreak = false;

    loop1:
    for (let index = indexToStart; index < arrayParsed.length; index++) {
      const [pseudo, ...other] =
        arrayParsed[index].parentElement.parentElement.innerText.split("\n");

      if (
        other[other.length - 1].toLowerCase() === "follow" ||
        other[other.length - 1].toLowerCase() === "s'abonner"
      ) {

        for (let y = 0; y < keyWords.length; y++) {
          if (other.length >= 2) {
            if (pseudo.includes(keyWords[y]) || other[0].includes(keyWords[y])) {
              accountFollows.push({
                pseudo: pseudo,
                name: other[0]
              });

              returnIndex = index += 1;
              loopBreak = true;
              break loop1;
            }
          } else if (pseudo.includes(keyWords[y])) {
            accountFollows.push({
              pseudo: pseudo
            });
  
            returnIndex = index += 1;
            loopBreak = true;
            break loop1;
          }
        }
      }
    }

    console.dir(accountFollows);
    if (loopBreak) {
      if (accountFollows.length < stopFollow) {
        return setTimeout(() => follow(returnIndex), waitBeforeCallFn);
      }
    }

    if (accountFollows.length < stopFollow) {
      spliceAt = getBtn.length;
      const scrollStuff = [...document.getElementsByClassName("isgrP")][0];
      scrollStuff.scrollTop = scrollStuff.scrollHeight;
      return setTimeout(() => follow(returnIndex), waitBeforeCallFn);
    }

    return accountFollows;
  }

  follow();
})(['shi', 'ag'], 10, 5000);
