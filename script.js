// Build version
const BUILD_VERSION = "2.4.0";
// API
const STREMIO_API_BASE_URL = "https://api.strem.io/api";
const STREMIO_API_LOGIN_URL = `${STREMIO_API_BASE_URL}/login`;
const STREMIO_API_GET_ADDONS_URL = `${STREMIO_API_BASE_URL}/addonCollectionGet`;
const STREMIO_API_SET_ADDONS_URL = `${STREMIO_API_BASE_URL}/addonCollectionSet`;
// Addons exclusion
const CINEMETA_ADDON_ID = 'com.linvo.cinemeta'
const LOCAL_FILES_ADDON_ID = 'org.stremio.local'
const HEB_SUBS_PREMIUM_ADDON_ID = 'heb-subs-premium'
const EXCLUDED_ADDONS_LIST = [HEB_SUBS_PREMIUM_ADDON_ID];

async function defineAddonsJSON(authKey, selectedDebridService, selectedDebridApiKey) {

    async function getInstalledAddons(authKey) {
        console.log("Loading addons...");
        
        const payload = {
            type: "AddonCollectionGet",
            authKey: authKey,
            update: true
        };
        
        try {
            const response = await fetch(STREMIO_API_GET_ADDONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            console.log(data.result.addons)
            return data.result.addons;
            
        } catch (error) {
            console.error("Error fetching user addons:", error);
            document.getElementById('result').textContent = `${error.message}`;
            document.getElementById('result').className = 'result error'; // Apply error class
            throw new Error('Error fetching user addons:', error);
        }
    }

    async function checkForExcludedAddons(installedAddons) {
        try {
            // Loop through installed addons to check for specific ID
            installedAddons.forEach(addon => {
                if (EXCLUDED_ADDONS_LIST.includes(addon.manifest.id)) {
                    console.log(`${addon.manifest.name} installed! (Addon ID: ${addon.manifest.id}) Preserving addon...`);
                    excludedAddonsData.push(addon); // Collect excluded addons JSON data
                }
            });
        } catch (error) {
            console.error('Error in checkForExcludedAddons:', error);
            document.getElementById('result').textContent = `${error.message}`;
            document.getElementById('result').className = 'result error'; // Apply error class
            throw new Error('Error in checkForExcludedAddons:', error);
        }
    }

    async function getMediaFusionEncryptedSecret() {
        
        let mediaFusionSelectedDebridService = "";

        if (selectedDebridService === "realdebrid_service") {
            mediaFusionSelectedDebridService = "realdebrid";
        } else if (selectedDebridService === "premiumize_service") {
            mediaFusionSelectedDebridService = "premiumize";
        }

        const MediaFusionUserSettings = `{"streaming_provider":{"token":"${selectedDebridApiKey}","service":"${mediaFusionSelectedDebridService}","enable_watchlist_catalogs":false,"download_via_browser":false,"only_show_cached_streams":true},"selected_catalogs":[],"selected_resolutions":["4k","2160p","1440p","1080p","720p","576p","480p","360p","240p",null],"enable_catalogs":false,"enable_imdb_metadata":false,"max_size":"inf","max_streams_per_resolution":"999","torrent_sorting_priority":[{"key":"cached","direction":"desc"},{"key":"resolution","direction":"desc"},{"key":"size","direction":"desc"}],"show_full_torrent_name":true,"show_language_country_flag":false,"nudity_filter":["Disable"],"certification_filter":["Disable"],"language_sorting":["English","Tamil","Hindi","Malayalam","Kannada","Telugu","Chinese","Russian","Arabic","Japanese","Korean","Taiwanese","Latino","French","Spanish","Portuguese","Italian","German","Ukrainian","Polish","Czech","Thai","Indonesian","Vietnamese","Dutch","Bengali","Turkish","Greek",null],"quality_filter":["BluRay/UHD","WEB/HD","DVD/TV/SAT","CAM/Screener","Unknown"],"api_password":null,"mediaflow_config":null,"rpdb_config":null,"live_search_streams":false,"contribution_streams":false}`;

        let MediaFusionEncryptedSecret = "invalid_api_key"; // Default in case of failure
            
        // Helper function to add a timeout to the fetch request
        const fetchWithTimeout = (url, options, timeout) => {
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), timeout)
                )
            ]);
        };
        try {
            const response = await fetchWithTimeout('https://mediafusion.elfhosted.com/encrypt-user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: MediaFusionUserSettings
            }, 3000); // 3-second timeout
            
            if (response.ok) { // Check if response status is OK (status in the range 200-299)
                const result = await response.json();
                if (result.status === 'success') {
                    MediaFusionEncryptedSecret = result.encrypted_str;
                }
            } else {
                console.log("Error: Non-200 response status", response.status);
            }
        } catch (error) {
            console.log("Error encrypting MediaFusion data:", error.message);
        }

        return MediaFusionEncryptedSecret;
    }
    
    const installedAddons = await getInstalledAddons(authKey);
    
    let excludedAddonsData = [];
    await checkForExcludedAddons(installedAddons);
    console.log(`excludedAddonsData:\n`, excludedAddonsData); // Pretty-print JSON
    
    // Addons Manifests
    const STREMIO7RD_BUILD_ADDON = {
        "transportUrl": `https://stremio7rd-build.vercel.app/current_version=${BUILD_VERSION},show_catalog_even_if_updated=True/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "org.stremio7rd.com",
            "version": `${BUILD_VERSION}`,
            "name": "Stremio + Real Debrid Israel Build",
            "description": "Stremio + Real Debrid Israel Build Version Check.",
            "logo": "https://i.imgur.com/CRpsxpE.jpeg",
            "resources": [
                "catalog"
            ],
            "types": [
                "other"
            ],
            "catalogs": [
                {
                    "type": "other",
                    "id": "info_catalog",
                    "name": "Stremio + Real Debrid Israel ברוכים הבאים לבילד של"
                }
            ],
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }

    const ISRAEL_TV_ADDON = {
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
                    "name": "ערוצי עידן פלוס"
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
    }

    const USA_TV_ADDON = {
        "transportUrl": "https://848b3516657c-usatv.baby-beamup.club/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.usatv",
            "version": "1.4.0",
            "catalogs": [
                {
                    "name": "USA TV - ערוצים מהעולם",
                    "type": "tv",
                    "id": "all",
                    "extra": [
                        {
                            "name": "genre",
                            "isRequired": false,
                            "options": [
                                "Local",
                                "News",
                                "Sports",
                                "Entertainment",
                                "Premium",
                                "Lifestyle",
                                "Kids",
                                "Documentaries",
                                "Latino"
                            ]
                        }
                    ]
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
                "ustv"
            ],
            "name": "USA TV",
            "description": "USA TV provides access to channels across various categories including local channels, news, sports, entertainment, premium, lifestyle, kids' shows, documentaries, Latino programming, and much more.",
            "logo": "https://848b3516657c-usatv.baby-beamup.club/public/logo.png",
            "background": "https://848b3516657c-usatv.baby-beamup.club/public/background.jpg"
        },
        "flags": {}
    }
    
    const TMDB_ADDON = {
        "transportUrl": "https://94c8cb9f702d-tmdb-addon.baby-beamup.club/%7B%22ratings%22%3A%22on%22%2C%22rpdbkey%22%3A%22t0-free-rpdb%22%2C%22provide_imdbId%22%3A%22true%22%2C%22use_tmdb_prefix%22%3A%22true%22%2C%22language%22%3A%22he-IL%22%7D/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "tmdb-addon",
            "version": "3.0.18",
            "favicon": "https://github.com/mrcanelas/tmdb-addon/raw/main/images/favicon.png",
            "logo": "https://github.com/mrcanelas/tmdb-addon/raw/main/images/logo.png",
            "background": "https://github.com/mrcanelas/tmdb-addon/raw/main/images/background.png",
            "name": "The Movie Database Addon",
            "description": "Metadata provided by TMDB with he-IL language.",
            "resources": [
                "catalog",
                "meta"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tmdb:",
                "tt"
            ],
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            },
            "catalogs": [
                {
                    "id": "tmdb.top",
                    "type": "movie",
                    "name": "TMDB - סרטים פופולרים",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "אימה",
                                "אנימציה",
                                "אקשן",
                                "דוקומנטרי",
                                "דרמה",
                                "הסטוריה",
                                "הרפתקאות",
                                "מדע בדיוני",
                                "מוסיקה",
                                "מותחן",
                                "מלחמה",
                                "מסתורין",
                                "מערבון",
                                "משפחה",
                                "סרט טלויזיה",
                                "פנטזיה",
                                "פשע",
                                "קומדיה",
                                "רומנטי"
                            ]
                        },
                        {
                            "name": "search"
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip",
                        "search"
                    ]
                },
                {
                    "id": "tmdb.year",
                    "type": "movie",
                    "name": "TMDB - Year",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "2024",
                                "2023",
                                "2022",
                                "2021",
                                "2020",
                                "2019",
                                "2018",
                                "2017",
                                "2016",
                                "2015",
                                "2014",
                                "2013",
                                "2012",
                                "2011",
                                "2010",
                                "2009",
                                "2008",
                                "2007",
                                "2006",
                                "2005",
                                "2004"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                },
                {
                    "id": "tmdb.language",
                    "type": "movie",
                    "name": "TMDB - Language",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Hebrew",
                                "Afrikaans",
                                "Albanian",
                                "Arabic",
                                "Basque",
                                "Belarusian",
                                "Bengali",
                                "Breton",
                                "Bulgarian",
                                "Catalan",
                                "Chamorro",
                                "Croatian",
                                "Czech",
                                "Danish",
                                "Dutch",
                                "English",
                                "Esperanto",
                                "Estonian",
                                "Finnish",
                                "French",
                                "Gaelic",
                                "Galician",
                                "Georgian",
                                "German",
                                "Greek",
                                "Hindi",
                                "Hungarian",
                                "Indonesian",
                                "Irish",
                                "Italian",
                                "Japanese",
                                "Kannada",
                                "Kazakh",
                                "Kirghiz",
                                "Korean",
                                "Kurdish",
                                "Latvian",
                                "Lithuanian",
                                "Malay",
                                "Malayalam",
                                "Mandarin",
                                "Marathi",
                                "Norwegian",
                                "Norwegian Bokmål",
                                "Persian",
                                "Polish",
                                "Portuguese",
                                "Punjabi",
                                "Romanian",
                                "Russian",
                                "Serbian",
                                "Sinhalese",
                                "Slovak",
                                "Slovenian",
                                "Somali",
                                "Spanish",
                                "Swahili",
                                "Swedish",
                                "Tagalog",
                                "Tamil",
                                "Telugu",
                                "Thai",
                                "Turkish",
                                "Ukrainian",
                                "Urdu",
                                "Uzbek",
                                "Vietnamese",
                                "Welsh",
                                "Zulu"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                },
                {
                    "id": "tmdb.trending",
                    "type": "movie",
                    "name": "TMDB - Trending",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Day",
                                "Week"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                },
                {
                    "id": "tmdb.top",
                    "type": "series",
                    "name": "TMDB - סדרות פופולריות",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "אנימציה",
                                "אקשן והרפתקאות",
                                "דוקומנטרי",
                                "דיבורים",
                                "דרמה",
                                "חדשות",
                                "ילדים",
                                "מדע בדיוני ופנטזיה",
                                "מלחמה ופוליטיקה",
                                "מסתורין",
                                "מערבון",
                                "משפחה",
                                "סבון",
                                "פשע",
                                "קומדיה",
                                "ריאליטי"
                            ]
                        },
                        {
                            "name": "search"
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip",
                        "search"
                    ]
                },
                {
                    "id": "tmdb.year",
                    "type": "series",
                    "name": "TMDB - Year",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "2024",
                                "2023",
                                "2022",
                                "2021",
                                "2020",
                                "2019",
                                "2018",
                                "2017",
                                "2016",
                                "2015",
                                "2014",
                                "2013",
                                "2012",
                                "2011",
                                "2010",
                                "2009",
                                "2008",
                                "2007",
                                "2006",
                                "2005",
                                "2004"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                },
                {
                    "id": "tmdb.language",
                    "type": "series",
                    "name": "TMDB - Language",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Hebrew",
                                "Afrikaans",
                                "Albanian",
                                "Arabic",
                                "Basque",
                                "Belarusian",
                                "Bengali",
                                "Breton",
                                "Bulgarian",
                                "Catalan",
                                "Chamorro",
                                "Croatian",
                                "Czech",
                                "Danish",
                                "Dutch",
                                "English",
                                "Esperanto",
                                "Estonian",
                                "Finnish",
                                "French",
                                "Gaelic",
                                "Galician",
                                "Georgian",
                                "German",
                                "Greek",
                                "Hindi",
                                "Hungarian",
                                "Indonesian",
                                "Irish",
                                "Italian",
                                "Japanese",
                                "Kannada",
                                "Kazakh",
                                "Kirghiz",
                                "Korean",
                                "Kurdish",
                                "Latvian",
                                "Lithuanian",
                                "Malay",
                                "Malayalam",
                                "Mandarin",
                                "Marathi",
                                "Norwegian",
                                "Norwegian Bokmål",
                                "Persian",
                                "Polish",
                                "Portuguese",
                                "Punjabi",
                                "Romanian",
                                "Russian",
                                "Serbian",
                                "Sinhalese",
                                "Slovak",
                                "Slovenian",
                                "Somali",
                                "Spanish",
                                "Swahili",
                                "Swedish",
                                "Tagalog",
                                "Tamil",
                                "Telugu",
                                "Thai",
                                "Turkish",
                                "Ukrainian",
                                "Urdu",
                                "Uzbek",
                                "Vietnamese",
                                "Welsh",
                                "Zulu"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                },
                {
                    "id": "tmdb.trending",
                    "type": "series",
                    "name": "TMDB - Trending",
                    "pageSize": 20,
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Day",
                                "Week"
                            ],
                            "isRequired": true
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ],
                    "extraRequired": [
                        "genre"
                    ]
                }
            ]
        },
        "flags": {}
    }
    
    const STREAMING_CATALOGS_ADDON = {
        "transportUrl": "https://7a82163c306e-stremio-netflix-catalog-addon.baby-beamup.club/bmZ4LGhibSxkbnAsYW1wLGF0cCxjcnUsaGx1LHBtcDp0MC1mcmVlLXJwZGI6OjE3MjkxOTY4NDM1Njk%3D/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "pw.ers.netflix-catalog",
            "logo": "https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI",
            "version": "1.0.9",
            "name": "Streaming Catalogs",
            "description": "Your favourite streaming services!",
            "catalogs": [
                {
                    "id": "nfx",
                    "type": "movie",
                    "name": "Netflix"
                },
                {
                    "id": "nfx",
                    "type": "series",
                    "name": "Netflix"
                },
                {
                    "id": "hbm",
                    "type": "movie",
                    "name": "HBO Max"
                },
                {
                    "id": "hbm",
                    "type": "series",
                    "name": "HBO Max"
                },
                {
                    "id": "dnp",
                    "type": "movie",
                    "name": "Disney+"
                },
                {
                    "id": "dnp",
                    "type": "series",
                    "name": "Disney+"
                },
                {
                    "id": "hlu",
                    "type": "movie",
                    "name": "Hulu"
                },
                {
                    "id": "hlu",
                    "type": "series",
                    "name": "Hulu"
                },
                {
                    "id": "amp",
                    "type": "movie",
                    "name": "Prime Video"
                },
                {
                    "id": "amp",
                    "type": "series",
                    "name": "Prime Video"
                },
                {
                    "id": "pmp",
                    "type": "movie",
                    "name": "Paramount+"
                },
                {
                    "id": "pmp",
                    "type": "series",
                    "name": "Paramount+"
                },
                {
                    "id": "atp",
                    "type": "movie",
                    "name": "Apple TV+"
                },
                {
                    "id": "atp",
                    "type": "series",
                    "name": "Apple TV+"
                },
                {
                    "id": "cru",
                    "type": "movie",
                    "name": "Crunchyroll"
                },
                {
                    "id": "cru",
                    "type": "series",
                    "name": "Crunchyroll"
                }
            ],
            "resources": [
                "catalog"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tt"
            ],
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }
    
    const CYBERFLIX_ADDON = {
        "transportUrl": "https://cyberflix.elfhosted.com/c/catalogs=cd492,15846,c4e72,071c0,61f57,60f26,5653e,223ce,bfb17,ed8a6,88ef9,f3440%7Crpgb=t0-free-rpdb%7Clang=en/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "marcojoao.ml.cyberflix.catalog",
            "version": "1.6.0",
            "name": "Cyberflix Catalog",
            "description": "Cyberflix, an catalog add-on for Stremio, aggregates the most popular steaming platforms such as Netflix, Amazon Prime or Hulu, and also specific catalogs for Kids, Asian or Anime.",
            "logo": "http://cyberflix.elfhosted.com/logo.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            },
            "idPrefixes": [
                "cyberflix:"
            ],
            "resources": [
                "catalog",
                "meta"
            ],
            "types": [
                "series",
                "movie"
            ],
            "catalogs": [
                {
                    "id": "netflix.popular.movie",
                    "name": "Popular Movies",
                    "type": "Netflix",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "netflix.popular.series",
                    "name": "Popular Series",
                    "type": "Netflix",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Kids",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "disney_plus.popular.movie",
                    "name": "Popular Movies",
                    "type": "Disney Plus",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "disney_plus.popular.series",
                    "name": "Popular Series",
                    "type": "Disney Plus",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Kids",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "hbo_max.popular.movie",
                    "name": "Popular Movies",
                    "type": "Hbo Max",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "hbo_max.popular.series",
                    "name": "Popular Series",
                    "type": "Hbo Max",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Kids",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "amazon_prime.popular.movie",
                    "name": "Popular Movies",
                    "type": "Amazon Prime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "amazon_prime.popular.series",
                    "name": "Popular Series",
                    "type": "Amazon Prime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Kids",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller",
                                "Western"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "apple_tv_plus.popular.movie",
                    "name": "Popular Movies",
                    "type": "Apple Tv Plus",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "apple_tv_plus.popular.series",
                    "name": "Popular Series",
                    "type": "Apple Tv Plus",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Kids",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Short",
                                "Sport",
                                "Thriller"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "anime.popular.movie",
                    "name": "Popular Movies",
                    "type": "Anime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Documentary",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Sport",
                                "Thriller"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                },
                {
                    "id": "anime.popular.series",
                    "name": "Popular Series",
                    "type": "Anime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Animation",
                                "Comedy",
                                "Crime",
                                "Drama",
                                "Family",
                                "Fantasy",
                                "History",
                                "Horror",
                                "Music",
                                "Mystery",
                                "Romance",
                                "Sci-Fi",
                                "Sport",
                                "Thriller"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "extraSupported": [
                        "genre",
                        "skip"
                    ]
                }
            ],
            "background": "http://cyberflix.elfhosted.com/background.png",
            "last_update": "2025-01-11 22:47:39.789510",
            "server_version": "2.0.0"
        },
        "flags": {}
    }
    
    const ANIME_KITSU_ADDON = {
        "transportUrl": "https://anime-kitsu.strem.fun/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.anime.kitsu",
            "version": "0.0.10",
            "name": "Anime Kitsu",
            "description": "Unofficial Kitsu.io anime catalog addon",
            "logo": "https://i.imgur.com/7N6XGoO.png",
            "background": "https://i.imgur.com/ym4n96o.png",
            "resources": [
                "catalog",
                "meta",
                "subtitles"
            ],
            "types": [
                "anime",
                "movie",
                "series"
            ],
            "catalogs": [
                {
                    "id": "kitsu-anime-trending",
                    "name": "Kitsu Trending",
                    "type": "anime"
                },
                {
                    "id": "kitsu-anime-airing",
                    "name": "Kitsu Top Airing",
                    "type": "anime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Comedy",
                                "Drama",
                                "Sci-Fi",
                                "Space",
                                "Mystery",
                                "Magic",
                                "Supernatural",
                                "Police",
                                "Fantasy",
                                "Sports",
                                "Romance",
                                "Cars",
                                "Slice of Life",
                                "Racing",
                                "Horror",
                                "Psychological",
                                "Thriller",
                                "Martial Arts",
                                "Super Power",
                                "School",
                                "Ecchi",
                                "Vampire",
                                "Historical",
                                "Military",
                                "Dementia",
                                "Mecha",
                                "Demons",
                                "Samurai",
                                "Harem",
                                "Music",
                                "Parody",
                                "Shoujo Ai",
                                "Game",
                                "Shounen Ai",
                                "Kids",
                                "Hentai",
                                "Yuri",
                                "Yaoi",
                                "Anime Influenced",
                                "Gender Bender",
                                "Doujinshi",
                                "Mahou Shoujo",
                                "Mahou Shounen",
                                "Gore",
                                "Law",
                                "Cooking",
                                "Mature",
                                "Medical",
                                "Political",
                                "Tokusatsu",
                                "Youth",
                                "Workplace",
                                "Crime",
                                "Zombies",
                                "Documentary",
                                "Family",
                                "Food",
                                "Friendship",
                                "Tragedy"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "genres": [
                        "Action",
                        "Adventure",
                        "Comedy",
                        "Drama",
                        "Sci-Fi",
                        "Space",
                        "Mystery",
                        "Magic",
                        "Supernatural",
                        "Police",
                        "Fantasy",
                        "Sports",
                        "Romance",
                        "Cars",
                        "Slice of Life",
                        "Racing",
                        "Horror",
                        "Psychological",
                        "Thriller",
                        "Martial Arts",
                        "Super Power",
                        "School",
                        "Ecchi",
                        "Vampire",
                        "Historical",
                        "Military",
                        "Dementia",
                        "Mecha",
                        "Demons",
                        "Samurai",
                        "Harem",
                        "Music",
                        "Parody",
                        "Shoujo Ai",
                        "Game",
                        "Shounen Ai",
                        "Kids",
                        "Hentai",
                        "Yuri",
                        "Yaoi",
                        "Anime Influenced",
                        "Gender Bender",
                        "Doujinshi",
                        "Mahou Shoujo",
                        "Mahou Shounen",
                        "Gore",
                        "Law",
                        "Cooking",
                        "Mature",
                        "Medical",
                        "Political",
                        "Tokusatsu",
                        "Youth",
                        "Workplace",
                        "Crime",
                        "Zombies",
                        "Documentary",
                        "Family",
                        "Food",
                        "Friendship",
                        "Tragedy"
                    ]
                },
                {
                    "id": "kitsu-anime-popular",
                    "name": "Kitsu Most Popular",
                    "type": "anime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Comedy",
                                "Drama",
                                "Sci-Fi",
                                "Space",
                                "Mystery",
                                "Magic",
                                "Supernatural",
                                "Police",
                                "Fantasy",
                                "Sports",
                                "Romance",
                                "Cars",
                                "Slice of Life",
                                "Racing",
                                "Horror",
                                "Psychological",
                                "Thriller",
                                "Martial Arts",
                                "Super Power",
                                "School",
                                "Ecchi",
                                "Vampire",
                                "Historical",
                                "Military",
                                "Dementia",
                                "Mecha",
                                "Demons",
                                "Samurai",
                                "Harem",
                                "Music",
                                "Parody",
                                "Shoujo Ai",
                                "Game",
                                "Shounen Ai",
                                "Kids",
                                "Hentai",
                                "Yuri",
                                "Yaoi",
                                "Anime Influenced",
                                "Gender Bender",
                                "Doujinshi",
                                "Mahou Shoujo",
                                "Mahou Shounen",
                                "Gore",
                                "Law",
                                "Cooking",
                                "Mature",
                                "Medical",
                                "Political",
                                "Tokusatsu",
                                "Youth",
                                "Workplace",
                                "Crime",
                                "Zombies",
                                "Documentary",
                                "Family",
                                "Food",
                                "Friendship",
                                "Tragedy"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "genres": [
                        "Action",
                        "Adventure",
                        "Comedy",
                        "Drama",
                        "Sci-Fi",
                        "Space",
                        "Mystery",
                        "Magic",
                        "Supernatural",
                        "Police",
                        "Fantasy",
                        "Sports",
                        "Romance",
                        "Cars",
                        "Slice of Life",
                        "Racing",
                        "Horror",
                        "Psychological",
                        "Thriller",
                        "Martial Arts",
                        "Super Power",
                        "School",
                        "Ecchi",
                        "Vampire",
                        "Historical",
                        "Military",
                        "Dementia",
                        "Mecha",
                        "Demons",
                        "Samurai",
                        "Harem",
                        "Music",
                        "Parody",
                        "Shoujo Ai",
                        "Game",
                        "Shounen Ai",
                        "Kids",
                        "Hentai",
                        "Yuri",
                        "Yaoi",
                        "Anime Influenced",
                        "Gender Bender",
                        "Doujinshi",
                        "Mahou Shoujo",
                        "Mahou Shounen",
                        "Gore",
                        "Law",
                        "Cooking",
                        "Mature",
                        "Medical",
                        "Political",
                        "Tokusatsu",
                        "Youth",
                        "Workplace",
                        "Crime",
                        "Zombies",
                        "Documentary",
                        "Family",
                        "Food",
                        "Friendship",
                        "Tragedy"
                    ]
                },
                {
                    "id": "kitsu-anime-rating",
                    "name": "Kitsu Highest Rated",
                    "type": "anime",
                    "extra": [
                        {
                            "name": "genre",
                            "options": [
                                "Action",
                                "Adventure",
                                "Comedy",
                                "Drama",
                                "Sci-Fi",
                                "Space",
                                "Mystery",
                                "Magic",
                                "Supernatural",
                                "Police",
                                "Fantasy",
                                "Sports",
                                "Romance",
                                "Cars",
                                "Slice of Life",
                                "Racing",
                                "Horror",
                                "Psychological",
                                "Thriller",
                                "Martial Arts",
                                "Super Power",
                                "School",
                                "Ecchi",
                                "Vampire",
                                "Historical",
                                "Military",
                                "Dementia",
                                "Mecha",
                                "Demons",
                                "Samurai",
                                "Harem",
                                "Music",
                                "Parody",
                                "Shoujo Ai",
                                "Game",
                                "Shounen Ai",
                                "Kids",
                                "Hentai",
                                "Yuri",
                                "Yaoi",
                                "Anime Influenced",
                                "Gender Bender",
                                "Doujinshi",
                                "Mahou Shoujo",
                                "Mahou Shounen",
                                "Gore",
                                "Law",
                                "Cooking",
                                "Mature",
                                "Medical",
                                "Political",
                                "Tokusatsu",
                                "Youth",
                                "Workplace",
                                "Crime",
                                "Zombies",
                                "Documentary",
                                "Family",
                                "Food",
                                "Friendship",
                                "Tragedy"
                            ]
                        },
                        {
                            "name": "skip"
                        }
                    ],
                    "genres": [
                        "Action",
                        "Adventure",
                        "Comedy",
                        "Drama",
                        "Sci-Fi",
                        "Space",
                        "Mystery",
                        "Magic",
                        "Supernatural",
                        "Police",
                        "Fantasy",
                        "Sports",
                        "Romance",
                        "Cars",
                        "Slice of Life",
                        "Racing",
                        "Horror",
                        "Psychological",
                        "Thriller",
                        "Martial Arts",
                        "Super Power",
                        "School",
                        "Ecchi",
                        "Vampire",
                        "Historical",
                        "Military",
                        "Dementia",
                        "Mecha",
                        "Demons",
                        "Samurai",
                        "Harem",
                        "Music",
                        "Parody",
                        "Shoujo Ai",
                        "Game",
                        "Shounen Ai",
                        "Kids",
                        "Hentai",
                        "Yuri",
                        "Yaoi",
                        "Anime Influenced",
                        "Gender Bender",
                        "Doujinshi",
                        "Mahou Shoujo",
                        "Mahou Shounen",
                        "Gore",
                        "Law",
                        "Cooking",
                        "Mature",
                        "Medical",
                        "Political",
                        "Tokusatsu",
                        "Youth",
                        "Workplace",
                        "Crime",
                        "Zombies",
                        "Documentary",
                        "Family",
                        "Food",
                        "Friendship",
                        "Tragedy"
                    ]
                },
                {
                    "id": "kitsu-anime-list",
                    "name": "Kitsu",
                    "type": "anime",
                    "extra": [
                        {
                            "name": "search",
                            "isRequired": true
                        },
                        {
                            "name": "lastVideosIds",
                            "isRequired": false,
                            "optionsLimit": 20
                        },
                        {
                            "name": "skip"
                        }
                    ]
                }
            ],
            "idPrefixes": [
                "kitsu",
                "mal",
                "anilist",
                "anidb"
            ]
        },
        "flags": {}
    }
    
    const KTUVIT_ADDON = {
        "transportUrl": "https://4b139a4b7f94-ktuvit-stremio.baby-beamup.club/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "me.stremio.ktuvit",
            "contactEmail": "maor@magori.online",
            "version": "0.1.2",
            "catalogs": [],
            "resources": [
                "subtitles"
            ],
            "types": [
                "movie",
                "series"
            ],
            "name": "Ktuvit.me Subtitles",
            "description": "An unofficial Stremio addon for Hebrew subtitles from Ktuvit.me. Developed by Maor Development",
            "logo": "https://i0.wp.com/kodibeginner.com/wp-content/uploads/2020/10/ktuvit-me.jpg?w=300&ssl=1"
        },
        "flags": {}
    }
    
    const WIZDOM_ADDON = {
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
    }
    
    const OPENSUBTITLES_V3_ADDON = {
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
    
    const OPENSUBTITLES_PRO_ADDON = {
        "transportUrl": "https://opensubtitlesv3-pro.dexter21767.com/eyJsYW5ncyI6WyJoZWJyZXciXSwic291cmNlIjoiYWxsIiwiYWlUcmFuc2xhdGVkIjp0cnVlLCJhdXRvQWRqdXN0bWVudCI6dHJ1ZX0=/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.opensubtitlesv3.pro",
            "version": "0.1.0",
            "name": "opensubtitles PRO",
            "description": "ad-free and spam-free subtitles addon",
            "logo": "https://i.imgur.com/cGc1DXB.png",
            "background": "https://github.com/Stremio/stremio-art/raw/main/originals/reiphantomhive1.png",
            "contactEmail": "dexter21767@gmail.com",
            "catalogs": [],
            "resources": [
                "subtitles"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tt",
                "kitsu"
            ],
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    
    const SUBSOURCE_ADDON = {
        "transportUrl": "https://subsource.strem.bar/SGVicmV3L2hpSW5jbHVkZS8=/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.subsource.subtitles",
            "version": "1.0.6",
            "name": "SubSource Subtitles",
            "description": "Unofficial addon for getting subtitles from SubSource.net",
            "logo": "https://raw.githubusercontent.com/nexusdiscord/tv-logo/master/ss.png",
            "background": "https://raw.githubusercontent.com/nexusdiscord/tv-logo/master/backgroundcinema.jpg",
            "resources": [
                "subtitles"
            ],
            "types": [
                "movie",
                "series",
                "subtitles"
            ],
            "idPrefixes": [
                "tt"
            ],
            "catalogs": [],
            "behaviorHints": {
                "configurable": true,
                "configurableRequired": false
            }
        },
        "flags": {}
    }
    
    const YIFY_ADDON = {
        "transportUrl": "https://2ecbbd610840-yifysubtitles.baby-beamup.club/hebrew/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.yifysubtitles",
            "version": "0.0.2",
            "name": "yifysubtitles subtitles by dexter21767",
            "description": "Addon for getting subtitles from yifysubtitles, by Dexter21767.",
            "logo": "https://yifysubtitles.org/images/misc/yifysubtitles-logo-small.png",
            "background": "https://github.com/Stremio/stremio-art/raw/main/originals/Zuupills.png",
            "contactEmail": "ahmidiyasser@gmail.com",
            "catalogs": [],
            "resources": [
                {
                    "name": "subtitles",
                    "types": [
                        "movie"
                    ],
                    "idPrefixes": [
                        "tt"
                    ]
                }
            ],
            "types": [
                "subtitles"
            ],
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    
    const SUBHERO_ADDON = {
        "transportUrl": "https://subhero.onrender.com/%7B%22language%22%3A%22he%22%7D/manifest.json",
        "transportName": "",
        "manifest": {
            "id": "community.subhero.wyzie",
            "version": "1.0.3",
            "name": "SubHero",
            "contactEmail": null,
            "description": "Subtitles with language filtering. Subtitles provided & scraped by Wyzie API.",
            "logo": "https://cdn.icon-icons.com/icons2/3606/PNG/512/sculpture_statue_texture_futuristic_art_geometry_organic_abstract_shape_explode_shae_icon_226539.png",
            "background": "https://w.wallhaven.cc/full/0p/wallhaven-0pjkp9.png",
            "types": [
                "movie",
                "series"
            ],
            "resources": [
                "subtitles"
            ],
            "idPrefixes": [
                "tt"
            ],
            "catalogs": [],
            "addonCatalogs": [],
            "behaviorHints": {
                "adult": false,
                "p2p": false,
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {
            "official": false,
            "protected": false
        }
    }
    
    const TORRENTIO_RD_ADDON = {
        "transportUrl": `https://torrentio.strem.fun/sort=qualitysize%7Cdebridoptions=nodownloadlinks%7Crealdebrid=${selectedDebridApiKey}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "com.stremio.torrentio.addon",
            "version": "0.0.14",
            "name": "Torrentio RD",
            "description": "Provides torrent streams from scraped torrent providers. Currently supports YTS(+), EZTV(+), RARBG(+), 1337x(+), ThePirateBay(+), KickassTorrents(+), TorrentGalaxy(+), MagnetDL(+), HorribleSubs(+), NyaaSi(+), TokyoTosho(+), AniDex(+), Rutor(+), Rutracker(+), Comando(+), BluDV(+), Torrent9(+), ilCorSaRoNeRo(+), MejorTorrent(+), Wolfmax4k(+), Cinecalidad(+) and RealDebrid enabled. To configure providers, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/TorBox/Put.io support and other settings visit https://torrentio.strem.fun",
            "catalogs": [
                {
                    "id": "torrentio-realdebrid",
                    "name": "Real Debrid Cloud - נצפה בעבר",
                    "type": "other",
                    "extra": [
                        {
                            "name": "skip"
                        }
                    ]
                }
            ],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                },
                {
                    "name": "meta",
                    "types": [
                        "other"
                    ],
                    "idPrefixes": [
                        "realdebrid"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "background": "https://i.ibb.co/VtSfFP9/t8wVwcg.jpg",
            "logo": "https://i.ibb.co/w4BnkC9/GwxAcDV.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    const TORRENTIO_PM_ADDON = {
        "transportUrl": `https://torrentio.strem.fun/sort=qualitysize%7Cdebridoptions=nodownloadlinks%7Cpremiumize=${selectedDebridApiKey}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "com.stremio.torrentio.addon",
            "version": "0.0.14",
            "name": "Torrentio PM",
            "description": "Provides torrent streams from scraped torrent providers. Currently supports YTS(+), EZTV(+), RARBG(+), 1337x(+), ThePirateBay(+), KickassTorrents(+), TorrentGalaxy(+), MagnetDL(+), HorribleSubs(+), NyaaSi(+), TokyoTosho(+), AniDex(+), Rutor(+), Rutracker(+), Comando(+), BluDV(+), Torrent9(+), ilCorSaRoNeRo(+), MejorTorrent(+), Wolfmax4k(+), Cinecalidad(+) and Premiumize enabled. To configure providers, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/Put.io support and other settings visit https://torrentio.strem.fun",
            "catalogs": [
                {
                    "id": "torrentio-premiumize",
                    "name": "Premiumize Cloud - נצפה בעבר",
                    "type": "other",
                    "extra": [
                        {
                            "name": "skip"
                        }
                    ]
                }
            ],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                },
                {
                    "name": "meta",
                    "types": [
                        "other"
                    ],
                    "idPrefixes": [
                        "premiumize"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "background": "https://i.ibb.co/VtSfFP9/t8wVwcg.jpg",
            "logo": "https://i.ibb.co/w4BnkC9/GwxAcDV.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    
    const MediaFusionEncryptedSecret = await getMediaFusionEncryptedSecret();
    const MEDIAFUSION_RD_ADDON = {
        "transportUrl": `https://mediafusion.elfhosted.com/${MediaFusionEncryptedSecret}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "stremio.addons.mediafusion|elfhostedrd.realdebrid",
            "version": "4.3.6",
            "name": "MediaFusion | ElfHosted RD",
            "contactEmail": "mhdzumair@gmail.com",
            "description": "Universal Stremio Add-on for Movies, Series, Live TV &amp; Sports Events. Source: https://github.com/mhdzumair/MediaFusion",
            "logo": "https://mediafusion.elfhosted.com/static/images/mediafusion-elfhosted-logo.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            },
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series",
                        "tv",
                        "events"
                    ],
                    "idPrefixes": [
                        "tt",
                        "mf",
                        "dl"
                    ]
                },
                {
                    "name": "meta",
                    "types": [
                        "movie",
                        "series",
                        "tv",
                        "events"
                    ],
                    "idPrefixes": [
                        "mf",
                        "dl"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "tv",
                "events"
            ],
            "catalogs": []
        },
        "flags": {}
    }
    const MEDIAFUSION_PM_ADDON = {
        "transportUrl": `https://mediafusion.elfhosted.com/${MediaFusionEncryptedSecret}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "stremio.addons.mediafusion|elfhostedpm.premiumize",
            "version": "4.3.6",
            "name": "MediaFusion | ElfHosted PM",
            "contactEmail": "mhdzumair@gmail.com",
            "description": "Universal Stremio Add-on for Movies, Series, Live TV &amp; Sports Events. Source: https://github.com/mhdzumair/MediaFusion",
            "logo": "https://mediafusion.elfhosted.com/static/images/mediafusion-elfhosted-logo.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            },
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series",
                        "tv",
                        "events"
                    ],
                    "idPrefixes": [
                        "tt",
                        "mf",
                        "dl"
                    ]
                },
                {
                    "name": "meta",
                    "types": [
                        "movie",
                        "series",
                        "tv",
                        "events"
                    ],
                    "idPrefixes": [
                        "mf",
                        "dl"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "tv",
                "events"
            ],
            "catalogs": []
        },
        "flags": {}
    }

        
    let cometSelectedDebridService = "";
    if (selectedDebridService === "realdebrid_service") {
        cometSelectedDebridService = "realdebrid";
    } else if (selectedDebridService === "premiumize_service") {
        cometSelectedDebridService = "premiumize";
    }
    const cometUserSettingsB64 = btoa(`{"indexers":["bitsearch","eztv","thepiratebay","therarbg","yts"],"maxResults":0,"maxResultsPerResolution":0,"maxSize":0,"removeTrash":false,"resultFormat":["All"],"resolutions":["All"],"languages":["All"],"debridService":"${cometSelectedDebridService}","debridApiKey":"${selectedDebridApiKey}","debridStreamProxyPassword":""}`);
    const COMET_RD_ADDON = {
        "transportUrl": `https://comet.elfhosted.com/${cometUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "comet.elfhosted.com",
            "name": "Comet | ElfHosted | RD",
            "description": "Stremio's fastest torrent/debrid search add-on.",
            "version": "1.0.0",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "logo": "https://i.imgur.com/jmVoVMu.jpeg",
            "background": "https://i.imgur.com/WwnXB3k.jpeg",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    const COMET_PM_ADDON = {
        "transportUrl": `https://comet.elfhosted.com/${cometUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "comet.elfhosted.com",
            "name": "Comet | ElfHosted | PM",
            "description": "Stremio's fastest torrent/debrid search add-on.",
            "version": "1.0.0",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "logo": "https://i.imgur.com/jmVoVMu.jpeg",
            "background": "https://i.imgur.com/WwnXB3k.jpeg",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
        
    let cometFRSelectedDebridService = "";
    if (selectedDebridService === "realdebrid_service") {
        cometFRSelectedDebridService = "realdebrid";
    } else if (selectedDebridService === "premiumize_service") {
        cometFRSelectedDebridService = "premiumize";
    }
    const cometFRUserSettingsB64 = btoa(`{"indexers":["yggtorrent","sharewood-api","yggcookie","gktorrent","dmm","yggapi"],"maxResults":0,"maxResultsPerResolution":0,"maxSize":0,"reverseResultOrder":false,"removeTrash":false,"resultFormat":["All"],"resolutions":["All"],"languages":["English"],"debridService":"${cometFRSelectedDebridService}","debridApiKey":"${selectedDebridApiKey}","debridStreamProxyPassword":""}`);
    const COMETFR_RD_ADDON = {
        "transportUrl": `https://comet.stremiofr.com/${cometFRUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "stremio.comet.fr",
            "name": "CometFR | RD",
            "description": "Stremio addons for French content.",
            "version": "1.0.0",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "logo": "https://i.imgur.com/dUL8j6C.png",
            "background": "https://i.imgur.com/WwnXB3k.jpeg",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    const COMETFR_PM_ADDON = {
        "transportUrl": `https://comet.stremiofr.com/${cometFRUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "stremio.comet.fr",
            "name": "CometFR | PM",
            "description": "Stremio addons for French content.",
            "version": "1.0.0",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series",
                "anime",
                "other"
            ],
            "logo": "https://i.imgur.com/dUL8j6C.png",
            "background": "https://i.imgur.com/WwnXB3k.jpeg",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    
    const PEERFLIX_RD_ADDON = {
        "transportUrl": `https://peerflix-addon.onrender.com/language=en%7Cdebridoptions=nocatalog%7Crealdebrid=${selectedDebridApiKey}%7Csort=quality-desc,size-desc/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "com.keopps.peerflix",
            "version": "2.6.2",
            "name": "Peerflix RD",
            "description": "Peerflix proporciona los mejores enlaces en español e inglés de películas y series de TV en Stremio.Para configurar proveedores de chache, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/Put.io/Torbox visita https://peerflix-addon.onrender.com",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series"
            ],
            "background": "https://i.ibb.co/vL3SKgX/peerflix-background-2.jpg",
            "logo": "https://i.ibb.co/9s1GqHn/logo512.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }
    const PEERFLIX_PM_ADDON = {
        "transportUrl": `https://peerflix-addon.onrender.com/language=en%7Cdebridoptions=nodownloadlinks,nocatalog%7Cpremiumize=${selectedDebridApiKey}%7Csort=quality-desc,size-desc/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "com.keopps.peerflix",
            "version": "2.6.2",
            "name": "Peerflix PM",
            "description": "Peerflix proporciona los mejores enlaces en español e inglés de películas y series de TV en Stremio.Para configurar proveedores de chache, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/Put.io/Torbox visita https://peerflix-addon.onrender.com",
            "catalogs": [],
            "resources": [
                {
                    "name": "stream",
                    "types": [
                        "movie",
                        "series"
                    ],
                    "idPrefixes": [
                        "tt",
                        "kitsu"
                    ]
                }
            ],
            "types": [
                "movie",
                "series"
            ],
            "background": "https://i.ibb.co/vL3SKgX/peerflix-background-2.jpg",
            "logo": "https://i.ibb.co/9s1GqHn/logo512.png",
            "behaviorHints": {
                "configurable": true,
                "configurationRequired": false
            }
        },
        "flags": {}
    }

        
    let JackettioSelectedDebridService = "";
    let JackettioHideUncached = "";
    if (selectedDebridService === "realdebrid_service") {
        JackettioSelectedDebridService = "realdebrid";
        JackettioHideUncached = "false";
    } else if (selectedDebridService === "premiumize_service") {
        JackettioSelectedDebridService = "premiumize";
        JackettioHideUncached = "true";
    }
    const JackettioStremioUserSettingsB64 = btoa(`{"maxTorrents":40,"priotizePackTorrents":2,"excludeKeywords":[],"debridId":"${JackettioSelectedDebridService}","hideUncached":${JackettioHideUncached},"sortCached":[["quality",true],["size",true]],"sortUncached":[["quality",true],["size",true]],"forceCacheNextEpisode":false,"priotizeLanguages":[],"indexerTimeoutSec":10,"metaLanguage":"","enableMediaFlow":false,"mediaflowProxyUrl":"","mediaflowApiPassword":"","mediaflowPublicIp":"","qualities":[0,360,480,720,1080,2160],"indexers":["bitsearch","eztv","thepiratebay","therarbg","yts"],"debridApiKey":"${selectedDebridApiKey}"}`);
    const JACKETTIO_RD_ADDON = {
        "transportUrl": `https://jackettio.elfhosted.com/${JackettioStremioUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "jackettio.elfhosted.com",
            "version": "1.7.0",
            "name": "Jackettio RD",
            "description": "Stremio addon that resolve streams using Jackett and Debrid. It seamlessly integrates with private trackers.",
            "icon": "https://jackettio.elfhosted.com/icon",
            "resources": [
                "stream"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tt"
            ],
            "catalogs": [],
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }
    const JACKETTIO_PM_ADDON = {
        "transportUrl": `https://jackettio.elfhosted.com/${JackettioStremioUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "jackettio.elfhosted.com",
            "version": "1.7.0",
            "name": "Jackettio PM",
            "description": "Stremio addon that resolve streams using Jackett and Debrid. It seamlessly integrates with private trackers.",
            "icon": "https://jackettio.elfhosted.com/icon",
            "resources": [
                "stream"
            ],
            "types": [
                "movie",
                "series"
            ],
            "idPrefixes": [
                "tt"
            ],
            "catalogs": [],
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }
        
    let jacketCommunitySelectedDebridService = "";
    if (selectedDebridService === "realdebrid_service") {
        jacketCommunitySelectedDebridService = "realdebrid";
    } else if (selectedDebridService === "premiumize_service") {
        jacketCommunitySelectedDebridService = "premiumize";
    }
    const JacketCommunityStremioUserSettingsB64 = btoa(`{"addonHost":"https://stremio-jackett.elfhosted.com","service":"${jacketCommunitySelectedDebridService}","debridKey":"${selectedDebridApiKey}","maxSize":"0","exclusionKeywords":[],"languages":["en","multi"],"sort":"qualitythensize","resultsPerQuality":"25","maxResults":"100","exclusion":[],"tmdbApi":"","torrenting":false,"debrid":true,"metadataProvider":"cinemeta"}`);
    const JACKET_COMMUNITY_RD_ADDON = {
        "transportUrl": `https://stremio-jackett.elfhosted.com/${JacketCommunityStremioUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "community.aymene69.jackett",
            "icon": "https://i.imgur.com/tVjqEJP.png",
            "version": "4.1.6",
            "catalogs": [],
            "resources": [
                "stream"
            ],
            "types": [
                "movie",
                "series"
            ],
            "name": "Jackett Community RD",
            "description": "Elevate your Stremio experience with seamless access to Jackett torrent links, effortlessly fetching torrents for your selected movies within the Stremio interface.",
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }
    const JACKET_COMMUNITY_PM_ADDON = {
        "transportUrl": `https://stremio-jackett.elfhosted.com/${JacketCommunityStremioUserSettingsB64}/manifest.json`,
        "transportName": "",
        "manifest": {
            "id": "community.aymene69.jackett",
            "icon": "https://i.imgur.com/tVjqEJP.png",
            "version": "4.1.6",
            "catalogs": [],
            "resources": [
                "stream"
            ],
            "types": [
                "movie",
                "series"
            ],
            "name": "Jackett Community PM",
            "description": "Elevate your Stremio experience with seamless access to Jackett torrent links, effortlessly fetching torrents for your selected movies within the Stremio interface.",
            "behaviorHints": {
                "configurable": true
            }
        },
        "flags": {}
    }

    // Build Info Addons
    const BuildInfoAddons = [STREMIO7RD_BUILD_ADDON];

    // TV Addons
    const TVAddonsToggles = [
        { toggleId: 'israel_tv_addon_toggle', addon: ISRAEL_TV_ADDON },
        { toggleId: 'usa_tv_addon_toggle', addon: USA_TV_ADDON }
    ];
    
    let TVAddons = [];
    TVAddonsToggles.forEach(({ toggleId, addon }) => {
        if (document.getElementById(toggleId).checked) {
            TVAddons.push(addon);
        }
    });


    // Catalog Addons 
    let catalogAddons = [];
    
    if (document.getElementById('tmdb_addon_toggle').checked) {
        catalogAddons.push(TMDB_ADDON);
    }

    // Add Stremio's core Cinemeta + Local Files addons
    catalogAddons.push(
        ...installedAddons.filter(addon => addon.manifest.id === CINEMETA_ADDON_ID || addon.manifest.id === LOCAL_FILES_ADDON_ID)
    );
    
    // Conditionally add other catalog addons based on toggles
    if (document.getElementById('streaming_catalogs_addon_toggle').checked) {
        catalogAddons.push(STREAMING_CATALOGS_ADDON);
    }
    if (document.getElementById('cyberflix_addon_toggle').checked) {
        catalogAddons.push(CYBERFLIX_ADDON);
    }
    if (document.getElementById('anime_kitsu_addon_toggle').checked) {
        catalogAddons.push(ANIME_KITSU_ADDON);
    }
    
    
    // Subtitles Addons
    const subtitlesAddonsToggles = [
        { toggleId: 'ktuvit_addon_toggle', addon: KTUVIT_ADDON },
        { toggleId: 'wizdom_addon_toggle', addon: WIZDOM_ADDON },
        { toggleId: 'opensubtitles_v3_addon_toggle', addon: OPENSUBTITLES_V3_ADDON },
        { toggleId: 'opensubtitles_pro_addon_toggle', addon: OPENSUBTITLES_PRO_ADDON },
        { toggleId: 'subsource_addon_toggle', addon: SUBSOURCE_ADDON },
        { toggleId: 'yify_addon_toggle', addon: YIFY_ADDON },
        { toggleId: 'subhero_addon_toggle', addon: SUBHERO_ADDON }
    ];

    let subtitlesAddons = [];
    subtitlesAddonsToggles.forEach(({ toggleId, addon }) => {
        if (document.getElementById(toggleId).checked) {
            subtitlesAddons.push(addon);
        }
    });
    
    // Static RD Addons List
    const rdAddons = [
        { toggleId: 'torrentio_addon_toggle', addon: TORRENTIO_RD_ADDON },
        ...(MediaFusionEncryptedSecret !== "invalid_api_key" ? [
            { toggleId: 'mediafusion_addon_toggle', addon: MEDIAFUSION_RD_ADDON }
        ] : []),
        { toggleId: 'comet_addon_toggle', addon: COMET_RD_ADDON },
        { toggleId: 'cometfr_addon_toggle', addon: COMETFR_RD_ADDON },
        { toggleId: 'peerflix_addon_toggle', addon: PEERFLIX_RD_ADDON },
        { toggleId: 'jackettio_addon_toggle', addon: JACKETTIO_RD_ADDON },
        { toggleId: 'jacket_community_addon_toggle', addon: JACKET_COMMUNITY_RD_ADDON }
    ];

    // Static PM Addons List
    const pmAddons = [
        { toggleId: 'torrentio_addon_toggle', addon: TORRENTIO_PM_ADDON },
        ...(MediaFusionEncryptedSecret !== "invalid_api_key" ? [
            { toggleId: 'mediafusion_addon_toggle', addon: MEDIAFUSION_PM_ADDON }
        ] : []),
        { toggleId: 'comet_addon_toggle', addon: COMET_PM_ADDON },
        { toggleId: 'cometfr_addon_toggle', addon: COMETFR_PM_ADDON },
        { toggleId: 'peerflix_addon_toggle', addon: PEERFLIX_PM_ADDON },
        { toggleId: 'jackettio_addon_toggle', addon: JACKETTIO_PM_ADDON },
        { toggleId: 'jacket_community_addon_toggle', addon: JACKET_COMMUNITY_PM_ADDON }
    ];

    // Select the appropriate addons list based on the selectedDebridService
    const torrentAddonsToggles = selectedDebridService === 'realdebrid_service' ? rdAddons :
                                 selectedDebridService === 'premiumize_service' ? pmAddons : [];

    // Generate the final list of enabled addons
    const torrentAddons = torrentAddonsToggles
        .filter(({ toggleId }) => document.getElementById(toggleId).checked)
        .map(({ addon }) => addon);


    // Combine static addons with excluded addons data
    let combinedAddons = [
        ...BuildInfoAddons,
        ...TVAddons,
        ...catalogAddons,
        ...excludedAddonsData,
        ...subtitlesAddons,
        ...torrentAddons
    ];

    // Check if HEB_SUBS_PREMIUM_ADDON_ID is in the combined addons
    if (combinedAddons.some(addon => addon.manifest.id === HEB_SUBS_PREMIUM_ADDON_ID)) {
        // Show the custom modal
        const modal = document.getElementById('customModal');
        modal.style.display = 'flex';

        // Wait for user's choice
        const userChoice = await new Promise((resolve) => {
            document.getElementById('yesButton').onclick = () => {
                modal.style.display = 'none';
                resolve(true); // User chose "Yes"
            };
            document.getElementById('noButton').onclick = () => {
                modal.style.display = 'none';
                resolve(false); // User chose "No"
            };
        });

        // If the user chose "Yes," remove all other subtitles addons
        if (userChoice) {
            combinedAddons = combinedAddons.filter(addon => !subtitlesAddons.includes(addon));
        }
    }

    console.log(`Final addons JSON array:\n`, combinedAddons); // Pretty-print JSON
    return combinedAddons;
}

async function loginToStremio(email, password) {
    console.log("Logging in...");
    try {
        const response = await fetch(STREMIO_API_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, facebook: false })
        });

        const data = await response.json();
        console.log("Logged in successfully, authKey: " + data.result.authKey);
        return data.result.authKey;
    } catch (error) {
        console.error('Login failed!', error);
        let errorMessage = 'ההתחברות נכשלה! <br><br><a href="https://www.stremio.com/login" target="_blank" style="color: #1e90ff; text-decoration: underline;">לא מצליח להתחבר? ודא את פרטי המשתמש שלך באתר של Stremio</a>'
        document.getElementById('result').innerHTML = errorMessage;
        document.getElementById('result').className = 'result error'; // Apply error class
        throw new Error(errorMessage);
    }
}

