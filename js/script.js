
const games = [
    {
        id: "EndlessMove",
        name: "EndlessMove",
        category: "Action",
        icon: "images/endmove-icon.png",
        downloads: 0,
        file: "games/app-debug.apk"
    },
    {
        id: "skymen",
        name: "SKY MEN",
        category: "Racing",
        icon: "images/skymen-Icon.png",
        downloads: 0,
        file: "games/SkyMen.apk"
    },
 
];

let selectedCategory = "All";

// Download count browser mein save karna
function getCount(id) {
    return Number(localStorage.getItem("downloads-" + id) || 0);
}

// Games ko screen par dikhana
function showGames() {
    const list = document.getElementById("game-list");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    const filtered = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(search);
        const matchesCategory =
            selectedCategory === "All" ||
            game.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    filtered.forEach(game => {
        const count = getCount(game.id);

        list.innerHTML += `
            <div class="game-card">
               <div class="game-art">
    <img src="${game.icon}" alt="${game.name}">
</div>
                <h3>${game.name}</h3>
                <p>${game.category} · Android · APK</p>
                <p>⬇ ${count} Downloads</p>
                <a class="download"
                   href="${game.file}"
                   download
                   onclick="downloadGame('${game.id}')">
                   ⬇ Download APK
                </a>
            </div>
        `;
    });

    if (filtered.length === 0) {
        list.innerHTML = "<p>No games found.</p>";
    }

    document.getElementById("hero-count").textContent =
        getCount("EndlessMove");
}

// Download button click
function downloadGame(id) {
    const newCount = getCount(id) + 1;
    localStorage.setItem("downloads-" + id, newCount);
    showGames();
}

// Category filter
function filterGames(category) {
    selectedCategory = category;
    showGames();
}

// Search
document.getElementById("search").addEventListener("input", showGames);

// Initial display
showGames();