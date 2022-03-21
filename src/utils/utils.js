export const decodeWord = (encodedWord) => {
    let decodedWord = ""
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const key = 12;
    if (encodedWord.length === 5) {
        for (let k = 0; k < encodedWord.length; k++) {
            let eachValue = alphabet.indexOf(encodedWord[k].toLowerCase());
            if (eachValue - key < 0) {
                decodedWord += alphabet[eachValue + (26 - key)]
            } else {
                decodedWord += alphabet[eachValue - key]
            }
        }
    }
    return decodedWord;
}