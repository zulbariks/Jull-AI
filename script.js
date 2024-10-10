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
    var htmlContent = renderApiResult(data.result);
    console.log(htmlContent);
    answer.innerHTML = htmlContent;
    // answer.innerHTML = data.result;
    console.log(data);
  } catch (error) {
    // console.log(error.message);
    answer.innerHTML = "Error: " + error.message;
  } finally {
    // Sembunyikan loading setelah selesai
    loading.classList.add("hidden");
  }
}

function renderApiResult(result) {
  // Pisahkan teks berdasarkan blok kode dan teks lainnya
  let formattedHtml = result
    .replace(/```html([^`]+```)/g, "<pre><code>$1</code></pre>") // Mengubah blok kode menjadi <pre><code>
    .replace(/### (.+)/g, "<h3>$1</h3>") // Mengubah heading menjadi <h3>
    .replace(/\n/g, "<br>") // Mengganti line break dengan <br>
    .replace(/\- (.+)/g, "<li>$1</li>") // Mengganti bullet point dengan <li>
    .replace(/(\n\n)/g, "</p><p>") // Memisahkan paragraf
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Tambahkan wrapper <p> di awal dan akhir
  return `<p>${formattedHtml}</p>`;
}
