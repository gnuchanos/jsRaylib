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

	// -------------------------------------- Colors ---------------------------------------------------------------------------------------
	const Colors = {
		// Red Colors and Shades
		Red1: { r: 255, g: 0,   b: 0,   a: 255 },
		Red2: { r: 255, g: 69,  b: 0,   a: 255 },
		Red3: { r: 220, g: 20,  b: 60,  a: 255 },
		Red4: { r: 255, g: 99,  b: 71,  a: 255 },
		Red5: { r: 255, g: 160, b: 122, a: 255 },
		Red6: { r: 178, g: 34,  b: 34,  a: 255 },
		Red7: { r: 255, g: 0,   b: 0,   a: 255 },
		Red8: { r: 139, g: 0,   b: 0,   a: 255 },

		// Green Colors and Shades
		Green1: { r: 0,   g: 128, b: 0,   a: 255 },
		Green2: { r: 0,   g: 255, b: 0,   a: 255 },
		Green3: { r: 127, g: 255, b: 0,   a: 255 },
		Green4: { r: 34,  g: 139, b: 34,  a: 255 },
		Green5: { r: 50,  g: 205, b: 50,  a: 255 },
		Green6: { r: 173, g: 255, b: 47,  a: 255 },
		Green7: { r: 85,  g: 107, b: 47,  a: 255 },
		Green8: { r: 0,   g: 139, b: 139, a: 255 },

		// Blue Colors and Shades
		Blue1: { r: 0,   g: 0,   b: 255, a: 255 },
		Blue2: { r: 0,   g: 0,   b: 128, a: 255 },
		Blue3: { r: 135, g: 206, b: 235, a: 255 },
		Blue4: { r: 0,   g: 0,   b: 139, a: 255 },
		Blue5: { r: 173, g: 216, b: 230, a: 255 },
		Blue6: { r: 30,  g: 144, b: 255, a: 255 },
		Blue7: { r: 0,   g: 0,   b: 205, a: 255 },
		Blue8: { r: 25,  g: 25,  b: 112, a: 255 },

		// Yellow Colors and Shades
		Yellow1: { r: 255, g: 255, b: 0,   a: 255 },
		Yellow2: { r: 255, g: 215, b: 0,   a: 255 },
		Yellow3: { r: 255, g: 165, b: 0,   a: 255 },
		Yellow4: { r: 255, g: 192, b: 203, a: 255 },
		Yellow5: { r: 255, g: 69,  b: 0,   a: 255 },
		Yellow6: { r: 255, g: 99,  b: 71,  a: 255 },
		Yellow7: { r: 255, g: 255, b: 224, a: 255 },
		Yellow8: { r: 255, g: 255, b: 102, a: 255 },

		// Orange Colors and Shades
		Orange1: { r: 255, g: 165, b: 0,   a: 255 },
		Orange2: { r: 255, g: 69,  b: 0,   a: 255 },
		Orange3: { r: 255, g: 99,  b: 71,  a: 255 },
		Orange4: { r: 255, g: 140, b: 0,   a: 255 },
		Orange5: { r: 255, g: 127, b: 80,  a: 255 },
		Orange6: { r: 255, g: 160, b: 122, a: 255 },
		Orange7: { r: 255, g: 215, b: 0,   a: 255 },
		Orange8: { r: 255, g: 182, b: 193, a: 255 },

		// Navy Colors and Shades
		Navy1: { r: 0,   g: 0,   b: 128, a: 255 },
		Navy2: { r: 0,   g: 0,   b: 139, a: 255 },
		Navy3: { r: 0,   g: 0,   b: 205, a: 255 },
		Navy4: { r: 0,   g: 0,   b: 255, a: 255 },
		Navy5: { r: 0,   g: 0,   b: 102, a: 255 },
		Navy6: { r: 0,   g: 0,   b: 68,  a: 255 },
		Navy7: { r: 25,  g: 25,  b: 112, a: 255 },
		Navy8: { r: 51,  g: 51,  b: 153, a: 255 },

		// Pink Colors and Shades
		Pink1: { r: 255, g: 192, b: 203, a: 255 },
		Pink2: { r: 255, g: 105, b: 180, a: 255 },
		Pink3: { r: 255, g: 20,  b: 147, a: 255 },
		Pink4: { r: 219, g: 112, b: 147, a: 255 },
		Pink5: { r: 199, g: 21,  b: 133, a: 255 },
		Pink6: { r: 255, g: 182, b: 193, a: 255 },
		Pink7: { r: 255, g: 192, b: 203, a: 255 },
		Pink8: { r: 255, g: 105, b: 180, a: 255 },

		// Purple Colors and Shades
		Purple1: { r: 170, g: 102, b: 255, a: 255 },
		Purple2: { r: 121, g: 13,  b: 255, a: 255 },
		Purple3: { r: 104, g: 11,  b: 219, a: 255 },
		Purple4: { r: 89,  g: 8,   b: 189, a: 255 },
		Purple5: { r: 70,  g: 6,   b: 148, a: 255 },
		Purple6: { r: 51,  g: 3,   b: 110, a: 255 },
		Purple7: { r: 34,  g: 2,   b: 74,  a: 255 },
		Purple8: { r: 15,  g: 1,   b: 33,  a: 255 },

		// Light Purple
		LightPurple0: { r: 163, g: 89,  b: 255, a: 255 },
		LightPurple1: { r: 150, g: 82,  b: 235, a: 255 },
		LightPurple2: { r: 135, g: 74,  b: 212, a: 255 },
		LightPurple3: { r: 120, g: 67,  b: 186, a: 255 },
		LightPurple4: { r: 100, g: 56,  b: 156, a: 255 },
		LightPurple5: { r: 82,  g: 47,  b: 128, a: 255 },
		LightPurple6: { r: 58,  g: 33,  b: 92,  a: 255 },
		LightPurple7: { r: 37,  g: 22,  b: 59,  a: 255 },

		// Turquoise Colors and Shades
		Turquoise1: { r: 64,  g: 224, b: 208, a: 255 },
		Turquoise2: { r: 0,   g: 206, b: 209, a: 255 },
		Turquoise3: { r: 32,  g: 178, b: 170, a: 255 },
		Turquoise4: { r: 0,   g: 139, b: 139, a: 255 },
		Turquoise5: { r: 0,   g: 255, b: 255, a: 255 },
		Turquoise6: { r: 0,   g: 206, b: 209, a: 255 },
		Turquoise7: { r: 32,  g: 178, b: 170, a: 255 },
		Turquoise8: { r: 0,   g: 139, b: 139, a: 255 },

		// Gray Colors and Shades
		Gray1: { r: 128, g: 128, b: 128, a: 255 },
		Gray2: { r: 169, g: 169, b: 169, a: 255 },
		Gray3: { r: 192, g: 192, b: 192, a: 255 },
		Gray4: { r: 211, g: 211, b: 211, a: 255 },
		Gray5: { r: 220, g: 220, b: 220, a: 255 },
		Gray6: { r: 245, g: 245, b: 245, a: 255 },
		Gray7: { r: 105, g: 105, b: 105, a: 255 },
		Gray8: { r: 47,  g: 79,  b: 79,  a: 255 },

		// Black and White
		Black: { r: 0,   g: 0,   b: 0,   a: 255 },
		White: { r: 255, g: 255, b: 255, a: 255 },
	};



	const GnuChanOSColor = {
		BGColor:  { r: 36,  g: 0,   b: 70,  a: 255 },
		TColor:   { r: 157, g: 78,  b: 221, a: 255 },

		// First Part
		FColors0:  { r: 31,  g: 0,   b: 71,  a: 255 },
		FColors1:  { r: 36,  g: 0,   b: 82,  a: 255 },
		FColors2:  { r: 38,  g: 0,   b: 88,  a: 255 },
		FColors3:  { r: 42,  g: 0,   b: 97,  a: 255 },

		FColors4:  { r: 48,  g: 0,   b: 111, a: 255 },
		FColors5:  { r: 57,  g: 0,   b: 130, a: 255 },
		FColors6:  { r: 64,  g: 0,   b: 148, a: 255 },
		FColors7:  { r: 74,  g: 0,   b: 170, a: 255 },

		FColors8:  { r: 79,  g: 0,   b: 181, a: 255 },
		FColors9:  { r: 86,  g: 0,   b: 198, a: 255 },
		FColors10: { r: 99,  g: 0,   b: 228, a: 255 },
		FColors11: { r: 111, g: 0,   b: 255, a: 255 },

		// Second Part
		SColors0:  { r: 29,  g: 0,   b: 49,  a: 255 },
		SColors1:  { r: 30,  g: 0,   b: 55,  a: 255 },
		SColors2:  { r: 57,  g: 0,   b: 95,  a: 255 },
		SColors3:  { r: 81,  g: 0,   b: 135, a: 255 },

		// Python class’ta overwrite olduğu için SON değerleri aldım
		SColors4:  { r: 87,  g: 0,   b: 160, a: 255 },
		SColors5:  { r: 99,  g: 0,   b: 184, a: 255 },
		SColors6:  { r: 111, g: 0,   b: 205, a: 255 },
		SColors7:  { r: 138, g: 0,   b: 255, a: 255 },
	};

	const RGBA = function(Color) {
		return { Color.r, Color.g, Color.b, Color.a };
	};

	const Vector2 = function(x = 0, y = 0) {
		return { x, y };
	};

	// not finish 3D
	const Vector3 = function(x = 0, y = 0, z = 0) {
		return { x, y, z };
	};

	// Base C Lang
    const add = gcLib.cwrap("add", "number", ["number", "number"]);
    const getRandomInt = gcLib.cwrap("gc_GetRandomNumber", "number", ["number", "number"]);

	// Raylib
    const FileExists = gcLib.cwrap("gcFileExists", "boolean", ["string"]); // i never testing this webasambly file system problem

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

	// -------------------------------------------- Simple Draw Call for Camera 3D ------------------------------------------------------------------------------------------

	


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

	function SetMusicVolume(Music, Volume) {
		if (arguments.length < 1 || Music === null) {
			console.error("Missing Key: Missing Music");
		}

		if (arguments.length < 2 || Volume === null) {
			console.error("Missing Key: Missing Volume");
		}

		SetMusicVolumeRaw(Music, Volume);
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
				SetMusicVolume(this.MusicList[this.CurrentIndex], this.Volume);
			}
		}

		PlayMusic(DATA) {
			if (DATA != null) {
				if (DATA) {
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


	// -------------------------------------------------------------- Camera 3D ---------------------------------------------------------------------------------------------------





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


	// ------------------------------------------------------------ Line Object ---------------------------------------------------------------------------------------------



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

	function DrawRecRounded(Rec, Roundness, Segments, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		if (Roundness > 1) {
			console.error("Roundness maximum is 1 not: ", Roundness);
		}

		DrawRectangleRoundedRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			Roundness, Segments, 
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecPro(Rec, Origin, Rotation, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Origin === null) {
			console.error("Missing Key: Origin parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Rotation === null) {
			console.error("Missing Key: Rotation parameter is null or undefined.");
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

	function DrawRecLinesEx(Rec, lineThickness, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || LineThickness === null) {
			console.error("Missing Key: LineThickness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleLinesExRaw(
				Rec.x, Rec.y, Rec.width, Rec.height,
				lineThickness,
				RGBA.r, RGBA.g, RGBA.b, RGBA.a
			);
		}

	function DrawRecRoundedLines(Rec, Roundness, Segments, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined");
		}

		if (arguments.length < 4 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		DrawRectangleRoundedLinesRaw(
			Rec.x, Rec.y, Rec.width, Rec.height,
			Roundness, Segments, 
			RGBA.r, RGBA.g, RGBA.b, RGBA.a
		);
	}

	function DrawRecRoundedLinesEx(Rec, Roundness, Segments, lineThickness, RGBA) {
		if (arguments.length < 1 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Roundness === null) {
			console.error("Missing Key: Roundness parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || Segments === null) {
			console.error("Missing Key: Segments parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 4 || lineThickness === null) {
			console.error("Missing Key: lineThick parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 5 || RGBA === null) {
			console.error("Missing Key: RGBA parameter is null or undefined.");
			return false;
		}

		if (Roundness > 1) {
			console.error("Roundness maximum is 1 not: ", Roundness);
		}

		DrawRectangleRoundedLinesExRaw(
				Rec.x, Rec.y, Rec.width, Rec.height,
				Roundness, Segments, lineThickness,
				RGBA.r, RGBA.g, RGBA.b, RGBA.a
			);
		}

	// ------------------------------------------------------------ Circle Object ---------------------------------------------------------------------------------------------



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
	

	function CollisionRec(rectA, rectB) {
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

	function CollisionCircle(circleA, radiusA, circleB, radiusB) {
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

	function CollisionCircleToRec(circle, radius, rec) {
		if (arguments.length < 1 || circle === null) {
			console.error("Missing Key: circleA parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || radius === null) {
			console.error("Missing Key: radius parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 3 || rec === null) {
			console.error("Missing Key: rect parameter is null or undefined.");
			return false;
		}

		return CheckCollisionCircleRec(
			circle.x, circle.y, radius,
			rec.x, rec.y, rec.width, rec.height
		);
	}

	function CheckMouseToRec(CursorPosition, Rec) {
		if (arguments.length < 1 || CursorPosition === null) {
			console.error("Missing Key: Point parameter is null or undefined.");
			return false;
		}

		if (arguments.length < 2 || Rec === null) {
			console.error("Missing Key: Rec parameter is null or undefined.");
			return false;
		}

		return CheckCollisionMousetoRec(
			CursorPosition.x, CursorPosition.y,
			Rec.x, Rec.y, Rec.width, Rec.height
		);
	}

	






	class ProgressBar {
		constructor(Value, PositionVec2, SizeVec2, FirstBarColor, SecondBarColor) {
			this.FirstBar  = CreateRectangle(PositionVec2.x, PositionVec2.y, SizeVec2.x, SizeVec2.y);
			this.SecondBar = CreateRectangle(PositionVec2.x + 5, PositionVec2.y + 5, SizeVec2.x - 10, SizeVec2.y - 10);

			this.FirstBarColor  = FirstBarColor;
			this.SecondBarColor = SecondBarColor;

			this.Value = Value;
			
			if (this.Value < 0) {
				this.Value = 1;
				console.error("don't use minus number");
			} 

			this.fullWidth = this.SecondBar.width;
			this.DivideTimeAndWidth = this.fullWidth / this.Value;

			this.WaitMinus = 0;
			this.WaitPlus  = 0;
		}

		Draw() {
			DrawRecRounded(this.FirstBar, 0.8, 4, this.FirstBarColor);
			DrawRecRounded(this.SecondBar, 0.8, 4, this.SecondBarColor);
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
		constructor(Text, PositionVec2, Font, FontSize, NormalColor, HoverColor, PressColor, TextColor) {
			this.Text         = Text;
			this.PositionVec2 = PositionVec2;
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
			this.ButtonSize   = CreateRectangle(this.PositionVec2.x, this.PositionVec2.y, _textSizeX+25, _textSizeY+10);
		}

		Draw() {
			DrawRecRounded(this.ButtonSize, 0.8, 8, this.CurrentColor);
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
		constructor(PositionVec2, SizeVec2, BackgroundColor, NormalColor, HoverColor, ActiveColor) {
			this.CheckButton = CreateRectangle(PositionVec2.x, PositionVec2.y, SizeVec2.x, SizeVec2.y);
			this.TickBox     = CreateRectangle(PositionVec2.x+10, PositionVec2.y+10, SizeVec2.x-20, SizeVec2.y-20);
			this.CheckboxButtonColor     = BackgroundColor;
			this.TickBoxColorNormal      = NormalColor;
			this.TickBoxColorHover       = HoverColor;
			this.TickBoxColorActiveColor = ActiveColor;
			this.TickBoxCurrentColor     = NormalColor;
			this.TickTrue                = false;			
		}

		Draw() {
			DrawRecRounded(this.CheckButton, 0.3, 3, this.CheckboxButtonColor);
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
		constructor(Value, TextFont, TextFontSize, PositionVec2, TextColor, TextBackgroundColor, SideButtonColorNormal, SideButtonColorHover, SideButtonColorPressed) {
			this.Value               = Value;
			this.ValueMax            = Value;
			this.TextFont            = TextFont;

			if (TextFontSize < 60) {
				TextFontSize = 60;
				console.warn("Counter Text Size Must Higher than 60 or equal");
			}
			this.TextFontSize        = TextFontSize;
			this.TextColor           = TextColor;
			this.TextBackgroundColor = TextBackgroundColor;
			const _textSizeX = GetTextWidth(this.Value.toString(), this.TextFont, this.TextFontSize, 1);
			const _textSizeY = GetTextHeight(this.Value.toString(), this.TextFont, this.TextFontSize, 1);
			this.TextButton = CreateRectangle(PositionVec2.x, PositionVec2.y, _textSizeX+20, _textSizeY+2.5);
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
			DrawRecRounded(this.TextButton, 0.3, 3, this.TextBackgroundColor);
			DrawTextEx(this.Value.toString(), this.TextButton.x+5, this.TextButton.y, this.TextFont, this.TextFontSize, 1, this.TextColor);
			DrawRecRounded(this.LeftButton, 1, 3, this.CurrentLeftButtonColor);
			DrawRecRounded(this.LEftButtonDot, 1, 3, Colors.Purple6);
			DrawRecRounded(this.RightButton, 1, 3, this.CurrentRightButtonColor);
			DrawRecRounded(this.RightButtonDot, 1, 3, Colors.Purple6);
		}

		_DontUse() {
			// maybe i can make this dynamic size
		}

		Update(ValueChanger = 1) {
			const MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());

			if (CheckMouseToRec(MousePosition, this.LeftButton)) {
				if (IsMouseButtonPressedRaw(MouseButton.LEFT) && this.Value > 0) {
					if (this.Value > ValueChanger) {
						this.Value -= ValueChanger;

					}

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
					this.Value += ValueChanger;
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
			DrawRecRounded(this.Slider, 0.4, 3, this.SliderColor);
			DrawRecRounded(this.Grab, 1, 3, this.GrabCurrentColor);
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
		constructor(Rec, ImageNormal, ImageHover, ImagePressed, Color) {
			this.ImageButton  = CreateRectangle(Rec.x, Rec.y, Rec.width, Rec.height);
			this.ImageCurrent = CreateTexture(ImageNormal);
			this.ImageNormal  = CreateTexture(ImageNormal);
			this.ImageHover   = CreateTexture(ImageHover);
			this.ImagePressed = CreateTexture(ImagePressed);
			
			ChangeTextureWidth(this.ImageCurrent, Rec.width);
			ChangeTextureHeight(this.ImageCurrent, Rec.height);

			ChangeTextureWidth(this.ImageNormal, Rec.width);
			ChangeTextureHeight(this.ImageNormal, Rec.height);

			ChangeTextureWidth(this.ImageHover, Rec.width);
			ChangeTextureHeight(this.ImageHover, Rec.height);

			ChangeTextureWidth(this.ImagePressed, Rec.width);
			ChangeTextureHeight(this.ImagePressed, Rec.height);

			this.Color        = Color;
			this.Timer        = 1;
			this.TimerReady   = false;
		}

		Draw() {
			DrawTexture(this.ImageCurrent, this.ImageButton.x, this.ImageButton.y, this.Color);
		}

		Update() {
			let MousePosition = Vector2(GetMousePositionXRaw(), GetMousePositionYRaw());
			if (CheckMouseToRec(MousePosition, this.ImageButton)) {
				this.ImageCurrent = this.ImageHover;
				if (IsMouseButtonDownRaw(MouseButton.LEFT)) {
					this.ImageCurrent = this.ImagePressed;
				}
				return true;
			}

			return false;
			this.ImageCurrent = this.ImageNormal;
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
	Button,
	ProgressBar,	
	CheckBox,
	Counter,
	Slider,
	ImageButton,
	Image,


	// Get Variables
    add,
    getRandomInt,
    getRandomFloat,
	getFrameTime,

	Colors,
	GnuChanOSColor,

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
	SetMusicVolume,
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
    CollisionRec,
	CollisionCircle,
	CollisionCircleToRec,
	CheckMouseToRec,

	// Load File for .wasm
    loadFiles,

  };
}
