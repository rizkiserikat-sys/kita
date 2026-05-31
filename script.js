const storyNodes = {
    start: {
        text: "Hai Ade... Akhirnya Ade buka web ini juga. Makasih ya udah mau meluangkan waktu sebentar buat melihat apa yang Aa buat ini...",
        speaker: "Aa",
        emotion: "assets/gue-diem.png",
        options: [
            { text: "Hai Aa, ini buat apa?", nextNode: "tanyaTujuan" },
            { text: "Tumben banget Aa bikin ginian?", nextNode: "tanyaTujuan" }
        ]
    },
    tanyaTujuan: {
        text: "Aa sengaja bikin web ini khusus buat Ade. Beberapa hari ini Aa banyak mikir...",
        speaker: "Aa",
        emotion: "assets/gue-bicara.png",
        options: [
            { text: "Mikirin tentang apa, A?", nextNode: "tanyaTujuan2" }
        ]
    },
    tanyaTujuan2: {
        text: "Jujur Ade... Aa kangen banget sama semua memori kita yang dulu. Aa sadar banyak hal yang harusnya bisa Aa perbaiki kemarin.",
        speaker: "Aa",
        emotion: "assets/gue-bicara.png",
        options: [
            { text: "Maksud Aa, memori yang mana?", nextNode: "responCwek" }
        ]
    },
    responCwek: {
        text: "Aa... Ade beneran kangen sama kita yang dulu. Ade ga nyangka Aa bakal bikin ginian buat Ade...",
        speaker: "Ade", 
        emotion: "assets/dia-berbicara.png",
        options: [
            { text: "Aa juga kangen banget sama Ade", nextNode: "lihatMemori" }
        ]
    },
    lihatMemori: {
        text: "Aa kangen banget. Makanya di sini Aa udah kumpulin beberapa foto kita di halaman galeri spesial buat Ade...",
        speaker: "Aa",
        emotion: "assets/gue-diem.png",
        options: [
            { text: "Mana fotonya? Ade mau lihat", nextNode: "pertanyaanInti" }
        ]
    },
    pertanyaanInti: {
        text: "Sebelum kita ke sana, Aa cuma mau tanya satu hal yang paling jujur dari hati Aa. Kita sempat melewati masa sulit kemarin...",
        speaker: "Aa",
        emotion: "assets/gue-bicara.png",
        options: [
            { text: "Mau nanya apa, A?", nextNode: "pertanyaanInti2" }
        ]
    },
    pertanyaanInti2: {
        text: "Apakah masih ada kesempatan kecil buat kita mulai semuanya sama-sama lagi dari awal? Kali ini, Aa janji bakal belajar jadi lebih baik buat Ade...",
        speaker: "Aa",
        emotion: "assets/gue-bicara.png",
        options: [
            { text: "Ade mau lihat fotonya dulu baru jawab", action: "goToGallery" },
            { text: "Yuk A, kita lihat album kenangan kita", action: "goToGallery" }
        ]
    }
};

let currentTextTimeout;

// ==========================================
// 2. FUNGSI UNTUK MENAMPILKAN CERITA & EMOSI
// ==========================================
function showStoryNode(nodeKey) {
    const node = storyNodes[nodeKey];
    if (!node) return;

    const dialogueTextEl = document.getElementById("dialogue-text");
    const optionsContainer = document.getElementById("options-container");
    const charImgEl = document.getElementById("char-img");
    const charNameEl = document.getElementById("char-name");

    // Mengubah gambar karakter secara dinamis sesuai alur
    if (node.emotion && charImgEl) {
        charImgEl.src = node.emotion;
    }

    // Mengubah nama pembicara secara dinamis
    if (node.speaker && charNameEl) {
        charNameEl.innerText = node.speaker;
    }

    optionsContainer.innerHTML = "";
    clearTimeout(currentTextTimeout);

    let currentText = "";
    let index = 0;
    
    function type() {
        if (index < node.text.length) {
            currentText += node.text.charAt(index);
            dialogueTextEl.innerHTML = currentText;
            index++;
            currentTextTimeout = setTimeout(type, 30);
        } else {
            node.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option.text;
                button.classList.add("btn-option");
                
                button.addEventListener("click", () => {
                    playMusic();
                    
                    if (option.action === "goToGallery") {
                        goToGallery();
                    } else if (option.nextNode) {
                        showStoryNode(option.nextNode);
                    }
                });
                optionsContainer.appendChild(button);
            });
        }
    }
    type();
}

// ==========================================
// 3. LOGIKA PERPINDAHAN SCREEN
// ==========================================
function goToGallery() {
    const gameScreen = document.getElementById("game-screen");
    const galleryScreen = document.getElementById("gallery-screen");

    if (gameScreen && galleryScreen) {
        gameScreen.classList.add("hidden");
        galleryScreen.classList.remove("hidden");
    }
}

function goToGame() {
    const gameScreen = document.getElementById("game-screen");
    const galleryScreen = document.getElementById("gallery-screen");

    if (gameScreen && galleryScreen) {
        galleryScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        showStoryNode("start");
    }
}

// ==========================================
// 4. LOGIKA PENGATURAN MUSIK
// ==========================================
function playMusic() {
    const music = document.getElementById("bg-music");
    if (music) {
        if (!music.src || music.src === "" || music.src.endsWith("/")) {
            music.src = "assets/bgm.mp3";
        }
        if (music.paused) {
            music.play().catch(err => {
                console.log("Autoplay ditahan browser.");
            });
        }
    }
}

function startGameNow() {
    const startScreen = document.getElementById("start-screen");
    playMusic();
    if (startScreen) {
        startScreen.style.display = "none";
    }
}

// Ganti bagian paling bawah script.js kamu dengan ini:

// Pastikan fungsi showStoryNode dipanggil dengan aman
// Hapus bagian window.addEventListener di paling bawah, ganti dengan ini:

function startGameNow() {
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    
    // 1. Jalankan musik
    playMusic();
    
    // 2. Sembunyikan layar start
    if (startScreen) {
        startScreen.style.display = "none";
    }
    
    // 3. Tampilkan layar game dan mulai cerita
    if (gameScreen) {
        gameScreen.classList.remove("hidden");
    }
    
    // 4. Mulai cerita
    showStoryNode("start");
}