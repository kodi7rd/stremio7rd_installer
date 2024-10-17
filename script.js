const STREMIO_API_BASE_URL = "https://api.strem.io/api";
const STREMIO_API_LOGIN_URL = `${STREMIO_API_BASE_URL}/login`;
const STREMIO_API_GET_ADDONS_URL = `${STREMIO_API_BASE_URL}/addonCollectionGet`;
const STREMIO_API_SET_ADDONS_URL = `${STREMIO_API_BASE_URL}/addonCollectionSet`;
// Addons exclusion
const CINEMETA_ADDON_ID = 'com.linvo.cinemeta'
const LOCAL_FILES_ADDON_ID = 'org.stremio.local'
const EXCLUDED_ADDONS_LIST = ['heb-subs-premium'];

async function defineAddonsJSON(authKey, realDebridApiKey) {

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
	
	const installedAddons = await getInstalledAddons(authKey);
	
	let excludedAddonsData = [];
	await checkForExcludedAddons(installedAddons);
	console.log(`excludedAddonsData:\n`, excludedAddonsData); // Pretty-print JSON
	
	// Addons Manifests
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
	}
	
	const TMDB_ADDON = {
		"transportUrl": "https://94c8cb9f702d-tmdb-addon.baby-beamup.club/%7B%22provide_imdbId%22%3A%22true%22%2C%22use_tmdb_prefix%22%3A%22true%22%2C%22language%22%3A%22he-IL%22%7D/manifest.json",
		"transportName": "",
		"manifest": {
			"id": "tmdb-addon",
			"version": "3.0.16",
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
					"name": "TMDB - Popular",
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
							"name": "skip"
						},
						{
							"name": "search"
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
					"name": "TMDB - Popular",
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
							"name": "skip"
						},
						{
							"name": "search"
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
	
	const CYBERFLIX_ADDON = {
		"transportUrl": "https://cyberflix.elfhosted.com/c/catalogs=cd492,15846,c4e72,071c0,61f57,60f26,5653e,223ce,bfb17,ed8a6,88ef9,f3440%7Clang=en/manifest.json",
		"transportName": "",
		"manifest": {
			"id": "marcojoao.ml.cyberflix.catalog",
			"version": "1.5.2",
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
	
	const OPENSUBTITLES_ADDON = {
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
	
	const SUBSOURCE_ADDON = {
		"transportUrl": "https://subsource.strem.bar/SGVicmV3L2hpSW5jbHVkZQ==/manifest.json",
		"transportName": "",
		"manifest": {
			"id": "community.subsource.subtitles",
			"version": "0.0.6",
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
				"configurationRequired": false
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
	
	const TORRENTIO_ADDON = {
		"transportUrl": `https://torrentio.strem.fun/sort=qualitysize%7Cdebridoptions=nodownloadlinks%7Crealdebrid=${realDebridApiKey}/manifest.json`,
		"transportName": "",
		"manifest": {
			"id": "com.stremio.torrentio.addon",
			"version": "0.0.14",
			"name": "Torrentio RD",
			"description": "Provides torrent streams from scraped torrent providers. Currently supports YTS(+), EZTV(+), RARBG(+), 1337x(+), ThePirateBay(+), KickassTorrents(+), TorrentGalaxy(+), MagnetDL(+), HorribleSubs(+), NyaaSi(+), TokyoTosho(+), AniDex(+), Rutor(+), Rutracker(+), Comando(+), BluDV(+), Torrent9(+), MejorTorrent(+), Wolfmax4k(+), Cinecalidad(+) and RealDebrid enabled. To configure providers, RealDebrid/Premiumize/AllDebrid/DebridLink/Offcloud/Put.io support and other settings visit https://torrentio.strem.fun",
			"catalogs": [
				{
					"id": "torrentio-realdebrid",
					"name": "RealDebrid",
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

	const cometUserSettingsB64 = btoa(`{"indexers":["bitsearch","eztv","thepiratebay","therarbg","yts"],"maxResults":0,"maxSize":0,"resultFormat":["All"],"resolutions":["All"],"languages":["All"],"debridService":"realdebrid","debridApiKey":"${realDebridApiKey}","debridStreamProxyPassword":""}`);
	const COMET_ADDON = {
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

	// TV Addons
	const TVAddons = [
		ISRAEL_TV_ADDON
	];


	// Media Addons (Add Stremio's core Cinemeta + Local Files addons)
	const catalogAddons = [
		TMDB_ADDON,
		...installedAddons.filter(addon => addon.manifest.id === CINEMETA_ADDON_ID || addon.manifest.id === LOCAL_FILES_ADDON_ID),
		CYBERFLIX_ADDON
	];
	
	
	// Subtitles Addons
    let subtitlesAddons = [];
    if (document.getElementById('ktuvit_addon_toggle').checked) {
        subtitlesAddons.push(KTUVIT_ADDON);
    }
    if (document.getElementById('wizdom_addon_toggle').checked) {
        subtitlesAddons.push(WIZDOM_ADDON);
    }
    if (document.getElementById('opensubtitles_addon_toggle').checked) {
        subtitlesAddons.push(OPENSUBTITLES_ADDON);
    }
    if (document.getElementById('subsource_addon_toggle').checked) {
        subtitlesAddons.push(SUBSOURCE_ADDON);
    }
    if (document.getElementById('yify_addon_toggle').checked) {
        subtitlesAddons.push(YIFY_ADDON);
    }


    // RD Addons - conditionally based on user input
    let torrentAddons = [];
    if (document.getElementById('torrentio_addon_toggle').checked) {
        torrentAddons.push(TORRENTIO_ADDON);
    }
    if (document.getElementById('comet_addon_toggle').checked) {
        torrentAddons.push(COMET_ADDON);
    }


	// Combine static addons with excluded addons data
	const combinedAddons = [
		...TVAddons,
		...catalogAddons,
		...excludedAddonsData,
		...subtitlesAddons,
		...torrentAddons
	];
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
	
	const realDebridApiKey = document.getElementById('rd_api_key').value;
	const addons = await defineAddonsJSON(authKey, realDebridApiKey);
	
	await installAddons(authKey, addons);
});

function openRDApiKeyPage() {
    alert("הינך מועבר לאתר של Real Debrid לצורך העתקת מפתח ה-API האישי שלך.\n\nאם הינך מקבל עמוד שגיאה - התחבר למשתמש שלך על ידי לחיצה על Login בראש הדף בצד ימין.");
    window.open("https://real-debrid.com/apitoken", "_blank");
}

// Enforce that at least one toggle is selected for Torrentio RD / Comet RD
function enforceAtLeastOneSelectedForTorrents() {
    const torrentCheckboxes = [
        document.getElementById('torrentio_addon_toggle'),
        document.getElementById('comet_addon_toggle')
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

// Call the enforce function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    enforceAtLeastOneSelectedForTorrents();
});