async function installAddons(authKey, addons) {

    // Helper function to detect iOS devices
    function detectIOS() {
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            console.log("iOS device detected. Alerting user.")
            alert("המערכת זיהתה שאתה משתמש במכשיר של Apple.\nמכיוון שלא קיימת אפליקציה רשמית - על מנת לצפות בתכנים, השתמש ב-Stremio Web והגדר את אפליקציית VLC כנגן חיצוני.");
        }
    }
    
    console.log("Installing addons...");
    try {
        const response = await fetch(STREMIO_API_SET_ADDONS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: "AddonCollectionSet", authKey, addons })
        });

        const data = await response.json();

        if (data.result?.success) {
            
            console.log('Addons installation complete!');
            alert('התקנת התוספים בוצעה בהצלחה!\nכעת תיפתח אפליקציית Stremio.\nמומלץ להתנתק ולהתחבר מחדש למשתמש.');
            document.getElementById('result').textContent = 'התקנת התוספים בוצעה בהצלחה!';
            document.getElementById('result').className = 'result success'; // Apply success class
            
            // Clear all input fields
            document.getElementById('stremioForm').reset();
            
            updateSelectedDebridServiceLabel();
            
            // Open Stremio home page
            window.open("stremio:///board", "_blank");
            
            // Alert for iOS users
            detectIOS();
            
        } else {
            throw new Error(data.result?.error || 'התרחשה שגיאה בהתקנת התוספים');
        }
        
    } catch (error) {
        console.error('Failed to install addons:', error);
        document.getElementById('result').textContent = `${error.message}`;
        document.getElementById('result').className = 'result error'; // Apply error class
        throw new Error('Failed to install addons:', error);
    }
}

