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
            buttonPlay.innerHTML = "<i class='fa-solid fa-play'></i>";

            let buttonStop = document.createElement("button");
            buttonStop.classList.add("stop_button");
            buttonStop.innerHTML = "<i class='fa-solid fa-stop'></i>";

            let buttonRestart = document.createElement("button");
            buttonRestart.classList.add("restart_button");
            buttonRestart.innerHTML = "<i class='fa-solid fa-reply'></i>";

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

setTimeout(() => {
    document.querySelectorAll(".play_button").forEach(element => element.addEventListener("click", () => {
        setTimeout(() => {
            document.querySelectorAll(".play_button").forEach(element => {
                nowTime = 0;
    
                element.parentElement.parentElement.children[0].currentTime = Math.floor(element.parentElement.parentElement.children[0].duration) + 1;
                element.parentElement.parentElement.querySelector(".audio_time").innerHTML = "0:00";
                element.parentElement.parentElement.querySelector(".duration_scroller").style.transform = `translateX(${nowTime}px)`;
            });
        }, 200)

        setTimeout(() => {
            const duration = Math.floor(element.parentElement.parentElement.children[0].duration);
            playScroller(element, duration);
        }, 1000)
    }))

    document.querySelectorAll(".stop_button").forEach(element => element.addEventListener("click", () => {
        element.parentElement.parentElement.children[0].pause();
        clearTimeout(timeoutId);
    }));
}, 201) 

    function playScroller(element, duration) {
        element.parentElement.parentElement.children[0].play();

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

            if (nowTime == duration + 1) {  
                setTimeout(() => {
                    nowTime = 0;

                    durationScroller.style.transform = `translateX(${nowTime}px)`;

                    element.parentElement.parentElement.children[0].play()

                    timeOutHTML.innerHTML = "0:00"

                    playScroller(element, duration);
                }, 1010)
            }

            if (nowTime <= duration) {
                timeoutId = setTimeout(updateScroller, 1000);
            } 
        }

        updateScroller();
    }