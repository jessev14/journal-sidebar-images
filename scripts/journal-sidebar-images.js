const moduleName = "journal-sidebar-images";

Hooks.once("init", () => {
    game.settings.register(moduleName, "enableForGMs", {
        name: "Enable Sidebar Journal Images for GM Users",
        hint: "",
        scope: "world",
        type: Boolean,
        default: true,
        onchange: () => window.location.reload()
    });

    game.settings.register(moduleName, "enableForPlayers", {
        name: "Enable Sidebar Journal Images for Player Users",
        hint: "",
        scope: "world",
        type: Boolean,
        default: true,
        onchange: () => window.location.reload()
    });
});

Hooks.on("renderJournalDirectory", (app, html, data) => {
    if (
        (game.user.isGM && game.settings.get(moduleName, "enableForGMs"))
        || (!game.user.isGM && game.settings.get(moduleName, "enableForPlayers"))
    ) {
        app.documents.forEach(j => {
            if (!j.data.img) return;
            
            const htmlEntry = html.find(`.directory-item.document[data-document-id="${j.id}"]`);
            if (htmlEntry.length !== 1) return;

            htmlEntry.prepend(`<img class="sidebar-image" src="${j.data.img}" title="${j.name}" class="journal-entry-image">`);
        });
    }
});
