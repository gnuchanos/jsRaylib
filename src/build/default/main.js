import initGcLib from './gcLib.js';



async function main() {
    const gcLib = await initGcLib();

	// Game Progress and Data
	let DATA = {
		userName : "666",
		
		Level : 0,
		Money : 0,
		Gold  : 0,

		Settings : {
			MusicVolume : 1,
			Effect : 1,
			Voice : 1,
			MusicON : true,
		},

		Language : {
			English : {
			
			}

		},

		Levels : {

		}

	}

	async function showAd() {
		let placement = 'test_placement';
		await bridge.advertisement.showInterstitial(placement);
		console.log("---| Ad Opend!");
	}

	async function SaveProgress(DATA) {
		try {
			await bridge.storage.set('player_progress', JSON.stringify(DATA));
			console.log("---| Progress Saved");

		} catch (error) {
			console.error("SDK init failed", error);
		}
	}

	let AdTRUE = false;
	let AdBLOCK = false;

	//  Don't Touch Here ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	try {
		await bridge.initialize();
		console.log("SDK initialized properly");

		DATA.userName = bridge.player.name;
		console.log(DATA.userName);

		await bridge.storage.set('player_progress', JSON.stringify(DATA));
		console.log("---| Progress Saved");

		// Setup interstitial ad event listener once
		bridge.advertisement.on(bridge.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, state => {
			console.log('Interstitial state: ', state);
			
			if (state === "opened") {
				DATA.Settings.MusicON = false;
				AdTRUE = true;
				gcLib.SetTargetFPS(1);
				console.log("---| AD Opend!");
			} else if (state === "closed" || state === "failed") {
				gcLib.SetTargetFPS(60);
				AdTRUE = false;
				DATA.Settings.MusicON = true;
				if (state != "failed") {
					DATA.Money += 100;
				}
				console.log("---| AD Close!");
			}

		});

		bridge.advertisement.checkAdBlock().then(result => {
			if (result) {
				AdBLOCK = true;
				console.log("---| AD TRUE");
			} else {
				AdBLOCK = false;
				console.log("---| AD FALSE");
			}
		}).catch(error => {
			console.log(error)
		})

		// Set minimum delay between interstitials (default = 60s)
		bridge.advertisement.setMinimumDelayBetweenInterstitial(30);

		// Send "game_ready" (mandatory!)
		bridge.platform.sendMessage("game_ready");

	} catch (error) {
		console.error("SDK init failed", error);
	}

	showAd();
	//  Don't Touch Here ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


	const ScreenWidth  = 1600;
  	const ScreenHeight = 900;
  	const Title = "uWu"

  	gcLib.InitWindow(ScreenWidth, ScreenHeight, Title);
  	gcLib.InitAudioDevice();
	gcLib.SetConfigFlags(gcLib.ConfigFlags.FLAG_MSAA_4X_HINT | gcLib.ConfigFlags.FLAG_FULLSCREEN_MODE);

	// Default Please Don't Remove this is not load asset .wasm can't see real file path
	const AssetList = [
		"resources/Font/OpenSans-Italic.ttf",
		"resources/Images/logo.png",

		// All Assets

	];

	// This Is Index for Simple Call Asset Path
	const AssetListIndex = {
		FONT           : 0,
		BG             : 1,

		// All Assets

	};

	await gcLib.loadFiles(AssetList);
	let LogoBootTimer = 5;
	const LoadingForBoot = new gcLib.ProgressBar(
		LogoBootTimer, 
		gcLib.Vector2(ScreenWidth/2-(ScreenWidth/2)/2, 50),
		gcLib.Vector2(ScreenWidth/2, 30),
		gcLib.Colors.Purple5,
		gcLib.Colors.Purple6
	);
	// Default Please Don't Remove

	// All Scene
	const GameScene = {
		Logo     : 0,
		Menu     : 1,
		GamePlay : 2,
		End      : 3
	};

	let CurrentScene = GameScene.Logo;
	const LogoBoot = new gcLib.Image(
		AssetList[AssetListIndex.BG],
		ScreenWidth/2-150, ScreenHeight/2-150, 300, 300, 0,
		gcLib.Colors.White
	);

	// Game Variables




















	// Game Variables

	// Reduce FPS when page is not focused
	window.addEventListener("blur", () => {
		if (AdTRUE) {
			DATA.Settings.MusicON = false;
			gcLib.SetTargetFPS(5); // game unfocused, slow down
		}
	});

	window.addEventListener("focus", () => {
		if (!AdTRUE) {
			DATA.Settings.MusicON = true;
			gcLib.SetTargetFPS(60); // restore normal fps
		}
	});

	async function loop() {
    	if (!(await gcLib.WindowShouldClose())) {
			if (AdBLOCK) {

				// if someone use adblock

			}

			if (!AdTRUE) {
				if (CurrentScene == GameScene.Logo) {
					if (LogoBootTimer > 0) {
						LogoBootTimer -= gcLib.getFrameTime();
						LoadingForBoot.UpdateMinus();
					} else {
						CurrentScene = GameScene.Menu;
					}
				} else if (CurrentScene == GameScene.Menu) {


				} else if (CurrentScene == GameScene.GamePlay) {

				} else if (CurrentScene == GameScene.End) {

				}
			}
	// this place not for update things just drawing for make simple
		gcLib.BeginDrawing();
			gcLib.ClearBackground(gcLib.Colors.Purple8);

			if (!AdTRUE) {
				if (CurrentScene == GameScene.Logo) {
					LogoBoot.Draw();
					LoadingForBoot.Draw();

				} else if (CurrentScene == GameScene.Menu) {

				} else if (CurrentScene == GameScene.GamePlay) {

				} else if (CurrentScene == GameScene.End) {

				}
			}

			// gcLib.DrawFPS(10, 10);

			gcLib.EndDrawing();
			requestAnimationFrame(loop);
		} else {

		// Unload All Here
		testMusicList.UnloadMusic();

		// Unload All Here
		// gcLib.CloseWindow();
		gcLib.CloseAudioDevice();
		}

	}

	loop();
}

main();
