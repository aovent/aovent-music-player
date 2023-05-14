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

            let audio = document.createElement("audio");
            audio.src = `folder/${item}`;
            audioDiv.append(audio);

            audio.onloadeddata = () => {
                setWidth(audio.duration);
            };
      
            let text = document.createElement("div");
            text.innerHTML = `${String(item.split("-")[0]).toUpperCase()} - ${String(item.split("-")[1].split(".")[0]).toUpperCase()}`
            text.classList.add("audio_name");
            audioDiv.append(text);



            let controlButtons = document.createElement("div");
            controlButtons.classList.add("control_buttons");
            audioDiv.append(controlButtons);

            let buttonPlay = document.createElement("button");
            buttonPlay.classList.add("play_button");
            buttonPlay.innerHTML = "Play";

            let buttonStop = document.createElement("button");
            buttonStop.classList.add("stop_button");
            buttonStop.innerHTML = "Stop";

            let buttonRestart = document.createElement("button");
            buttonRestart.classList.add("restart_button");
            buttonRestart.innerHTML = "Restart";

            controlButtons.append(buttonPlay);
            controlButtons.append(buttonStop);
            controlButtons.append(buttonRestart);



            let audioTime = document.createElement("div");
            audioTime.innerHTML = "0:00";
            audioTime.classList.add("audio_time");
            audioDiv.append(audioTime);

            let audioDuration = document.createElement("div");
            audioDuration.classList.add("audio_duration");
            function setWidth(duration) { audioDuration.style.width = `${Math.trunc(duration)}px`}
            audioDiv.append(audioDuration);

            let durationScrollbar = document.createElement("span");
            durationScrollbar.classList.add("duration_scroller");
            audioDuration.append(durationScrollbar);
        }
    });
});


let timeoutId;
let nowTime = 0;

    // document.querySelector(".play_button").addEventListener("click", () => {
    //     document.querySelector(".play_button").parentElement.parentElement.children[0].play();

    //     const duration = Math.floor(document.querySelector(".play_button").parentElement.parentElement.children[0].duration);
    //     playScroller(duration);
    // });

    // document.querySelector(".stop_button").addEventListener("click", () => {
    //     document.querySelector(".play_button").parentElement.parentElement.children[0].pause();
    //     clearTimeout(timeoutId);
    // });


setTimeout(() => {
    document.querySelectorAll(".play_button").forEach(element => element.addEventListener("click", () => {
        element.parentElement.parentElement.querySelector(".duration_scroller").style.transform = `translateX(0px)`;
        element.parentElement.parentElement.children[0].play();
    
        const duration = Math.floor(element.parentElement.parentElement.children[0].duration);
        playScroller(element, duration);
    }))

    document.querySelectorAll(".stop_button").forEach(element => element.addEventListener("click", () => {
        element.parentElement.parentElement.children[0].pause();
        clearTimeout(timeoutId);
    }));
}, 201) 

    function playScroller(element, duration) {
        let timeOutHTML = element.parentElement.parentElement.querySelector(".audio_time");
        let durationScroller = element.parentElement.parentElement.querySelector(".duration_scroller");
        clearTimeout(timeoutId);

        function updateScroller() {
            if (timeOutHTML.innerHTML.split(":")[1] == 60) {
                timeOutHTML.innerHTML = `${Number(timeOutHTML.innerHTML.split(":")[0]) + 1}:00`
            } else {
                if (timeOutHTML.innerHTML.split(":")[1][0] == "0" && timeOutHTML.innerHTML.split(":")[1].length == 2 && timeOutHTML.innerHTML.split(":")[1][1] != "9") {
                    timeOutHTML.innerHTML = `${timeOutHTML.innerHTML.split(":")[0]}:0${Number(timeOutHTML.innerHTML.split(":")[1]) + 1}`
                } else {
                    timeOutHTML.innerHTML = `${timeOutHTML.innerHTML.split(":")[0]}:${Number(timeOutHTML.innerHTML.split(":")[1]) + 1}`
                }
            }
            

            durationScroller.style.transform = `translateX(${nowTime}px)`;
            nowTime++;

            if (nowTime <= duration) {
                timeoutId = setTimeout(updateScroller, 1000);
            }
        }

        updateScroller();
    }