import gcLibModule from './gcLib_raw.js';


export default async function initGcLib() {
  const gcLib = await gcLibModule({
    canvas: document.getElementById("canvas"),
  });

	// i hate js
	// Load files into Emscripten's virtual file system
	async function loadFiles(files) {
		const FS = gcLib.FS; // Emscripten FS API
		try {
			for (const file of files) {
				// Fetch file from network
				const response = await fetch(file);
				if (!response.ok) {
					throw new Error(`Failed to load ${file}`);
				}

				// Convert ArrayBuffer → Uint8Array
				const buffer = await response.arrayBuffer();
				const data = new Uint8Array(buffer);

				// Remove "resources/" prefix
				// e.g., "resources/Sound/hitSound.wav" → "Sound/hitSound.wav"
				const relativePath = file.replace(/^resources\//, '');
      
				// Build full path for virtual FS
				// e.g., "/resources/Sound/hitSound.wav"
				const fullPath = '/resources/' + relativePath;

				// Create folder structure (e.g., "/resources/Sound")
				const folders = fullPath.split('/').slice(1, -1); // ["resources", "Sound"]
				let currentPath = '';
				for (const folder of folders) {
					currentPath += '/' + folder;
					try {
						FS.mkdir(currentPath); // Create folder if not exists
					} catch (e) {
						// Ignore if folder already exists
					}
				}

				// Write file into virtual FS
				FS.writeFile(fullPath, data);

				console.log(`Loaded ${file} as ${fullPath}`);
			}
		} catch (e) {
			console.error(e);
}
	}

	// ------------------------------- extra function -----------------------------------
	function getRandomFloat(min = null, max = null) {
		if (arguments.length < 1 || min === null) {
			console.error("Missing Key: min parameter is null or undefined.");
			return false;
		} 
		
		if (arguments.length < 2 || max === null) {
			console.error("Missing Key: max parameter is null or undefined.");
			return false;
		}

		return Math.random() * (max - min) + min
	}



	const RGBA = function(r = 255, g = 255, b = 255, a = 255) {
		return { r, g, b, a };
	};


	const Vector2 = function(x = 0, y = 0) {
		return { x, y };
	};



	// Base C Lang
    const add = gcLib.cwrap("add", "number", ["number", "number"]);
    const getRandomInt = gcLib.cwrap("gc_GetRandomNumber", "number", ["number", "number"]);

	// Raylib
    const FileExists = gcLib.cwrap("gcFileExists", "boolean", ["string"]);
    
    // Raylib Window
    const InitWindow = gcLib.cwrap("gc_InitWindow", "void", ["number", "number", "string"]);
    const WindowShouldClose = gcLib.cwrap("gc_WindowShouldClose", "boolean", [], { async: true });
    const CloseWindow = gcLib.cwrap("gc_CloseWindow", "void", []);
   
    // Audio Device
    const InitAudioDevice = gcLib.cwrap("gc_InitAudioDevice",   "void", []);
    const CloseAudioDevice = gcLib.cwrap("gc_CloseAudioDevice", "void", []);
   
    // Base Draw
    const BeginDrawing = gcLib.cwrap("gc_BeginDrawing", "void", []);
    const EndDrawing = gcLib.cwrap("gc_EndDrawing",     "void", []);

	// -------------------------------------------- Simple Draw Call for Camera 2D ------------------------------------------------------------------------------------------
	const BeginMode2DRaw = gcLib.cwrap("gc_BeginMode2D", "void", ["number"]);
	const EndMode2DRaw   = gcLib.cwrap("gc_EndMode2D", "void", []);

	function BeginMode2D(camera = null) {
		if (arguments.length < 1 || camera === null) {
			console.error("Missing Key: camera parameter is null or undefined.");
			return false;
		}		

		BeginMode2DRaw(camera);
	}

	function EndMode2D() {
		EndMode2DRaw();
	}



	








	// Settings
    const SetTargetFPS = gcLib.cwrap("gc_SetTargetFPS", "void", ["number"]);
    const getFrameTime = gcLib.cwrap("gc_GetFrameTime", "number", []);

	// ------------------------- Config Flags -----------------------------------------

	// System/Window config flags
	// NOTE: Every bit registers one state (use it with bit masks)
	// By default all flags are set to 0

	const ConfigFlags = {
		FLAG_VSYNC_HINT               : 0x00000040,   // Set to try enabling V-Sync on GPU
		FLAG_FULLSCREEN_MODE          : 0x00000002,   // Set to run program in fullscreen
		FLAG_WINDOW_RESIZABLE         : 0x00000004,   // Set to allow resizable window
		FLAG_WINDOW_UNDECORATED       : 0x00000008,   // Set to disable window decoration (frame and buttons)
		FLAG_WINDOW_HIDDEN            : 0x00000080,   // Set to hide window
		FLAG_WINDOW_MINIMIZED         : 0x00000200,   // Set to minimize window (iconify)
		FLAG_WINDOW_MAXIMIZED         : 0x00000400,   // Set to maximize window (expanded to monitor)
		FLAG_WINDOW_UNFOCUSED         : 0x00000800,   // Set to window non focused
		FLAG_WINDOW_TOPMOST           : 0x00001000,   // Set to window always on top
		FLAG_WINDOW_ALWAYS_RUN        : 0x00000100,   // Set to allow windows running while minimized
		FLAG_WINDOW_TRANSPARENT       : 0x00000010,   // Set to allow transparent framebuffer
		FLAG_WINDOW_HIGHDPI           : 0x00002000,   // Set to support HighDPI
		FLAG_WINDOW_MOUSE_PASSTHROUGH : 0x00004000,   // Set to support mouse passthrough, only supported when FLAG_WINDOW_UNDECORATED
		FLAG_BORDERLESS_WINDOWED_MODE : 0x00008000,   // Set to run program in borderless windowed mode
		FLAG_MSAA_4X_HINT             : 0x00000020,   // Set to try enabling MSAA 4X
		FLAG_INTERLACED_HINT          : 0x00010000    // Set to try enabling interlaced video format (for V3D)
	};

	const SetConfigFlags = gcLib.cwrap("gc_SetConfigFlags", "void", ["number"]);


	// ---------------------------------------- Keyboard ------------------------------
	const Keyboard = {
		KEY_NULL            : 0,        // Key: NULL, used for no key pressed
		// Alphanumeric keys
		KEY_APOSTROPHE      : 39,       // Key: '
		KEY_COMMA           : 44,       // Key: ,
		KEY_MINUS           : 45,       // Key: -
		KEY_PERIOD          : 46,       // Key: .
		KEY_SLASH           : 47,       // Key: /
		KEY_ZERO            : 48,       // Key: 0
		KEY_ONE             : 49,       // Key: 1
		KEY_TWO             : 50,       // Key: 2
		KEY_THREE           : 51,       // Key: 3
		KEY_FOUR            : 52,       // Key: 4
		KEY_FIVE            : 53,       // Key: 5
		KEY_SIX             : 54,       // Key: 6
		KEY_SEVEN           : 55,       // Key: 7
		KEY_EIGHT           : 56,       // Key: 8
		KEY_NINE            : 57,       // Key: 9
		KEY_SEMICOLON       : 59,       // Key: ;
		KEY_EQUAL           : 61,       // Key: =
		KEY_A               : 65,       // Key: A | a
		KEY_B               : 66,       // Key: B | b
		KEY_C               : 67,       // Key: C | c
		KEY_D               : 68,       // Key: D | d
		KEY_E               : 69,       // Key: E | e
		KEY_F               : 70,       // Key: F | f
		KEY_G               : 71,       // Key: G | g
		KEY_H               : 72,       // Key: H | h
		KEY_I               : 73,       // Key: I | i
		KEY_J               : 74,       // Key: J | j
		KEY_K               : 75,       // Key: K | k
		KEY_L               : 76,       // Key: L | l
		KEY_M               : 77,       // Key: M | m
		KEY_N               : 78,       // Key: N | n
		KEY_O               : 79,       // Key: O | o
		KEY_P               : 80,       // Key: P | p
		KEY_Q               : 81,       // Key: Q | q
		KEY_R               : 82,       // Key: R | r
		KEY_S               : 83,       // Key: S | s
		KEY_T               : 84,       // Key: T | t
		KEY_U               : 85,       // Key: U | u
		KEY_V               : 86,       // Key: V | v
		KEY_W               : 87,       // Key: W | w
		KEY_X               : 88,       // Key: X | x
		KEY_Y               : 89,       // Key: Y | y
		KEY_Z               : 90,       // Key: Z | z
		KEY_LEFT_BRACKET    : 91,       // Key: [
		KEY_BACKSLASH       : 92,       // Key: '\'
		KEY_RIGHT_BRACKET   : 93,       // Key: ]
		KEY_GRAVE           : 96,       // Key: `
		// Function keys
		KEY_SPACE           : 32,       // Key: Space
		KEY_ESCAPE          : 256,      // Key: Esc
		KEY_ENTER           : 257,      // Key: Enter
		KEY_TAB             : 258,      // Key: Tab
		KEY_BACKSPACE       : 259,      // Key: Backspace
		KEY_INSERT          : 260,      // Key: Ins
		KEY_DELETE          : 261,      // Key: Del
		KEY_RIGHT           : 262,      // Key: Cursor right
		KEY_LEFT            : 263,      // Key: Cursor left
		KEY_DOWN            : 264,      // Key: Cursor down
		KEY_UP              : 265,      // Key: Cursor up
		KEY_PAGE_UP         : 266,      // Key: Page up
		KEY_PAGE_DOWN       : 267,      // Key: Page down
		KEY_HOME            : 268,      // Key: Home
		KEY_END             : 269,      // Key: End
		KEY_CAPS_LOCK       : 280,      // Key: Caps lock
		KEY_SCROLL_LOCK     : 281,      // Key: Scroll down
		KEY_NUM_LOCK        : 282,      // Key: Num lock
		KEY_PRINT_SCREEN    : 283,      // Key: Print screen
		KEY_PAUSE           : 284,      // Key: Pause
		KEY_F1              : 290,      // Key: F1
		KEY_F2              : 291,      // Key: F2
		KEY_F3              : 292,      // Key: F3
		KEY_F4              : 293,      // Key: F4
		KEY_F5              : 294,      // Key: F5
		KEY_F6              : 295,      // Key: F6
		KEY_F7              : 296,      // Key: F7
		KEY_F8              : 297,      // Key: F8
		KEY_F9              : 298,      // Key: F9
		KEY_F10             : 299,      // Key: F10
		KEY_F11             : 300,      // Key: F11
		KEY_F12             : 301,      // Key: F12
		KEY_LEFT_SHIFT      : 340,      // Key: Shift left
		KEY_LEFT_CONTROL    : 341,      // Key: Control left
		KEY_LEFT_ALT        : 342,      // Key: Alt left
		KEY_LEFT_SUPER      : 343,      // Key: Super left
		KEY_RIGHT_SHIFT     : 344,      // Key: Shift right
		KEY_RIGHT_CONTROL   : 345,      // Key: Control right
		KEY_RIGHT_ALT       : 346,      // Key: Alt right
		KEY_RIGHT_SUPER     : 347,      // Key: Super right
		KEY_KB_MENU         : 348,      // Key: KB menu
		// Keypad keys
		KEY_KP_0            : 320,      // Key: Keypad 0
		KEY_KP_1            : 321,      // Key: Keypad 1
		KEY_KP_2            : 322,      // Key: Keypad 2
		KEY_KP_3            : 323,      // Key: Keypad 3
		KEY_KP_4            : 324,      // Key: Keypad 4
		KEY_KP_5            : 325,      // Key: Keypad 5
		KEY_KP_6            : 326,      // Key: Keypad 6
		KEY_KP_7            : 327,      // Key: Keypad 7
		KEY_KP_8            : 328,      // Key: Keypad 8
		KEY_KP_9            : 329,      // Key: Keypad 9
		KEY_KP_DECIMAL      : 330,      // Key: Keypad .
		KEY_KP_DIVIDE       : 331,      // Key: Keypad /
		KEY_KP_MULTIPLY     : 332,      // Key: Keypad *
		KEY_KP_SUBTRACT     : 333,      // Key: Keypad -
		KEY_KP_ADD          : 334,      // Key: Keypad +
		KEY_KP_ENTER        : 335,      // Key: Keypad Enter
		KEY_KP_EQUAL        : 336,      // Key: Keypad =
		// Android key buttons
		KEY_BACK            : 4,        // Key: Android back button
		KEY_MENU            : 5,        // Key: Android menu button
		KEY_VOLUME_UP       : 24,       // Key: Android volume up button
		KEY_VOLUME_DOWN     : 25        // Key: Android volume down button

	};

	const IskeyPressedRaw = gcLib.cwrap("gc_IsKeyPressed", "boolean", ["number"]);
	const IskeyReleasedRaw = gcLib.cwrap("gc_IsKeyReleased", "boolean", ["number"]);
	const IskeyUpRaw = gcLib.cwrap("gc_IsKeyUp", "boolean", ["number"]);
	const IskeyDownRaw = gcLib.cwrap("gc_IsKeyDown", "boolean", ["number"]);

	function IsKeyPressed(key = null) {
		if (arguments.length < 1 || key === null) {
			console.error("Missing Key: Key parameter is null or undefined.");
			return false;
		}

		return IskeyPressedRaw(key);
	}

	function IsKeyReleased(key) {
		if (arguments.length < 1 || key === null) {
			console.error("Missing Key: Key parameter is null or undefined.");
			return false;
		}

		return IskeyReleasedRaw(key);
	}

	function IsKeyUp(key) {
		if (arguments.length < 1 || key === null) {
			console.error("Missing Key: Key parameter is null or undefined.");
			return false;
		}

		return IskeyUpRaw(key);
	}

	function IsKeyDown(key) {
		if (arguments.length < 1 || key === null) {
			console.error("Missing Key: Key parameter is null or undefined.");
			return false;
		}

		return IskeyDownRaw(key);
	}

	// -------------------------------- Mouse Buttons ---------------------------------

	const MouseButton = {
		LEFT    : 0,       // Mouse button left
		RIGHT   : 1,       // Mouse button right
		MIDDLE  : 2,       // Mouse button middle (pressed wheel)
		SIDE    : 3,       // Mouse button side (advanced mouse device)
		EXTRA   : 4,       // Mouse button extra (advanced mouse device)
		FORWARD : 5,       // Mouse button forward (advanced mouse device)
		BACK    : 6,       // Mouse button back (advanced mouse device)
	};

	const IsMouseButtonPressedRaw  = gcLib.cwrap("gc_IsMouseButtonPressed", "boolean", ["number"]);
	const IsMouseButtonReleasedRaw = gcLib.cwrap("gc_IsMouseButtonReleased", "boolean", ["number"]);
	const IsMouseButtonUpRaw       = gcLib.cwrap("gc_IsMouseButtonUp", "boolean", ["number"]);
	const IsMouseButtonDownRaw     = gcLib.cwrap("gc_IsMouseButtonDown", "boolean", ["number"]);
	const GetMousePositionXRaw     = gcLib.cwrap("gc_GetMousePositionX", "number");
	const GetMousePositionYRaw     = gcLib.cwrap("gc_GetMousePositionY", "number");
	const SetMousePositionRaw      = gcLib.cwrap("gc_SetMousePosition", "void", ["number", "number"]);

	function IsButtonPressed(button) {
		if (arguments.length < 1 || button === null) {
			console.error("Missing Key: button parameter is null or undefined.");
			return false;
		}

		return IsMouseButtonPressedRaw(button);
	}

	function IsButtonReleased(button) {
		if (arguments.length < 1 || button === null) {
			console.error("Missing Key: button parameter is null or undefined.");
			return false;
		}

		return IsMouseButtonReleasedRaw(button);
	}

	function IsButtonUp(button) {
		if (arguments.length < 1 || button === null) {
			console.error("Missing Key: button parameter is null or undefined.");
			return false;
		}

		return IsMouseButtonUpRaw(button);
	}

	function IsButtonDown(button) {
		if (arguments.length < 1 || button === null) {
			console.error("Missing Key: button parameter is null or undefined.");
			return false;
		}

		return IsMouseButtonDownRaw(button);
	}

	// ----------------------------------------------------- Mouse Cursor --------------------------------------------------------------------------------------

	const ShowCursorRaw       = gcLib.cwrap("gc_ShowCursor", "void", []);
	const HideCursorRaw       = gcLib.cwrap("gc_HideCursor", "void", []);
	const EnableCursorRaw     = gcLib.cwrap("gc_EnableCursor", "void", []);
	const DisableCursorRaw    = gcLib.cwrap("gc_DisableCursor", "void", []);
	const IsCursorHidenRaw    = gcLib.cwrap("gc_IsCursorHidden", "boolean", []);
	const IsCursorOnScreenRaw = gcLib.cwrap("gc_IsCursorOnScreen", "boolean", []);

	function SetMousePosition(x, y) {
		if (arguments.length < 1 || x === null) {
			console.error("Missing Key: x parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || y === null) {
			console.error("Missing Key: y parameter is null or undefined.");
			return false;
		}

		SetMousePositionRaw(x, y);
	}

	function ShowCursor() {
		ShowCursorRaw();
	}

	function HideCursor() {
		HideCursorRaw();
	}

	function EnableCursor() {
		EnableCursorRaw();
	}

	function DisableCursor() {
		DisableCursorRaw();
	}

	function IsCursorHidden() {
		return IsCursorHidenRaw();
	}

	function IsCursorOnScreen() {
		return IsCursorOnScreenRaw();
	}


	// --------------------------------------------------------------- Sound ---------------------------------------------------------------------------------------------
	const LoadSoundRaw       = gcLib.cwrap("gc_LoadSound", "number", ["string"]);
	const UnloadSoundRaw     = gcLib.cwrap("gc_UnloadSound", "void", ["number"]);
	const PlaySoundRaw       = gcLib.cwrap("gc_PlaySound", "void", ["number"]);
	const IsSoundPlayingRaw  = gcLib.cwrap("gc_IsSoundPlaying", "boolean", ["number", "number"]);
	const SetSoundVolumeRaw  = gcLib.cwrap("gc_SetSoundVolume", "boolean", ["number", "number"]);
	const SetSoundPitchRaw   = gcLib.cwrap("gc_SetSoundPitch", "boolean", ["number", "number"]);

	function LoadSoundFile(SoundPath = null) {
		if (arguments.length < 1 || SoundPath === null) {
			console.error("Missing Key: SoundPath parameter is null or undefined.");
			return false;
		}

		return LoadSoundRaw(SoundPath);
	}

	function UnloadSoundFile(Sound = null) {
		if (arguments.length < 1 || Sound === null) {
			console.error("Missing Key: Sound parameter is null or undefined.");
			return false;
		}

		UnloadSoundRaw(Sound);
	}

	function PlaySound(Sound = null) {
		if (arguments.length < 1 || Sound === null) {
			console.error("Missing Key: Sound parameter is null or undefined.");
			return false;
		}

		PlaySoundRaw(Sound);
	}

	function IsSoundPlaying(Sound = null) {
		if (arguments.length < 1 || Sound === null) {
			console.error("Missing Key: Sound parameter is null or undefined.");
			return false;
		}

		return IsSoundPlayingRaw(Sound);
	}

	function SetSoundVolume(Sound = null, Volume = null) {
		if (arguments.length < 1 || Sound === null) {
			console.error("Missing Key: Sound parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Volume === null) {
			console.error("Missing Key: Volume parameter is null or undefined.");
			return false;
		}

		if (!SetSoundVolumeRaw(Sound, Volume)) {
			console.log("Sound Volume Level Can Be Maxium Is 1.0");
		}
	}

	function SetSoundPitch(Sound = null, Pitch = null) {
		if (arguments.length < 1 || Sound === null) {
			console.error("Missing Key: Volume parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Pitch === null) {
			console.error("Missing Key: Pitch parameter is null or undefined.");
			return false;
		}

		if (!SetSoundPitchRaw(Sound, Pitch)) {
			console.log("Sound Pitch Level Can Be Maxium Is 1.0");
		}
	}

	// --------------------------------------------------- Music ----------------------------------------------------------------------------------------------

	const LoadMusicRaw        = gcLib.cwrap("gc_LoadMusic", "number", ["string"]);
	const unloadMusicRaw      = gcLib.cwrap("gc_UnLoadMusic", "void", ["number"]);
	const ReadyToPlayMusicRaw = gcLib.cwrap("gc_PlayMusic", "void", ["number"]);
	const UpdateMusicRaw      = gcLib.cwrap("gc_UpdateMusic", "void", ["number"]);
	const SetMusicVolumeRaw   = gcLib.cwrap("gc_SetMusicVolume", "void", ["number"]);
	const SetMusicPitchRaw    = gcLib.cwrap("gc_SetMusicPitch", "void", ["number"]);

	function LoadMusicFile(MusicFilePath) {
		if (arguments.length < 1 || MusicFilePath === null) {
			console.error("Missing Key: MusicFilePath parameter is null or undefined.");
			return false;
		}

		return LoadMusicRaw(MusicFilePath);
	}

	function MusicIsReadyToPlay(Music) {
		if (arguments.length < 1 || Music === null) {
			console.error("Missing Key: Music parameter is null or undefined.");
			return false;
		}

		ReadyToPlayMusicRaw(Music);
	}

	function PlayMusic(Music) {
		if (arguments.length < 1 || Music === null) {
			console.error("Missing Key: Music parameter is null or undefined.");
			return false;
		}

		UpdateMusicRaw(Music);
	}

	function SetMusicPitch(Music, Pitch) {
		if (arguments.length < 1 || Music === null) {
			console.error("Missing Key: Missing Music");
		}

		if (arguments.length < 2 || Pitch) {
			console.error("Missing Key: Missing Pitch");
		}

		SetMusicPitch(Music, Pitch);
	}

	class Music {
		constructor(MusicList) {
			this.MusicList = MusicList;
			this.CurrentIndex = 0;
			this.Volume = 1;
		}

		ReadyMusic() {
			MusicIsReadyToPlay(this.MusicList[this.CurrentIndex]);
		}

		SetMusicVolume() {
			for (let i = 0; i < this.MusicList.length; i++) {
				SetMusicVolumeRaw(this.MusicList[this.CurrentIndex], this.Volume);
			}
		}

		PlayMusic(DATA) {
			if (DATA != null) {
				if (DATA.Settings.MusicON) {
					PlayMusic(this.MusicList[this.CurrentIndex]);
				}
			} else {
				console.error("Missing DATA.Settings.MusicON Variable!!");
			}
		}

		NextMusic() {
			if (this.CurrentIndex < this.MusicList.length-1) {
				this.CurrentIndex += 1;
				this.ReadyMusic();
			}
		}

		UnloadMusic() {
			for (let i = 0; i < this.MusicList.length; i++) {
				unloadMusicRaw(this.MusicList[i]);
			}
		}

	}

	// ----------------------------------------------------- ClearBacground You need this ---------------------------------------------
	const ClearBackgroundRaw = gcLib.cwrap("gc_ClearBackground", "void", ["number", "number", "number", "number"]);
	function ClearBackground(RGBA) {
		return ClearBackgroundRaw(RGBA.r, RGBA.g, RGBA.b, RGBA.a);
	}


	// -------------------------------------------------------------- Camera 2D ---------------------------------------------------------------------------------------------------
	const CreateCamera2DRaw = gcLib.cwrap("gc_CreateCamera", "number", ["number", "number", "number", "number", "number", "number"]);
	const UnloadCamera2DRaw = gcLib.cwrap("gc_UnloadCamera", "void", ["number"]);
	const Camera2DTargetMoveX = gcLib.cwrap("gc_MoveCamera2DX", "void", ["number", "number"]);
	const Camera2DTargetMoveY = gcLib.cwrap("gc_MoveCamera2DY", "void", ["number", "number"]);

	function CreateCamera2D(offset = null, target = null, rotation = null, zoom = null) {
		if (arguments.length < 1 || offset === null) {
			console.error("Missing Key: offset parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || target === null) {
			console.error("Missing Key: target parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 3 || rotation === null) {
			console.error("Missing Key: rotation parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || zoom === null) {
			console.error("Missing Key: zoom parameter is null or undefined.");
			return false;
		}		

		return CreateCamera2DRaw(offset.x, offset.y, target.x, target.y, rotation, zoom);
	}

	function UpdateCamera2D(camera = null, target = null) {
		if (arguments.length < 1 || camera === null) {
			console.error("Missing Key: camera parameter is null or undefined.");
			return false;
		}	

		if (arguments.length < 2 || target === null) {
			console.error("Missing Key: target parameter is null or undefined.");
			return false;
		} 

		Camera2DTargetMoveX(camera, target.x);
		Camera2DTargetMoveY(camera, target.y);
	}

	function UnloadCamera2D(camera = null) {
		if (arguments.length < 1 || camera === null) {
			console.error("Missing Key: camera parameter is null or undefined.");
			return false;
		}		

		UnloadCamera2DRaw(camera);
	}

	function GetCamera2D(camera = null) {
		if (arguments.length < 1 || camera === null) {
			console.error("Missing Key: camera parameter is null or undefined.");
			return false;
		}		

		return camera;
	}


	// ----------------------------------------------------------------- Text And Font ------------------------------------------------------------------------------

	const LoadFont = gcLib.cwrap("gc_LoadFont", "number", ["string"]);
	const UnloadFont = gcLib.cwrap("gc_UnloadFont", "void", ["number"]);

	const FontSizeXRaw = gcLib.cwrap("gc_FontSizeX", "number", ["string", "number", "number", "number"]);
	const FontSizeYRaw = gcLib.cwrap("gc_FontSizeY", "number", ["string", "number", "number", "number"]);
	const DrawTextExRaw = gcLib.cwrap("gc_DrawTextEx", "void", ["number", "string", "number", "number", "number", "number", "number", "number", "number", "number"]);

	function LoadFontFile(path = null) {
		if (arguments.length < 1 || path === null) {
			console.error("Missing Key: path parameter is null or undefined.");
			return false;
		}		

		return LoadFont(path);
	}

	function UnloadFontFile(font = null) {
		if (arguments.length < 1 || font === null) {
			console.error("Missing Key: font parameter is null or undefined.");
			return false;
		}		

		UnloadFont(font)
	}

	function GetTextWidth(text = null, font = null, fontSize = null, spacing = null) {
		if (arguments.length < 1 || text === null) {
			console.error("Missing Key: text parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 2 || font === null) {
			console.error("Missing Key: font parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 3 || fontSize === null) {
			console.error("Missing Key: fontSize parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || spacing === null) {
			console.error("Missing Key: spacing parameter is null or undefined.");
			return false;
		}		

		return FontSizeXRaw(text, font, fontSize, spacing);
	}

	function GetTextHeight(text = null, font = null, fontSize = null, spacing = null) {
		if (arguments.length < 1 || text === null) {
			console.error("Missing Key: text parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || font === null) {
			console.error("Missing Key: font parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 3 || fontSize === null) {
			console.error("Missing Key: fontSize parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 4 || spacing === null) {
			console.error("Missing Key: spacing parameter is null or undefined.");
			return false;
		}

		return FontSizeYRaw(text, font, fontSize, spacing);
	}

	// Simple Draw FPS only X:Y
	const DrawFPS =  gcLib.cwrap("gc_DrawFPS", "void", ["number", "number"]);


	function DrawTextEx(text = null, x = null, y = null, font = null, fontSize = null, spacing = null, RGBA = null) {
		if (arguments.length < 1 || text === null) {
			console.error("Missing Key: text parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 2 || x === null) {
			console.error("Missing Key: x parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 3 || y === null) {
			console.error("Missing Key: y parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 4 || font === null) {
			console.error("Missing Key: font parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 5 || fontSize === null) {
			console.error("Missing Key: fontSize parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 6 || spacing === null) {
			console.error("Missing Key: spacing parameter is null or undefined.");
			return false;
		}		

		if (arguments.length < 7 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawTextExRaw(font, text, x, y, fontSize, spacing, RGBA.r, RGBA.g, RGBA.b, RGBA.a);
	}


	// ------------------------------------------------------------ Rectangle Object ---------------------------------------------------------------------------------------------

	function CreateRectangle(x = null, y = null, width = null, height = null) {
		if (arguments.length < 1 || x === null) {
			console.error("Missing Key: x parameter is null or undefined.");
			return false;
		} 	

		if (arguments.length < 2 || y === null) {
			console.error("Missing Key: y parameter is null or undefined.");
			return false;
		} 		

		if (arguments.length < 3 || width === null) {
			console.error("Missing Key: width parameter is null or undefined.");
			return false;
		} 		

		if (arguments.length < 4 || height === null) {
			console.error("Missing Key: height parameter is null or undefined.");
			return false;
		} 
		
		return { x: x, y: y, width: width, height: height };
	}

	const DrawRectangleRecRaw            = gcLib.cwrap("gc_DrawRectangleRec", "void", ["number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleRoundedRaw        = gcLib.cwrap("gc_DrawRectangleRounded", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleProRaw            = gcLib.cwrap("gc_DrawRectanglePro", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleLinesRaw          = gcLib.cwrap("gc_DrawRectangleLines", "void", ["number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleLinesExRaw        = gcLib.cwrap("gc_DrawRectangleLinesEx", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleRoundedLinesRaw   = gcLib.cwrap("gc_DrawRectangleRoundedLines", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawRectangleRoundedLinesExRaw = gcLib.cwrap("gc_DrawRectangleRoundedLinesEx", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);


	function DrawRec(Rec, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleRecRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecRounded(Roundness, Segments, Rec, RGBA) {
		if (arguments.length < 1 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		if (Roundness > 1) {
			console.log("Roundness maximum is 1 not: ", Roundness);
		}

		DrawRectangleRoundedRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			Roundness, Segments, 
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecPro(Origin, Rotation, Rec, RGBA) {
		if (arguments.length < 1 || Origin === null) {
			console.error("Missing Key: Origin parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Rotation === null) {
			console.error("Missing Key: Rotation parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleProRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			Origin.x, Origin.y, Rotation,
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecLines(Rec, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleLinesRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
			);
		}

	function DrawRecLinesEx(lineThick, Rec, RGBA) {
		if (arguments.length < 1 || lineThick === null) {
			console.error("Missing Key: lineThick parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleLinesExRaw(
				Rec.x, Rec.y, Rec.width, Rec.height,
				lineThick,
				RGBA.r, RGBA.g, RGBA.b, RGBA.a
			);
		}

	function DrawRecRoundedLines(Roundness, Segments, Rec, RGBA) {
		if (arguments.length < 1 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleRoundedLinesRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			Roundness, Segments, 
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecRoundedLinesEx(Roundness, Segments, lineThick, Rec, RGBA) {
		if (arguments.length < 1 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || lineThick === null) {
			console.error("Missing Key: lineThick parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 5 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		if (Roundness > 1) {
			console.log("Roundness maximum is 1 not: ", Roundness);
		}

		DrawRectangleRoundedLinesExRaw(
				Rec.x, Rec.y, Rec.width, Rec.height,
				Roundness, Segments, lineThick,
				RGBA.r, RGBA.g, RGBA.b, RGBA.a
			);
		}


	// ---------------------------------------------- Texture2D Object ---------------------------------------------------------------------------------------------------
	const LoadTextureRaw    = gcLib.cwrap("gc_LoadTexture", "number", ["string"]);
	const unloadTextureRaw  = gcLib.cwrap("gc_UnloadTexture", "void", ["number"]);
	const DrawTextureRaw    = gcLib.cwrap("gc_DrawTexture", "void", ["number", "number", "number", "number", "number", "number", "number"]);
	const DrawTextureRecRaw = gcLib.cwrap("gc_DrawTextureRec", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawTextureExRaw  = gcLib.cwrap("gc_DrawTextureEx", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number"]);
	const DrawTextureProRaw = gcLib.cwrap("gc_DrawTexturePro", "void", ["number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number", "number"]);

	const GetTextureWidth  = gcLib.cwrap("gc_GetTextureWidth", "number", ["number"]);
	const GetTextureHeight = gcLib.cwrap("gc_GetTextureHeight", "number", ["number"]);
	const ChangeWidth      = gcLib.cwrap("gc_ChangeTextureWidth", "void", ["number", "number"]);
	const ChangeHeight     = gcLib.cwrap("gc_ChangeTextureHeight", "void", ["number", "number"]);
	const DisableTextureFilterRaw = gcLib.cwrap("gc_DisableTextureFilter", "void", ["number"]);

	function CreateTexture(TexturePath = null) {
		if (arguments.length < 1 || TexturePath === null) {
			console.error("Missing Key: TexturePath parameter is null or undefined.");
		}

		return LoadTextureRaw(TexturePath);
	}

	function UnloadTexture(texture = null) {
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
		}

		unloadTextureRaw(texture);
	}

	function ChangeTextureWidth(texture = null, width = null) {
		if (texture === null || width === null) {
			console.error("Invalid Key: texture and width must not be null or undefined.");
			return 0;
		}

		ChangeWidth(texture, width);
	}

	function ChangeTextureHeight(texture = null, height = null) {
		if (texture === null || height === null) {
			console.error("Invalid Key: texture and height must not be null or undefined.");
			return 0;
		}

		ChangeHeight(texture, height);
	}

	function GetTextureWidthValue(texture = null) {
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return 0;
		} else {
			return GetTextureWidth(texture);
		}
	}

	function GetTextureHeightValue(texture = null) {
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;
		} else {
			return GetTextureHeight(texture = null);
		}

		
	}

	function DisableTextureFilter(texture = null) {
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;
		} else {
			DisableTextureFilterRaw(texture);
		}
	}

	function DrawTexture(texture = null, x = null, y = null, RGBA = null) {
		if (arguments.length < 2 || x === null) {
			console.error("Missing Key: x parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || y === null) {
			console.error("Missing Key: y parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;

		} else {
			DrawTextureRaw(texture, x, y, RGBA.r, RGBA.g, RGBA.b, RGBA.a);
		}
	}

	function DrawTextureRec(texture = null, Source = null, Position = null, RGBA = null) {
		if (arguments.length < 2 || Source === null) {
			console.error("Missing Key: Source parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Position === null) {
			console.error("Missing Key: Position parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		} 
		
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;
		} else {
			DrawTextureRecRaw(texture, Source.x, Source.y, Source.width, Source.height, Position.x, Position.y, RGBA.r, RGBA.g, RGBA.b, RGBA.a);
		}
	}

	function DrawTextureEx(texture = null, x = null, y = null, rotation = null, scale = null, RGBA = null) {
		if (arguments.length < 2 || x === null) {
			console.error("Missing Key: x parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || y === null) {
			console.error("Missing Key: y parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || rotation === null) {
			console.error("Missing Key: rotation parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 5 || scale === null) {
			console.error("Missing Key: scale parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 6 || RGBA === null) {
			console.error("Missing Key: Key parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;
		} else {
			DrawTextureExRaw(texture, x, y, rotation, scale, RGBA.r, RGBA.g, RGBA.b, RGBA.a);
		}
	}

	function DrawTexturePro(texture = null, Source = null, Dest = null, Origin = null, Rotation = null, RGBA = null) {
		if (arguments.length < 1 || texture === null) {
			console.error("Missing Key: texture parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Source === null) {
			console.error("Missing Key: Source parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Dest === null) {
			console.error("Missing Key: Dest parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || Origin === null) {
			console.error("Missing Key: Origin parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 5 || Rotation === null) {
			console.error("Missing Key: Rotation parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 6 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawTextureProRaw(texture, 
			Source.x, Source.y, Source.width, Source.height, 
			Dest.x, Dest.y, Dest.width, Dest.height, 
			Origin.x, Origin.y, Rotation, 
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}


	// --------------------------- Collision 2D Check ---------------------------------------------------------------------------------------------------------------------
	const CheckCollisionRecs       = gcLib.cwrap("gc_CheckCollisionRecs", "boolean", ["number", "number", "number", "number", "number", "number", "number", "number"]);
	const CheckCollisionCircles    = gcLib.cwrap("gc_CheckCollisionCircles", "boolean", ["number", "number", "number", "number", "number", "number"]);
	const CheckCollisionCircleRec  = gcLib.cwrap("gc_CheckCollisionCircleRec", "boolean", ["number", "number", "number", "number", "number", "number", "number"]);
	const CheckCollisionMousetoRec = gcLib.cwrap("gc_CheckCollisionMousetoRec", "boolean", ["number","number","number","number","number","number"]);
	

	function CollisionRecToRec(rectA, rectB) {
		if (arguments.length < 1 || rectA === null) {
			console.error("Missing Key: rectA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || rectB === null) {
			console.error("Missing Key: rectB parameter is null or undefined.");
			return false;
		}

		return CheckCollisionRecs(
			rectA.x, rectA.y, rectA.width, rectA.height,
			rectB.x, rectB.y, rectB.width, rectB.height
		);
	}

	function CollisionCircleToCircle(circleA, radiusA, circleB, radiusB) {
		if (arguments.length < 1 || circleA === null) {
			console.error("Missing Key: circleA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || radiusA === null) {
			console.error("Missing Key: radiusA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || circleB === null) {
			console.error("Missing Key: circleB parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || radiusB === null) {
			console.error("Missing Key: radiusB parameter is null or undefined.");
			return false;
		}

		return CheckCollisionCircles(
			circleA.x, circleA.y, radiusA,
			circleB.x, circleB.y, radiusB
		);
	}

	function CollisionCircleToRec(circle, radius, rect) {
		if (arguments.length < 1 || circle === null) {
			console.error("Missing Key: circleA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || radius === null) {
			console.error("Missing Key: radius parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || rect === null) {
			console.error("Missing Key: rect parameter is null or undefined.");
			return false;
		}

		return CheckCollisionCircleRec(
			circle.x, circle.y, radius,
			rect.x, rect.y, rect.width, rect.height
		);
	}

	function CheckMouseToRec(Point, Rec) {
		if (arguments.length < 1 || Point === null) {
			console.error("Missing Key: Point parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		return CheckCollisionMousetoRec(
			Point.x, Point.y,
			Rec.x, Rec.y, Rec.width, Rec.height
		);
	}

	// -------------------------------------- Colors ---------------------------------------------------------------------------------------
	const Colors = {
		Purple0 : RGBA(17, 0, 33, 255),
		Purple1 : RGBA(28, 1, 54, 255),
		Purple2 : RGBA(46, 2, 89, 255),
		Purple3 : RGBA(60, 2, 117, 255),
		Purple4 : RGBA(79, 3, 153, 255),
		Purple5 : RGBA(97, 2, 189, 255),
		Purple6 : RGBA(110, 0, 217, 255),
		Purple7 : RGBA(124, 0, 245, 255),

		

	};


	class ProgressBar {
		constructor(Value, X, Y, SizeX, SizeY, FirstBarColor, SecondBarColor) {
			this.FirstBar  = CreateRectangle(X, Y, SizeX, SizeY);
			this.SecondBar = CreateRectangle(X + 5, Y + 5, SizeX - 10, SizeY - 10);

			this.SizeX  = SizeX;
			this.SizeY  = SizeY;

			this.FirstBarColor  = FirstBarColor;
			this.SecondBarColor = SecondBarColor;

			this.Value = Value;
			
			if (this.Value < 0) {
				this.Value = 1;
				console.log("don't use minus number");
			} 

			this.fullWidth = this.SecondBar.width;
			this.DivideTimeAndWidth = this.fullWidth / this.Value;

			this.WaitMinus = 0;
			this.WaitPlus  = 0;
		}

		Draw() {
			DrawRecRounded(0.8, 4, this.FirstBar, this.FirstBarColor);
			DrawRecRounded(0.8, 4, this.SecondBar, this.SecondBarColor);
		}

		UpdateMinus() {
			if (this.WaitMinus > 0) {
				this.WaitMinus -= getFrameTime();
			} else {
				this.WaitMinus = 1;
				this.SecondBar.width -= this.DivideTimeAndWidth;
				if (this.SecondBar.width < 0) this.SecondBar.width = 0;
			}
        
		// return this.SecondBar.width === 0;
		}

		UpdatePlus() {
			if (this.WaitPlus > 0) {
				this.WaitPlus -= getFrameTime();
			} else {
				this.WaitPlus = 1;
				this.SecondBar.width += this.DivideTimeAndWidth;
				if (this.SecondBar.width > this.fullWidth) this.SecondBar.width = this.fullWidth;
			}

        // return this.SecondBar.width === this.fullWidth;
		}
	}

	class Button {
		constructor(Text, X, Y, Font, FontSize, NormalColor, HoverColor, PressColor, TextColor) {
			this.Text         = Text;
			this.X            = X;
			this.Y            = Y;
			this.Font         = Font;
			this.FontSize     = FontSize;

			this.TextColor    = TextColor;
			this.NormalColor  = NormalColor;
			this.HoverColor   = HoverColor;
			this.PressColor   = PressColor;
			this.CurrentColor = NormalColor;

			this.PressCheck = false;
			this.ButtonPressWaitTime = 1;

			const _textSizeX  = GetTextWidth(this.Text, this.Font, this.FontSize, 1);
			const _textSizeY  = GetTextHeight(this.Text, this.Font, this.FontSize, 1);
			this.ButtonSize   = CreateRectangle(this.X, this.Y, _textSizeX+25, _textSizeY+10);
		}

		Draw() {
			DrawRecRounded(0.8, 8, this.ButtonSize, this.CurrentColor);
			DrawTextEx(
				this.Text, this.ButtonSize.x+15, this.ButtonSize.y+5, this.Font, this.FontSize, 1, this.TextColor
			);
		}

		Update() {
			const MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());

			if (CheckMouseToRec(MousePosition, this.ButtonSize)) {
				this.CurrentColor = this.HoverColor;
				if (IsMouseButtonPressedRaw(MouseButton.LEFT)) {
					this.PressCheck = true;
					this.CurrentColor = this.PressColor;
				}
			} else {
				if (!this.PressCheck) {
					this.CurrentColor = this.NormalColor;
				}
			}

			if (this.PressCheck) {
				if (this.ButtonPressWaitTime > 0) {
					this.ButtonPressWaitTime -= getFrameTime();
				} else {
					this.PressCheck = false;
					this.ButtonPressWaitTime = 2;
					return true;
				}
			}


		}
	}

	class CheckBox {
		constructor(X, Y, SizeX, SizeY, CheckboxButtonColor, TickBoxNormalColor, TickBoxColorHover, TickBoxActiveColor) {
			this.CheckButton = CreateRectangle(X, Y, SizeX, SizeY);
			this.TickBox     = CreateRectangle(X+10, Y+10, SizeX-20, SizeY-20);
			this.CheckboxButtonColor     = CheckboxButtonColor;
			this.TickBoxColorNormal      = TickBoxNormalColor;
			this.TickBoxColorHover       = TickBoxColorHover;
			this.TickBoxColorActiveColor = TickBoxActiveColor;
			this.TickBoxCurrentColor     = TickBoxNormalColor;
			this.TickTrue                = false;			
		}

		Draw() {
			DrawRecRounded(0.3, 3, this.CheckButton, this.CheckboxButtonColor);
			if (this.TickTrue) {
				DrawRecRounded(1, 3, this.TickBox, this.TickBoxCurrentColor);
			}
		}

		Update() {
			const MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());

			if (CheckMouseToRec(MousePosition, this.CheckButton)) {
				console.log("working!");
				if (IsMouseButtonPressedRaw(MouseButton.LEFT)) {
					if (this.TickTrue) {
						this.TickBoxCurrentColor = this.TickBoxColorNormal;
						this.TickTrue = false;
					} else {
						this.TickBoxCurrentColor = this.TickBoxColorActiveColor;
						this.TickTrue = true;
					}
				}
			}
		}
	}

	// buttons (+, -) text showing number
	class Counter {
		constructor(Value, TextFont, TextFontSize, X, Y, TextColor, TextBackgroundColor, SideButtonColorNormal, SideButtonColorHover, SideButtonColorPressed) {
			this.Value               = Value;
			this.ValueMax            = Value;
			this.TextFont            = TextFont;
			this.TextFontSize        = TextFontSize;
			this.TextColor           = TextColor;
			this.TextBackgroundColor = TextBackgroundColor;
			const _textSizeX = GetTextWidth(this.Value.toString(), this.TextFont, this.TextFontSize, 1);
			const _textSizeY = GetTextHeight(this.Value.toString(), this.TextFont, this.TextFontSize, 1);
			this.TextButton = CreateRectangle(X, Y, _textSizeX+20, _textSizeY+2.5);
			this.wait = 0.5;
			this.pressCheck_Left = false;
			this.pressCheck_Right = false;
			this.SideNormalColor  = SideButtonColorNormal;
			this.SideHoverColor   = SideButtonColorHover;
			this.SidePressedColor = SideButtonColorPressed;
			this.CurrentLeftButtonColor = SideButtonColorNormal;
			this.LeftButton = CreateRectangle(this.TextButton.x-65, this.TextButton.y, 60, this.TextButton.height);
			this.LEftButtonDot = CreateRectangle(this.TextButton.x-55, this.TextButton.y+10, 40, 40);
			this.CurrentRightButtonColor = SideButtonColorNormal;
			this.RightButton = CreateRectangle(this.TextButton.x+this.TextButton.width+5, this.TextButton.y, 60, this.TextButton.height);
			this.RightButtonDot = CreateRectangle(this.TextButton.x+this.TextButton.width+15, this.TextButton.y+10, 40, 40);
		}

		Draw() {
			DrawRecRounded(0.3, 3, this.TextButton, this.TextBackgroundColor);
			DrawTextEx(this.Value.toString(), this.TextButton.x+5, this.TextButton.y, this.TextFont, this.TextFontSize, 1, this.TextColor);
			DrawRecRounded(1, 3, this.LeftButton, this.CurrentLeftButtonColor);
			DrawRecRounded(1, 3, this.LEftButtonDot, Colors.Purple6);
			DrawRecRounded(1, 3, this.RightButton, this.CurrentRightButtonColor);
			DrawRecRounded(1, 3, this.RightButtonDot, Colors.Purple6);
		}

		Update(ExtraValue = 1) {
			const MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());

			if (CheckMouseToRec(MousePosition, this.LeftButton)) {
				if (IsMouseButtonPressedRaw(MouseButton.LEFT) && this.Value > 0) {
					this.Value -= ExtraValue;
					this.pressCheck_Left = true;
				}

				if (!this.pressCheck_Left) {
					this.CurrentLeftButtonColor = this.SideHoverColor;
				}
			} else {
				if (!this.pressCheck_Left) {
					this.CurrentLeftButtonColor = this.SideNormalColor;
				}
			}

			if (this.pressCheck_Left) {
				this.CurrentLeftButtonColor = this.SidePressedColor;
				if (this.wait > 0) {
					this.wait -= getFrameTime();
				} else {
					this.pressCheck_Left = false;
					this.wait = 0.5;
				}
			}

			if (CheckMouseToRec(MousePosition, this.RightButton)) {
				if (IsMouseButtonPressedRaw(MouseButton.LEFT) && this.Value < this.ValueMax) {
					this.Value += ExtraValue;
					this.pressCheck_Right = true;
				}

				if (!this.pressCheck_Right) {
					this.CurrentRightButtonColor = this.SideHoverColor;
				}
			} else {
				if (!this.pressCheck_Right) {	
					this.CurrentRightButtonColor = this.SideNormalColor;
				}
			}

			if (this.pressCheck_Right) {
				this.CurrentRightButtonColor = this.SidePressedColor;
				if (this.wait > 0) {
					this.wait -= getFrameTime();
				} else {
					this.pressCheck_Right = false;
					this.wait = 0.5;
				}
			}
		}

	}


	class Slider {
		constructor(Value, GrabSize, X, Y, Widht, Height, SliderColor, GrabColorNormal, GrabColorHover, GrabColorPressed) {
			this.Slider = CreateRectangle(X, Y, Widht, Height);
			this.Grab   = CreateRectangle(X+GrabSize/2, Y-Height/2, GrabSize, GrabSize);
			this.Min    = 0;
			this.Max    = Value;
			this.Value  = Value;
			this.SliderColor      = SliderColor;
			this.GrabCurrentColor = GrabColorNormal;
			this.GrabColorNormal  = GrabColorNormal;
			this.GrabColorHover   = GrabColorHover;
			this.GrabColorPressed = GrabColorPressed;
			this.UpdateGrabPosition();
		}

		Draw() {
			DrawRecRounded(0.4, 3, this.Slider, this.SliderColor);
			DrawRecRounded(1, 3, this.Grab, this.GrabCurrentColor);
		}

		UpdateGrabPosition() {
			if (this.Value < this.Min) { this.Value = this.Min; }
			if (this.Value > this.Max) { this.Value = this.Max; }

			let ratio = (this.Value - this.Min) / (this.Max - this.Min);
			this.Grab.x = this.Slider.x + ratio * this.Slider.width - this.Grab.width / 2;
		}

		Update() {
			if (IsKeyDown(Keyboard.KEY_Q)) {
				this.Value -= 10;
				this.UpdateGrabPosition();
			}

			if (IsKeyDown(Keyboard.KEY_E)) {
				this.Value += 10;
				this.UpdateGrabPosition();
			}
		}
	}

	class ImageButton {
		constructor(X, Y, Width, Height, ImageNormal, ImageHover, ImagePressed, Color) {
			this.ImageButton  = CreateRectangle(X, Y, Width, Height);
			this.ImageCurrent = ImageNormal;
			this.ImageNormal  = ImageNormal;
			this.ImageHover   = ImageHover;
			this.ImagePressed = ImagePressed;
			ChangeTextureWidth(this.ImageCurrent, Width);
			ChangeTextureHeight(this.ImageCurrent, Height);
			this.Color        = Color;
		}

		Draw() {
			DrawTexture(this.ImageCurrent, this.ImageButton.x, this.ImageButton.y, this.Color);
		}

		Update() {
			let MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());
			if (CheckMouseToRec(MousePosition, this.ImageButton)) {
				if (IsMouseButtonPressedRaw(MouseButton.LEFT)) {
					return true;
				}
			}
		}
	}

	class Image {
		constructor(Texture, X, Y, Width, Height, Rotation, RGBA) {
			this.Texture = CreateTexture(Texture);
			ChangeTextureWidth(this.Texture, Width);
			ChangeTextureHeight(this.Texture, Height);
			this.X = X;
			this.Y = Y;
			this.Rotation = Rotation;
			this.Color    = RGBA;
		}

		Draw() {
			DrawTextureEx(this.Texture, this.X, this.Y, this.Rotation, 1, this.Color);
		}

	}





  return {
	// Extra Class
	Colors,
	Button,
	ProgressBar,	
	CheckBox,
	Counter,
	Slider,
	ImageButton,



	// Get Variables
    add,
    getRandomInt,
    getRandomFloat,
	getFrameTime,


	// Extra
    FileExists,
    
    // Raylib Window
    InitWindow,
    WindowShouldClose,
    CloseWindow,
   
    // Audio Device
    InitAudioDevice,
    CloseAudioDevice,
   
    // Base Draw
    BeginDrawing,
    EndDrawing,

    // Draw Base
    SetTargetFPS,
    
    // Draw Simple 2D
    DrawFPS,

    ConfigFlags,
	SetConfigFlags,

    RGBA,
    ClearBackgroundRaw,
    ClearBackground,

	// keyboard
	Keyboard,
    IsKeyPressed,
	IsKeyReleased,
	IsKeyUp,
	IsKeyDown,

	// Mouse
	MouseButton,

	IsButtonPressed,
	IsButtonReleased,
	IsButtonUp,
	IsButtonDown,

	GetMousePositionXRaw,
	GetMousePositionYRaw,
	SetMousePosition,
	ShowCursor,
	HideCursor,
	EnableCursor,
	DisableCursor,
	IsCursorHidden,
	IsCursorOnScreen,

    // Font
    LoadFontFile,
	UnloadFontFile,
	GetTextWidth,
	GetTextHeight,
	DrawTextEx,

    // Sound
    LoadSoundFile,
	UnloadSoundFile,
	PlaySound,
	IsSoundPlaying,
	SetSoundVolume,
	SetSoundPitch,

	// music
    LoadMusicFile,
	MusicIsReadyToPlay,
	PlayMusic,
	SetMusicPitch,
	Music,

	// 2D
    CreateCamera2D,
	UpdateCamera2D,
	UnloadCamera2D,
	GetCamera2D,
    BeginMode2D,
	EndMode2D,

    Vector2,

    // Rectangle
    CreateRectangle,
	DrawRec,
	DrawRecRounded,
	DrawRecPro,
	DrawRecLines,
	DrawRecLinesEx,
	DrawRecRoundedLines,
	DrawRecRoundedLinesEx,

	// Texture
    CreateTexture,
	UnloadTexture,
	ChangeTextureWidth,
	ChangeTextureHeight,
	GetTextureWidthValue,
	GetTextureHeightValue,
	DisableTextureFilter,
	DrawTexture,
	DrawTextureRec,
	DrawTextureEx,
	DrawTexturePro,

    // Collisions
    CollisionRecToRec,
	CollisionCircleToCircle,
	CollisionCircleToRec,
	CheckMouseToRec,

	// Load File for .wasm
    loadFiles,

  };
}
