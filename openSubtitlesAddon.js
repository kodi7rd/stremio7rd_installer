const openSubtitlesAddon = {
    transportUrl: "https://opensubtitles-v3.strem.io/manifest.json",
    transportName: "",
    manifest: {
        id: "org.stremio.opensubtitlesv3",
        version: "1.0.0",
        name: "OpenSubtitles v3",
        catalogs: [],
        resources: [
            "subtitles"
        ],
        types: [
            "movie",
            "series"
        ],
        idPrefixes: [
            "tt"
        ]
    },
    flags: {
        official: true
    }
};

export default openSubtitlesAddon;
