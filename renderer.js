const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
    window.api.getFolderContents();
});

window.api.receive('folderContentsResponse', (fileNames) => {
    fileNames.split("=/=").forEach((item, index) => {
        if (index != fileNames.split("=/=").length - 1) {
            let audioDiv = document.createElement("div");
            audioDiv.classList.add("audio_div");
            container.append(audioDiv);

            let text = document.createElement("p");
            text.innerHTML = `${String(item.split("-")[0]).toUpperCase()} - ${String(item.split("-")[1].split(".")[0]).toUpperCase()}`
            audioDiv.append(text);

            let audio = document.createElement("audio");
            audio.controls = true;
            audioDiv.append(audio);

            let source = document.createElement("source");
            source.src = `folder/${item}`;
            audio.append(source);            
        }
      });
});


let timeoutId;
let nowTime = 0;

document.querySelector(".play_button").addEventListener("click", () => {
    document.querySelector(".play_button").parentElement.parentElement.children[0].play();

    const duration = Math.floor(document.querySelector(".play_button").parentElement.parentElement.children[0].duration);
    playScroller(duration);
});

document.querySelector(".stop_button").addEventListener("click", () => {
    document.querySelector(".play_button").parentElement.parentElement.children[0].pause();
    clearTimeout(timeoutId);
});

function playScroller(duration) {
    clearTimeout(timeoutId);

    function updateScroller() {
        document.querySelector('.duration_scroller').style.transform = `translateX(${nowTime}px)`;
        nowTime++;

        if (nowTime <= duration) {
        timeoutId = setTimeout(updateScroller, 1000);
        }
    }

    updateScroller();
}