document.getElementById('stremioForm').addEventListener('submit', async function (event) {
    
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const authKey = await loginToStremio(email, password);
    
    const selectedDebridApiKey = document.getElementById('selected_debrid_api_key').value;
    const selectedDebridService = document.getElementById('selectedDebridService').value;
    const addons = await defineAddonsJSON(authKey, selectedDebridService, selectedDebridApiKey);
    
    await installAddons(authKey, addons);
});

function openDebridApiKeyPage() {
    const selectedDebridService = document.getElementById("selectedDebridService").value;

    if (selectedDebridService === "realdebrid_service") {
        // Real Debrid link
        alert("הינך מועבר לאתר של Real Debrid לצורך העתקת מפתח ה-API האישי שלך.\n\nאם הינך מקבל עמוד שגיאה - התחבר למשתמש שלך על ידי לחיצה על Login בראש הדף בצד ימין.");
        window.open("https://real-debrid.com/apitoken", "_blank");
    } else if (selectedDebridService === "premiumize_service") {
        // Premiumize link
        alert("הינך מועבר לאתר של Premiumize לצורך העתקת מפתח ה-API האישי שלך.\n\nיש לוודא שהינך מחובר למשתמש שלך.");
        window.open("https://www.premiumize.me/account", "_blank");
    }
}

