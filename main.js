const imgFileInp = document.querySelector('#imgFileInp');
const topTextInp = document.querySelector('#topTextInp');
const btmTextInp = document.querySelector('#bottomTextInp');
const canvas = document.querySelector('#meme');
const btn = document.querySelector("#download");
const p = document.querySelector("#p");

imgFileInp.value = "";
topTextInp.value = "";
btmTextInp.value = "";

let image;

imgFileInp.addEventListener("change", () => {
    const imgDataUrl = URL.createObjectURL(imgFileInp.files[0]);

    image = new Image();
    image.src = imgDataUrl;


    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInp.value, btmTextInp.value);
    }, { once: true });
    topTextInp.style.display = "block";
    btmTextInp.style.display = "block";
    btn.style.display = "block";
    p.style.display = "none";
});

topTextInp.addEventListener("keyup", () => {
    updateMemeCanvas(canvas, image, topTextInp.value, btmTextInp.value);
});

btmTextInp.addEventListener("keyup", () => {
    updateMemeCanvas(canvas, image, topTextInp.value, btmTextInp.value);
});

btn.addEventListener("click", () => {
    download();
});

function download() {
    var link = document.createElement('a');
    link.download = 'meme.png';
    link.href = document.getElementById('meme').toDataURL();
    link.click();
};

function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    //Update canvas background

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0);

    //prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px Impact`;

    //Add top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    //Add bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}