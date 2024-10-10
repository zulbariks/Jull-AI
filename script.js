var question = document.getElementById("question");
var answer = document.getElementById("answer");
var apiUrl = "https://widipe.com/openai";

// Elemen loading yang akan di tampilkan saat fetch
var loading = document.getElementById("loading");

async function sendReq() {
  try {
    // Tampilkan loading dan kosongkan jawaban
    loading.classList.remove("hidden");
    answer.innerHTML = "";

    const url = `${apiUrl}?text=${encodeURIComponent(question.value)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    answer.innerHTML = data.result;
    console.log(data);
  } catch (error) {
    console.log(error.message);
    answer.innerHTML = "Error: " + error.message;
  } finally {
    // Sembunyikan loading setelah selesai
    loading.classList.add("hidden");
  }
}
