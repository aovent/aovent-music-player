import { stopAllMusic, playMusic } from "./audioControls.js";

let timeoutId;

export function playerTrackNameSet(selector, audio) {
    selector.children[0].innerHTML = audio.children[0].innerHTML.trim().split(" - ")[1];
    selector.children[2].innerHTML = audio.children[0].innerHTML.trim().split(" - ")[0];
}

function startingPlay(audio, audioTag) {
    const scrollbar = document.querySelector(".scrollbar_passive");
    const trackNameSection = document.querySelector(".player_audio_name");

    // Reset Scrollbar
    clearScrollbar(scrollbar);

    // Stop All Audios
    let allAudioDivs;

    setTimeout(() => {
        allAudioDivs = document.querySelectorAll(".audio_div");
        stopAllMusic(allAudioDivs);
    }, 200)

    // Start Functions
    clearRecursion();
    setTimeout(() => {playMusic(audioTag);}, 200);
    playerTrackNameSet(trackNameSection, audio);
    scrollbarManager(scrollbar, audio.children[2], 0);
}

export function scrollbarManager(selector, audio, scrollbarProgressGiven) {
    let scrollbar = selector.children[0];
    let scrollbarProgress = Number(scrollbarProgressGiven);
    let nowProcents = 0;

    let addTime = () => {
      if (nowProcents >= audio.duration) {
        audio.currentTime = 0;
        audio.pause();
        clearScrollbar(selector);
        nextTrackAuto()
        return;
      }
  
      nowProcents += audio.duration / 100;
      scrollbarProgress += 1;
  
      scrollbar.style.cssText = `width: ${scrollbarProgress}%;`;
  
      timeoutId = setTimeout(() => {
        addTime();
      }, audio.duration / 10 * 100);
    };
  
    timeoutId = setTimeout(() => {
      addTime();
    }, audio.duration / 10 * 100);
}
export function clearRecursion() {
    clearTimeout(timeoutId);
}

export function clearScrollbar(scrollbar) {
    scrollbar.children[0].style.width = "0%";
}

export function stopScrollbar() {
    clearTimeout(timeoutId);
}

function nextTrackAuto() {
    let allAudioDivs;

    setTimeout(() => {
        allAudioDivs = document.querySelectorAll(".audio_div");

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
    }, 200)
}