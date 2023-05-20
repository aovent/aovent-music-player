import { playMusic, stopAllMusic } from "./modules/audioControls.js"; 
import { playerTrackNameSet, scrollbarManager, clearRecursion, clearScrollbar, stopScrollbar} from "./modules/playerControls.js";

let allAudioDivs;

setTimeout(() => {
    allAudioDivs = document.querySelectorAll(".audio_div");
}, 200)


const trackNameSection = document.querySelector(".player_audio_name");
const scrollbar = document.querySelector(".scrollbar_passive");
const playerPrevButton = document.querySelector(".player_previous");
const playerPlayButton = document.querySelector(".player_play");
const playerStopButton = document.querySelector(".player_stop");
const playerNextButton = document.querySelector(".player_next");



const container = document.querySelector(".audio_section");

window.addEventListener('DOMContentLoaded', () => {
    window.api.getFolderContents();
});

window.api.receive('folderContentsResponse', (fileNames) => {
    fileNames.split("=/=").forEach((item, index) => {
        if (index != fileNames.split("=/=").length - 1) {

            let audioDiv = document.createElement("div");
            audioDiv.classList.add("audio_div");
            container.append(audioDiv);

            let audioName = document.createElement("div");
            audioName.classList.add("audio_name");
            let textName = `${item.split(".")[0].split('-')[1]} - ${item.split(".")[0].split('-')[0]}`
            audioName.innerHTML = textName;
            audioDiv.append(audioName);

            let audioDuration = document.createElement("div");
            audioDuration.classList.add("audio_duration");
            audioDuration.innerHTML = "7:90";
            audioDiv.append(audioDuration);

            let audioTag = document.createElement("audio");
            audioTag.src = `../../../../folder/${item}`;
            audioTag.classList.add("audio_audio");
            audioDiv.append(audioTag);

            setTimeout(() => {
                audioDuration.innerHTML = `${(Math.trunc(audioTag.duration) / 60).toFixed(2).split(".")[0]}:${(Math.trunc(audioTag.duration) / 60).toFixed(2).split(".")[1]}`;
            }, 400)
        }
    });

    setTimeout(() => {
        function startingPlay(audio, audioTag) {
            setTimeout(() => {
                // Reset Scrollbar
                clearScrollbar(scrollbar);
        
                // Stop All Audios
                stopAllMusic(allAudioDivs);
        
                // Start Functions
                clearRecursion();
                setTimeout(() => {playMusic(audioTag);}, 200);
                playerTrackNameSet(trackNameSection, audio);
                scrollbarManager(scrollbar, audio.children[2], 0);
            }, 200)
        }

        allAudioDivs.forEach(audio => audio.addEventListener("click", () => {
            let audioTag = audio.children[2];
        
            startingPlay(audio, audioTag);
        }));
    }, 201)
});

setTimeout(() => {


    function startingPlay(audio, audioTag) {
        setTimeout(() => {
            // Reset Scrollbar
            clearScrollbar(scrollbar);
    
            // Stop All Audios
            stopAllMusic(allAudioDivs);
    
            // Start Functions
            clearRecursion();
            setTimeout(() => {playMusic(audioTag);}, 200);
            playerTrackNameSet(trackNameSection, audio);
            scrollbarManager(scrollbar, audio.children[2], 0);
        }, 200)
    }


    playerStopButton.addEventListener("click", async () => {
        allAudioDivs.forEach(item => {
            if(document.querySelector(".player_audio_name").children[0].innerHTML == item.children[0].textContent.trim().split(" - ")[1] && document.querySelector(".player_audio_name").children[2].innerHTML == item.children[0].textContent.trim().split(" - ")[0]) {
                if (item.children[2].currentTime == 0) {
                    let audioTag = item.children[2];

                    setTimeout(() => {
                        startingPlay(item, audioTag);
                    }, 201)
                } else {
                    item.children[2].pause()
                    clearRecursion();
                }
            } 
        })
    })

    playerPlayButton.addEventListener("click", () => {
        allAudioDivs.forEach(item => {
            if(document.querySelector(".player_audio_name").children[0].innerHTML == item.children[0].textContent.trim().split(" - ")[1] && document.querySelector(".player_audio_name").children[2].innerHTML == item.children[0].textContent.trim().split(" - ")[0]) {
                clearRecursion();
                
                item.children[2].play()

                scrollbarManager(scrollbar, item.children[2], scrollbar.children[0].style.width.split("%")[0]);
            } 
        })
    })

    playerPrevButton.addEventListener("click", () => {
        allAudioDivs.forEach((item, index) => {
            if (document.querySelector(".player_audio_name").children[0].innerHTML == item.children[0].textContent.trim().split(" - ")[1] && document.querySelector(".player_audio_name").children[2].innerHTML == item.children[0].textContent.trim().split(" - ")[0]) {
                if (index == 0) {
                    setTimeout(() => {
                        startingPlay(allAudioDivs[allAudioDivs.length - 1], allAudioDivs[allAudioDivs.length - 1].children[2])
                        setTimeout(() => {playMusic(allAudioDivs[allAudioDivs.length - 1].children[2]);}, 201);
                    }, 201)
                } else {
                    setTimeout(() => {
                        startingPlay(allAudioDivs[index - 1], allAudioDivs[index - 1].children[2])
                        setTimeout(() => {playMusic(allAudioDivs[index - 1].children[2]);}, 201);
                    }, 201)
                }
            } 
        })
    })

    playerNextButton.addEventListener("click", () => {
        allAudioDivs.forEach((item, index) => {
            if(document.querySelector(".player_audio_name").children[0].innerHTML == item.children[0].textContent.trim().split(" - ")[1] && document.querySelector(".player_audio_name").children[2].innerHTML == item.children[0].textContent.trim().split(" - ")[0]) {
                if (index + 1 == allAudioDivs.length) {
                    setTimeout(() => {
                        startingPlay(allAudioDivs[0], allAudioDivs[0].children[2])
                        setTimeout(() => {playMusic(allAudioDivs[0].children[2]);}, 201);
                    }, 201)
                } else {
                    setTimeout(() => {
                        startingPlay(allAudioDivs[index + 1], allAudioDivs[index + 1].children[2])
                        setTimeout(() => {playMusic(allAudioDivs[index + 1].children[2]);}, 201);
                    }, 201)
                }
            } 
        })
    })

}, 201)