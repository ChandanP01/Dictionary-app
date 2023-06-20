const form = document.querySelector('form');
const result = document.querySelector('.result');

const getWordInformation = async (word) => {
  try {
    result.innerHTML = "Fetching data...."
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

  const data = await response.json();
  let definitions = data[0].meanings[0].definitions[0]

  result.innerHTML = `
        <h2><strong>Word : </strong>${data[0].word}</h2>
        <p class="part-of-speech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning : </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
        <p><strong>Example : </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
        <p><strong>Antonyms : </strong></p>
    `;
  // Add Antonyms
  if (definitions.antonyms.length === 0) {
    result.innerHTML += `<span>Not Found</span>`
  } else {
    for (let i = 0; i < definitions.antonyms.length; i++) {
      result.innerHTML += `<li>${definitions.antonyms[i]}</li>`
    }
  }

  result.innerHTML += `<p><strong>Synonyms : </strong></p>`
  // Add Synonyms
  if (definitions.synonyms.length === 0) {
    result.innerHTML += `<span>Not Found</span>`
  } else {
    for (let i = 0; i < definitions.synonyms.length; i++) {
      result.innerHTML += `<li>${definitions.synonyms[i]}</li>`
    }
  }

  // Read More
  result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read more</a></div>`
  
} catch (error) {
    result.innerHTML = `<p>Sorry, the word could not be found</p>`
}
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWordInformation(form.elements[0].value);
});
