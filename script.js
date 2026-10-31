/* ALL STAR GAMERS - SUPABASE CONNECTION */

const SUPABASE_URL = "https://vbgkmwryukohawbxmtgw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Pv4j_lSRTiVIg1XD3tpkig_206MZTs_";
let supabaseClient = null;

if (window.supabase) {
    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
    console.log("All Star Gamers database client initialized!");
} else {
    console.warn("Supabase library not loaded. Skipping client initialization.");
}

document.addEventListener("DOMContentLoaded", function () {

    // Join Community button (home page only)
    const joinButton = document.querySelector(".join-btn");
    if (joinButton) {
        joinButton.addEventListener("click", function () {
            alert("🔥 Welcome to All Star Gamers!");
        });
    }

    // Notification button (both pages)
    const notification = document.querySelector(".notification");
    if (notification) {
        notification.addEventListener("click", function () {
            alert("🔔 No new notifications yet.");
        });
    }

    // Game explore buttons (home page)
    const gameButtons = document.querySelectorAll(".game-overlay button");
    gameButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const gameName = button.closest(".game-card").querySelector("h3").textContent;
            alert("🎮 Opening " + gameName + "...");
        });
    });

    // Community cards arrow buttons (home page)
    const arrowBtns = document.querySelectorAll(".arrow-btn");
    arrowBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const title = btn.closest(".community-card").querySelector("h3").textContent;
            alert("🔥 " + title + " — Coming soon!");
        });
    });

    // Bottom navigation
    // Real page links (index.html / explore.html) now work normally.
    // Placeholder links (#) show a coming-soon message.
    const navItems = document.querySelectorAll(".bottom-nav a");
    navItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            const href = item.getAttribute("href");

            if (href === "#") {
                event.preventDefault();
                const label = item.textContent.trim();
                alert("🚧 " + label + " page is coming soon!");
            }
            // For index.html and explore.html the browser will navigate normally.
            // The active class is already set correctly in each HTML file.
        });
    });

    // Explore page — category buttons
    const categories = document.querySelectorAll(".category");
    categories.forEach(function (cat) {
        cat.addEventListener("click",
            function () {
                categories.forEach(function (c) {
                    c.classList.remove("active");
                });
                cat.classList.add("active");
            });
    });

    // Explore page — Follow buttons
    const followBtns = document.querySelectorAll(".follow-btn");
    followBtns.forEach(function (btn) {
        btn.addEventListener("click",
            function () {
                if (btn.textContent.trim() === "+ Follow") {
                    btn.textContent = "Following ✓";
                    btn.style.background = "#b7ff00";
                    btn.style.color = "#0a0b0b";
                } else {
                    btn.textContent = "+ Follow";
                    btn.style.background = "transparent";
                    btn.style.color = "#b7ff00";
                }
            });
    });

    // Explore page — Join Clan buttons
    const joinClanBtns = document.querySelectorAll(".join-clan");
    joinClanBtns.forEach(function (btn) {
        btn.addEventListener("click",
            function () {
                const clanName = btn.closest(".clan-card").querySelector("h3").textContent;
                if (btn.textContent.trim() === "Join") {
                    btn.textContent = "Joined ✓";
                    btn.style.background = "#444";
                    alert("🎉 You joined " + clanName + "!");
                } else {
                    btn.textContent = "Join";
                    btn.style.background = "#b7ff00";
                }
            });
    });

    // Explore page — Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    alert("🔍 Searching for: " + query);
                }
            }
        });
    }

});

/* SAFE SUPABASE CONNECTION TEST */

async function testSupabaseConnection() {
    if (!supabaseClient) {
        console.warn("Supabase client not available. Skipping connection test.");
        return;
    }

    try {
        const {
            data,
            error
        } = await supabaseClient
        .from("profiles")
        .select("id")
        .limit(1);

        if (error) {
            console.error("Supabase test failed:", error);

            alert(
                "Supabase error:\n" +
                error.message +
                "\nCode: " + (error.code || "Unknown") +
                "\nDetails: " + (error.details || "None") +
                "\nHint: " + (error.hint || "None")
            );

            return;
        }

        console.log("Supabase database connection successful!", data);
        alert(
            "Connection successful! 🎮 " +
            "Supabase responded to All Star Gamers."
        );
    } catch (error) {
        console.error("Connection test error:", error);
        alert("Test failed. Check your internet and browser console.");
    }
}

// Only run the test if the client was successfully created
if (supabaseClient) {
    testSupabaseConnection();
}