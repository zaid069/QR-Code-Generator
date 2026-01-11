const qrTextInput = document.getElementById("qr-text");
const qrSizeSelect = document.getElementById("qr-size");
const generateBtn = document.getElementById("generate-btn");
const qrContainer = document.getElementById("qrcode");
const downloadLink = document.getElementById("download-link");

let qr;

function generateQRCode() {
  const text = qrTextInput.value.trim();
  const size = parseInt(qrSizeSelect.value, 10);

  if (!text) {
    alert("Please enter some text or a URL.");
    return;
  }

  qrContainer.innerHTML = "";

  qr = new QRCode(qrContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  setTimeout(setupDownload, 300);
}

function setupDownload() {
  let img = qrContainer.querySelector("img");
  let canvas = qrContainer.querySelector("canvas");

  let dataUrl = "";

  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img && img.src) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    downloadLink.href = dataUrl;
    downloadLink.style.display = "block";
  } else {
    downloadLink.style.display = "none";
  }
}

generateBtn.addEventListener("click", generateQRCode);

qrTextInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateQRCode();
  }
});
