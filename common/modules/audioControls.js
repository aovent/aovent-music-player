export function playMusic(element) {
    setTimeout(() => {
        element.play()
    }, 200);
}

export function stopMusic(element) {
    element.pause() 
}

export function stopAllMusic(array) {
    array.forEach(audio => {
        audio.children[2].pause()
        audio.children[2].currentTime = audio.children[2].duration
    })
}