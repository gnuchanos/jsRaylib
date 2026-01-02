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
				gcLib.SetTargetFPS(1);
				AdTRUE = true;
				console.log("---| AD Opend!");
			} else if (state === "closed" || state === "failed") {
				gcLib.SetTargetFPS(60);
				AdTRUE = false;
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
		"resources/Images/bg.png",
	


		// All Assets
		"resources/Sound/music.wav",
		"resources/Sound/hitSound.wav",
		"resources/Sound/point.wav",

	];

	// This Is Index for Simple Call Asset Path
	const AssetListIndex = {
		FONT           : 0,
		BG             : 1,



		// All Assets
		_Music    : 2,
		_HitSound : 3,
		_Point    : 4,



	};

    await gcLib.loadFiles(AssetList);
	// Default Please Don't Remove

	// All Scene
	const GameScene = {
		Logo     : 0,
		Menu     : 1,
		GamePlay : 2,
		End      : 3
	};

	let CurrentScene = { Scene : GameScene.Logo };
	const DefaultFont = gcLib.LoadFontFile(AssetList[AssetListIndex.FONT]);

	// Boot Screen
	const LogoBoot = gcLib.CreateTexture(AssetList[AssetListIndex.BG]);
	gcLib.ChangeTextureHeight(LogoBoot, ScreenHeight);
	gcLib.ChangeTextureWidth(LogoBoot, ScreenWidth);
	let LogoBootTimer = 5;
	let LoadingForBoot = new gcLib.ProgressBar(LogoBootTimer, ScreenWidth/2-(ScreenWidth/2/2), 10, ScreenWidth/2, 60, gcLib.Colors.Purple3, gcLib.Colors.Purple5);

	// Menu Screen






	class MainMenu {
		constructor(DefaultFont, ScreenWidth, ScreenHeight) {
			this.StartGameButton = new gcLib.Button (
				"Start Game", 100, 100, DefaultFont, 60, gcLib.Colors.Purple1, gcLib.Colors.Purple3, gcLib.Colors.Purple4, gcLib.Colors.Purple5
			);

			this.ADButton = new gcLib.Button (
				"Ad Reword", 100, this.StartGameButton.ButtonSize.y + this.StartGameButton.ButtonSize.height + 30, 
				DefaultFont, 60, gcLib.Colors.Purple1, gcLib.Colors.Purple3, gcLib.Colors.Purple4, gcLib.Colors.Purple5
			);

			this.JsRaylibGithubButton = new gcLib.Button (
				"JsRaylib Github", 100,
				this.ADButton.ButtonSize.y + this.ADButton.ButtonSize.height + 30,
				DefaultFont, 60, gcLib.Colors.Purple1, gcLib.Colors.Purple3, gcLib.Colors.Purple4, gcLib.Colors.Purple5
			);



			this.ButtonsBackground = gcLib.CreateRectangle (
				// First Button
				this.StartGameButton.ButtonSize.x - 30,
				this.StartGameButton.ButtonSize.y - 30,

				// Last Button
				this.JsRaylibGithubButton.ButtonSize.width + 60,
				this.JsRaylibGithubButton.ButtonSize.y + 60
			);


		}

		Render() {
			gcLib.DrawRecRounded(0.2, 3, this.ButtonsBackground, gcLib.Colors.Purple0);
			this.StartGameButton.Draw();
			this.ADButton.Draw();
			this.JsRaylibGithubButton.Draw();

		}

		Update(CurrentScene, Music) {
			if (this.StartGameButton.Update()) {
				CurrentScene.Scene = GameScene.GamePlay;
			}

			if (this.JsRaylibGithubButton.Update()) {
				window.open("https://github.com/gnuchanos/jsRaylib", "_blank");
			}

			if (this.ADButton.Update()) {
				showAd();
			}
		}


	}

	const _MainMenu = new MainMenu(DefaultFont, ScreenWidth, ScreenHeight);


	// Game Variables
	

	const MusicList = [
		gcLib.LoadMusicFile(AssetList[AssetListIndex._Music]),
		gcLib.LoadMusicFile(AssetList[AssetListIndex._HitSound]),
		gcLib.LoadMusicFile(AssetList[AssetListIndex._Point]),
	

	]
	
	const testMusicList = new gcLib.Music(MusicList);
	testMusicList.ReadyMusic();
	testMusicList.SetMusicVolume();


















	// Game Variables

	// Reduce FPS when page is not focused
	window.addEventListener("blur", () => {
		DATA.Settings.MusicON = false;
		
		if (AdTRUE) {
			gcLib.SetTargetFPS(5); // game unfocused, slow down
		}
	});

	window.addEventListener("focus", () => {
		DATA.Settings.MusicON = true;

		if (AdTRUE) {
			gcLib.SetTargetFPS(60); // restore normal fps
		}
	});

	async function loop() {
        if (!(await gcLib.WindowShouldClose())) {
			if (!AdTRUE) {

				if (AdBLOCK) {
					
					// if someone use adblock
	
				}

				if (CurrentScene.Scene == GameScene.Logo) {
					if (LogoBootTimer > 0) {
						LogoBootTimer -= gcLib.getFrameTime();
						LoadingForBoot.UpdateMinus();
					} else {
						CurrentScene.Scene = GameScene.Menu;
					}
				} else if (CurrentScene.Scene == GameScene.Menu) {
					_MainMenu.Update(CurrentScene);

					testMusicList.PlayMusic(DATA);
					if (gcLib.IsKeyPressed(gcLib.Keyboard.KEY_A)) {
						testMusicList.NextMusic();
					}

				} else if (CurrentScene.Scene == GameScene.GamePlay) {

				} else if (CurrentScene.Scene == GameScene.End) {


				}
				
			}
			
			// this place not for update things just drawing for make simple
			
            gcLib.BeginDrawing();
                gcLib.ClearBackground(gcLib.RGBA(6, 0, 13, 255));

				if (!AdTRUE) {

					if (CurrentScene.Scene == GameScene.Logo) {
						gcLib.DrawTexture(LogoBoot, 0, 0, gcLib.RGBA(255, 255, 255, 255))
						LoadingForBoot.Draw();

					} else if (CurrentScene.Scene == GameScene.Menu) {
						_MainMenu.Render();

					} else if (CurrentScene.Scene == GameScene.GamePlay) {

					} else if (CurrentScene.Scene == GameScene.End) {


					}
				}

				gcLib.DrawFPS(10, 10);

			gcLib.EndDrawing();
            requestAnimationFrame(loop);
        } else {
            // Unload All Here
			testMusicList.UnloadMusic();

            
            // Unload All Here
            gcLib.CloseWindow();
            gcLib.CloseAudioDevice();
        }
    }

  loop();
}

main();
