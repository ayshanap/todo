let button = document.getElementById('trigger');
let closeBTN = document.getElementById('close');
let toastr = document.getElementById('toastr-container');
let progress = document.getElementById('progress-bar');

button.onclick = function() {
    toastr.style.animation = "show 1s linear forwards, close 1s 5s linear forwards";
    progress.style.animation = "countback 4s 1s linear forwards";
}

closeBTN.onclick = function() {
    toastr.style.animation = "close 1s linear forwards";

}

//, countback 4s 3s linear forwards, close 1s 7s linear forwards