const israelTvAddon = {
    transportUrl: "https://stremioaddon.vercel.app/manifest.json",
    transportName: "",
    manifest: {
        id: "com.dev.israeltv",
        version: "1.0.0",
        description: "watch israel tv",
        logo: "https://stremioaddon.vercel.app/static/israel.png",
        name: "israel tv for stremio",
        catalogs: [
            {
                type: "tv",
                id: "main",
                name: "israel tv"
            }
        ],
        resources: [
            "catalog",
            "stream",
            "meta"
        ],
        types: [
            "tv"
        ],
        idPrefixes: [
            "israeltv-"
        ]
    },
    flags: {}
};

export default israelTvAddon;