function updateSelectedDebridServiceLabel() {
    const selectedDebridService = document.getElementById("selectedDebridService").value;
    const selectedDebridServiceLabel = document.getElementById("selectedDebridServiceLabel");

    if (selectedDebridService === "realdebrid_service") {
        selectedDebridServiceLabel.textContent = "מפתח API של Real Debrid";
    } else if (selectedDebridService === "premiumize_service") {
        selectedDebridServiceLabel.textContent = "מפתח API של Premiumize";
    }
}

// Enforce that at least one toggle addon is selected
function enforceAtLeastOneSelectedForTorrents() {
    const torrentCheckboxes = [
        document.getElementById('torrentio_addon_toggle'),
        document.getElementById('mediafusion_addon_toggle'),
        document.getElementById('comet_addon_toggle'),
        document.getElementById('cometfr_addon_toggle'),
        document.getElementById('peerflix_addon_toggle'),
        document.getElementById('jackettio_addon_toggle'),
        document.getElementById('jacket_community_addon_toggle')
    ];

    torrentCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const isAnyChecked = torrentCheckboxes.some(cb => cb.checked);
            if (!isAnyChecked) {
                checkbox.checked = true; // Keep at least one checked
            }
        });
    });
}

// Function to update the visibility of torrent addons based on the selected Debrid service
function updateTorrentsAddonsVisibility() {
    const selectedDebridService = document.getElementById("selectedDebridService").value;

    // Only target toggle items for torrent addons that have the 'data-debrid-service' attribute
    const toggleItems = document.querySelectorAll('.toggle-item[data-debrid-service]');

    toggleItems.forEach(item => {
        const debridServices = item.getAttribute('data-debrid-service').split(' ');

        // Show or hide based on whether the selected Debrid service matches
        if (debridServices.includes(selectedDebridService)) {
            item.style.display = 'block'; // Show item
        } else {
            item.style.display = 'none'; // Hide item
        }
    });
}

// Function to update the build version element
function updateBuildVersionInPage() {
    document.getElementById("build-version").textContent = `גרסת בילד: ${BUILD_VERSION}`;
}

// Event listener for Debrid service change
document.getElementById('selectedDebridService').addEventListener('change', updateTorrentsAddonsVisibility);

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    updateBuildVersionInPage();
    updateTorrentsAddonsVisibility();
    enforceAtLeastOneSelectedForTorrents(); // Assuming this function handles the check for at least one selection
});