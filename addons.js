const staticAddons = [
    {
        "transportUrl": "https://stremioaddon.vercel.app/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "com.dev.israeltv",
            "version": "1.0.0",
            "description": "watch israel tv",
            "logo": "https://stremioaddon.vercel.app/static/israel.png",
            "name": "israel tv for stremio",
            "catalogs": [
                {
                    "type": "tv",
                    "id": "main",
                    "name": "israel tv"
                }
            ],
            "resources": [
                "catalog",
                "stream",
                "meta"
            ],
            "types": [
                "tv"
            ],
            "idPrefixes": [
                "israeltv-"
            ]
        },
        "flags": {}
    },
    {
        "transportUrl": "https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "xyz.stremio.wizdom",
            "contactEmail": "maor@magori.online",
            "version": "2.6.2",
            "catalogs": [],
            "resources": [
                "subtitles"
            ],
            "types": [
                "movie",
                "series"
            ],
            "name": "Wizdom Subtitles",
            "description": "An unofficial Stremio addon for Hebrew subtitles from wizdom.xyz. Developed by Maor Development",
            "logo": "https://i.ibb.co/KLYK0TH/wizdon256.png"
        },
        "flags": {}
    },
    {
        "transportUrl": "https://opensubtitles-v3.strem.io/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "org.stremio.opensubtitlesv3",
            "version": "1.0.0",
            "name": "OpenSubtitles v3",
            "catalogs": [],
            "resources": [
                "subtitles"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tt"
            ]
        },
        "flags": {
            "official": true
        }
    }
];
