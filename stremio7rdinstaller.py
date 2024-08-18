import requests
import json
import sys

STREMIO_API_BASE_URL = "https://api.strem.io/api"
STREMIO_API_LOGIN_URL = f"{STREMIO_API_BASE_URL}/login"
# STREMIO_API_GET_ADDONS_URL = f"{STREMIO_API_BASE_URL}/addonCollectionGet"
STREMIO_API_SET_ADDONS_URL = f"{STREMIO_API_BASE_URL}/addonCollectionSet"


def set_torrentio_rd_api_key(real_debrid_api_key='empty'):

    addons_json_array = {
        "result": {
            "addons": [
                {
                    "transportUrl": "https://94c8cb9f702d-tmdb-addon.baby-beamup.club/%7B%22language%22%3A%22he-IL%22%7D/manifest.json",
                    "transportName": "",
                    "manifest": {
                        "id": "tmdb-addon",
                        "version": "3.0.14",
                        "name": "The Movie Database Addon",
                        "contactEmail": None,
                        "description": "Metadata provided by TMDB with he-IL language.",
                        "logo": "https://github.com/mrcanelas/tmdb-addon/raw/main/images/logo.png",
                        "background": "https://github.com/mrcanelas/tmdb-addon/raw/main/images/background.png",
                        "types": [
                            "movie",
                            "series"
                        ],
                        "resources": [
                            "catalog",
                            "meta"
                        ],
                        "idPrefixes": [
                            "tmdb:"
                        ],
                        "catalogs": [
                            {
                                "id": "tmdb.top",
                                "type": "movie",
                                "name": "TMDB - Popular",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
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
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "search",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.year",
                                "type": "movie",
                                "name": "TMDB - By Year",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.language",
                                "type": "movie",
                                "name": "TMDB - By Language",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                            "Vietnamese",
                                            "Welsh",
                                            "Zulu"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.trending",
                                "type": "movie",
                                "name": "TMDB - Trending",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
                                        "options": [
                                            "Day",
                                            "Week"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.top",
                                "type": "series",
                                "name": "TMDB - Popular",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
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
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "search",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.year",
                                "type": "series",
                                "name": "TMDB - By Year",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.language",
                                "type": "series",
                                "name": "TMDB - By Language",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                            "Vietnamese",
                                            "Welsh",
                                            "Zulu"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "tmdb.trending",
                                "type": "series",
                                "name": "TMDB - Trending",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
                                        "options": [
                                            "Day",
                                            "Week"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            }
                        ],
                        "addonCatalogs": [],
                        "behaviorHints": {
                            "adult": False,
                            "p2p": False,
                            "configurable": True,
                            "configurationRequired": False
                        }
                    },
                    "flags": {
                        "official": False,
                        "protected": False
                    }
                },
                {
                    "transportUrl": "https://v3-cinemeta.strem.io/manifest.json",
                    "transportName": "",
                    "manifest": {
                        "id": "com.linvo.cinemeta",
                        "version": "3.0.12",
                        "name": "Cinemeta",
                        "contactEmail": None,
                        "description": "The official addon for movie and series catalogs",
                        "logo": None,
                        "background": None,
                        "types": [
                            "movie",
                            "series"
                        ],
                        "resources": [
                            "catalog",
                            "meta",
                            "addon_catalog"
                        ],
                        "idPrefixes": [
                            "tt"
                        ],
                        "catalogs": [
                            {
                                "id": "top",
                                "type": "movie",
                                "name": "Popular",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
                                        "options": [
                                            "Action",
                                            "Adventure",
                                            "Animation",
                                            "Biography",
                                            "Comedy",
                                            "Crime",
                                            "Documentary",
                                            "Drama",
                                            "Family",
                                            "Fantasy",
                                            "History",
                                            "Horror",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Sport",
                                            "Thriller",
                                            "War",
                                            "Western"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "search",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "top",
                                "type": "series",
                                "name": "Popular",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
                                        "options": [
                                            "Action",
                                            "Adventure",
                                            "Animation",
                                            "Biography",
                                            "Comedy",
                                            "Crime",
                                            "Documentary",
                                            "Drama",
                                            "Family",
                                            "Fantasy",
                                            "History",
                                            "Horror",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Sport",
                                            "Thriller",
                                            "War",
                                            "Western",
                                            "Reality-TV",
                                            "Talk-Show",
                                            "Game-Show"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "search",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "year",
                                "type": "movie",
                                "name": "New",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                            "2004",
                                            "2003",
                                            "2002",
                                            "2001",
                                            "2000",
                                            "1999",
                                            "1998",
                                            "1997",
                                            "1996",
                                            "1995",
                                            "1994",
                                            "1993",
                                            "1992",
                                            "1991",
                                            "1990",
                                            "1989",
                                            "1988",
                                            "1987",
                                            "1986",
                                            "1985",
                                            "1984",
                                            "1983",
                                            "1982",
                                            "1981",
                                            "1980",
                                            "1979",
                                            "1978",
                                            "1977",
                                            "1976",
                                            "1975",
                                            "1974",
                                            "1973",
                                            "1972",
                                            "1971",
                                            "1970",
                                            "1969",
                                            "1968",
                                            "1967",
                                            "1966",
                                            "1965",
                                            "1964",
                                            "1963",
                                            "1962",
                                            "1961",
                                            "1960",
                                            "1959",
                                            "1958",
                                            "1957",
                                            "1956",
                                            "1955",
                                            "1954",
                                            "1953",
                                            "1952",
                                            "1951",
                                            "1950",
                                            "1949",
                                            "1948",
                                            "1947",
                                            "1946",
                                            "1945",
                                            "1944",
                                            "1943",
                                            "1942",
                                            "1941",
                                            "1940",
                                            "1939",
                                            "1938",
                                            "1937",
                                            "1936",
                                            "1935",
                                            "1934",
                                            "1933",
                                            "1932",
                                            "1931",
                                            "1930",
                                            "1929",
                                            "1928",
                                            "1927",
                                            "1926",
                                            "1925",
                                            "1924",
                                            "1923",
                                            "1922",
                                            "1921",
                                            "1920"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "year",
                                "type": "series",
                                "name": "New",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": True,
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
                                            "2004",
                                            "2003",
                                            "2002",
                                            "2001",
                                            "2000",
                                            "1999",
                                            "1998",
                                            "1997",
                                            "1996",
                                            "1995",
                                            "1994",
                                            "1993",
                                            "1992",
                                            "1991",
                                            "1990",
                                            "1989",
                                            "1988",
                                            "1987",
                                            "1986",
                                            "1985",
                                            "1984",
                                            "1983",
                                            "1982",
                                            "1981",
                                            "1980",
                                            "1979",
                                            "1978",
                                            "1977",
                                            "1976",
                                            "1975",
                                            "1974",
                                            "1973",
                                            "1972",
                                            "1971",
                                            "1970",
                                            "1969",
                                            "1968",
                                            "1967",
                                            "1966",
                                            "1965",
                                            "1964",
                                            "1963",
                                            "1962",
                                            "1961",
                                            "1960"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "imdbRating",
                                "type": "movie",
                                "name": "Featured",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
                                        "options": [
                                            "Action",
                                            "Adventure",
                                            "Animation",
                                            "Biography",
                                            "Comedy",
                                            "Crime",
                                            "Documentary",
                                            "Drama",
                                            "Family",
                                            "Fantasy",
                                            "History",
                                            "Horror",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Sport",
                                            "Thriller",
                                            "War",
                                            "Western"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "imdbRating",
                                "type": "series",
                                "name": "Featured",
                                "extra": [
                                    {
                                        "name": "genre",
                                        "isRequired": False,
                                        "options": [
                                            "Action",
                                            "Adventure",
                                            "Animation",
                                            "Biography",
                                            "Comedy",
                                            "Crime",
                                            "Documentary",
                                            "Drama",
                                            "Family",
                                            "Fantasy",
                                            "History",
                                            "Horror",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Sport",
                                            "Thriller",
                                            "War",
                                            "Western",
                                            "Reality-TV",
                                            "Talk-Show",
                                            "Game-Show"
                                        ],
                                        "optionsLimit": 1
                                    },
                                    {
                                        "name": "skip",
                                        "isRequired": False,
                                        "options": [],
                                        "optionsLimit": 1
                                    }
                                ]
                            },
                            {
                                "id": "last-videos",
                                "type": "series",
                                "name": "Last videos",
                                "extra": [
                                    {
                                        "name": "lastVideosIds",
                                        "isRequired": True,
                                        "options": [],
                                        "optionsLimit": 100
                                    }
                                ]
                            },
                            {
                                "id": "calendar-videos",
                                "type": "series",
                                "name": "Calendar videos",
                                "extra": [
                                    {
                                        "name": "calendarVideosIds",
                                        "isRequired": True,
                                        "options": [],
                                        "optionsLimit": 100
                                    }
                                ]
                            }
                        ],
                        "addonCatalogs": [
                            {
                                "id": "official",
                                "type": "all",
                                "name": "Official",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "official",
                                "type": "movie",
                                "name": "Official",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "official",
                                "type": "series",
                                "name": "Official",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "official",
                                "type": "channel",
                                "name": "Official",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "all",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "movie",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "series",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "channel",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "tv",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "Podcasts",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            },
                            {
                                "id": "community",
                                "type": "other",
                                "name": "Community",
                                "extraRequired": [],
                                "extraSupported": []
                            }
                        ],
                        "behaviorHints": {
                            "adult": False,
                            "p2p": False,
                            "configurable": False,
                            "configurationRequired": False
                        }
                    },
                    "flags": {
                        "official": True,
                        "protected": True
                    }
                },
                {
                    "transportUrl": "http://127.0.0.1:11470/local-addon/manifest.json",
                    "transportName": "",
                    "manifest": {
                        "id": "org.stremio.local",
                        "version": "1.10.0",
                        "name": "Local Files (without catalog support)",
                        "contactEmail": None,
                        "description": "Local add-on to find playable files: .torrent, .mp4, .mkv and .avi",
                        "logo": None,
                        "background": None,
                        "types": [
                            "movie",
                            "series",
                            "other"
                        ],
                        "resources": [
                            {
                                "name": "meta",
                                "types": [
                                    "other"
                                ],
                                "idPrefixes": [
                                    "local:",
                                    "bt:"
                                ]
                            },
                            {
                                "name": "stream",
                                "types": [
                                    "movie",
                                    "series"
                                ],
                                "idPrefixes": [
                                    "tt"
                                ]
                            }
                        ],
                        "idPrefixes": None,
                        "catalogs": [],
                        "addonCatalogs": [],
                        "behaviorHints": {
                            "adult": False,
                            "p2p": False,
                            "configurable": False,
                            "configurationRequired": False
                        }
                    },
                    "flags": {
                        "official": True,
                        "protected": True
                    }
                },
                {
                    "transportUrl": f"https://torrentio.strem.fun/sort=qualitysize%7Cdebridoptions=nodownloadlinks,nocatalog%7Crealdebrid={real_debrid_api_key}/manifest.json",
                    "transportName": "",
                    "manifest": {
                        "id": "com.stremio.torrentio.addon",
                        "version": "0.0.14",
                        "name": "Torrentio RD",
                        "description": "Provides torrent streams from scraped torrent providers. Currently supports YTS(+), EZTV(+), RARBG(+), 1337x(+), ThePirateBay(+), KickassTorrents(+), TorrentGalaxy(+), MagnetDL(+), HorribleSubs(+), NyaaSi(+), TokyoTosho(+), AniDex(+), Rutor(+), Rutracker(+), Comando(+), BluDV(+), Torrent9(+), MejorTorrent(+), Wolfmax4k(+), Cinecalidad(+) and RealDebrid enabled. To configure providers, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/Put.io support and other settings visit https://torrentio.strem.fun",
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
                        "background": "https://i.ibb.co/VtSfFP9/t8wVwcg.jpg",
                        "logo": "https://i.ibb.co/w4BnkC9/GwxAcDV.png",
                        "behaviorHints": {
                            "configurable": True,
                            "configurationRequired": False
                        }
                    },
                    "flags": {}
                },
                {
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
                        "official": True
                    }
                },
                {
                    "transportUrl": "https://cyberflix.elfhosted.com/c/catalogs=cd492,15846,c4e72,071c0,61f57,60f26,5653e,223ce,bfb17,ed8a6,88ef9,f3440%7Clang=en/manifest.json",
                    "transportName": "",
                    "manifest": {
                        "id": "marcojoao.ml.cyberflix.catalog",
                        "version": "1.5.2",
                        "name": "Cyberflix Catalog",
                        "description": "Cyberflix, an catalog add-on for Stremio, aggregates the most popular steaming platforms such as Netflix, Amazon Prime or Hulu, and also specific catalogs for Kids, Asian or Anime.",
                        "logo": "http://cyberflix.elfhosted.com/logo.png",
                        "behaviorHints": {
                            "configurable": True,
                            "configurationRequired": False
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
                                "pageSize": 25,
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
                                            "TV",
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
                                "pageSize": 25,
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
                                            "Sport",
                                            "TV",
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
                                "pageSize": 25,
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
                                            "TV",
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
                                "pageSize": 25,
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
                                            "Kids",
                                            "Music",
                                            "Mystery",
                                            "Romance",
                                            "Sci-Fi",
                                            "Sport",
                                            "TV",
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
                                "pageSize": 25,
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
                                            "TV",
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
                                "pageSize": 25,
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
                                            "Sport",
                                            "TV",
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
                                "pageSize": 25,
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
                                            "TV",
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
                                "pageSize": 25,
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
                                            "Sport",
                                            "TV",
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
                                "pageSize": 25,
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
                                            "TV",
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
                                "pageSize": 25,
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
                                            "Sport",
                                            "TV",
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
                                "pageSize": 25,
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
                                "pageSize": 25,
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
                                            "Kids",
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
                        "last_update": "2024-08-18 02:23:41.705295",
                        "server_version": "0.3.3"
                    },
                    "flags": {}
                }
            ],
            "lastModified": "2024-08-18T02:24:41.478689461Z"
        }
    }
    
    return addons_json_array['result']['addons']
    

# def load_addons(auth_key):
    # if not auth_key:
        # print("No auth key provided")
        # return

    # print("Loading addons...")
    # payload = {
        # "type": "AddonCollectionGet",
        # "authKey": auth_key,
        # "update": True
    # }
    
    # try:
        # response = requests.post(STREMIO_API_GET_ADDONS_URL, json=payload)
        # data = response.json()
        # if "result" not in data or data['result'] is None:
            # print("Failed to fetch user addons:", data)
            # return None
            
        # addons = data['result']['addons']
        # return addons
        
    # except Exception as e:
        # print("Error fetching user addons:", e)
        # return None

def sync_addons(auth_key, addons):

    print("Syncing addons...")
    
    payload = {
        "type": "AddonCollectionSet",
        "authKey": auth_key,
        "addons": addons
    }
    
    try:
        response = requests.post(STREMIO_API_SET_ADDONS_URL, json=payload)
        data = response.json()
        
        if "result" not in data or data['result'] is None:
            print("Sync failed:", data)
            return
        if data['result']['success']:
            print("Sync complete:", data)
        else:
            print("Failed to sync addons:", data['result']['error'])
    except Exception as e:
        print("Error syncing addons:", e)

def login_to_stremio(email, password):

    print("Logging in...")
    
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "email": email,
        "password": password,
        "facebook": False
    }
    
    try:
        response = requests.post(STREMIO_API_LOGIN_URL, json=payload, headers=headers)
        data = response.json()
        auth_key = data['result']['authKey']
        print("Logged in successfully, authKey:", auth_key)
        return auth_key
    except:
        print("Login failed!")
        sys.exit()
        
def get_stremio_credentials():
    email = input("Enter your Stremio email (NO FACEBOOK SUPPORT): ")
    password = input("Enter your Stremio password: ")
    return email, password
        
def get_real_debrid_api_key():
    real_debrid_api_key = input("Enter your Real-Debrid API key (https://real-debrid.com/apitoken):\n")
    return real_debrid_api_key



print("#################################################################################################")
print("Stremio + Real Debrid Israel Addons Installer")
print("#################################################################################################")
email, password = get_stremio_credentials()
print("#################################################################################################")
auth_key = login_to_stremio(email, password)
print("#################################################################################################")
real_debrid_api_key = get_real_debrid_api_key()
print("#################################################################################################")
addons = set_torrentio_rd_api_key(real_debrid_api_key)
sync_addons(auth_key, addons)
print("#################################################################################################")