# Warning: using raylib with WebAssembly is a bit tricky because WebAssembly runs in a virtual environment. That’s why the LoadFiles function exists. Check the main.js example for more details.

# Don’t forget, programming is my hobby. I’m self-taught, not school-trained. Sometimes my code isn’t great, so feel free to suggest better solutions.



# Base Fuctions in JS
    :- getRandomFloat(min, max);
    :- RGBA(R, G, B, A);
    :- Vector2(X, Y);
	:- Colors.color -> Color.Purple1
	:- GnuChanOSColor.color -> GnuChanOSColor.TColor

# Base C Functions
    :- add(number1, number2); number1 + number2 = return # this is my first test functions
    :- getRandomInt(min, max);

# Raylib Window
    :- InitWindow(Width, Height, Title);
    :- WindowShouldClose()
    :- CloseWindow();

# Audio Device
    :- InitAudioDevice();
    :- CloseAudioDevice();

# Frame
    :- SetTargetFPS(FPS);
    :- getFrameTime();

# SetConfigFlags(flag | flag | flag):
    :- FLAG_VSYNC_HINT               : // Set to try enabling V-Sync on GPU
	:- FLAG_FULLSCREEN_MODE          : // Set to run program in fullscreen
	:- FLAG_WINDOW_RESIZABLE         : // Set to allow resizable window
	:- FLAG_WINDOW_UNDECORATED       : // Set to disable window decoration (frame and buttons)
	:- FLAG_WINDOW_HIDDEN            : // Set to hide window
	:- FLAG_WINDOW_MINIMIZED         : // Set to minimize window (iconify)
	:- FLAG_WINDOW_MAXIMIZED         : // Set to maximize window (expanded to monitor)
	:- FLAG_WINDOW_UNFOCUSED         : // Set to window non focused
	:- FLAG_WINDOW_TOPMOST           : // Set to window always on top
	:- FLAG_WINDOW_ALWAYS_RUN        : // Set to allow windows running while minimized
	:- FLAG_WINDOW_TRANSPARENT       : // Set to allow transparent framebuffer
	:- FLAG_WINDOW_HIGHDPI           : // Set to support HighDPI
	:- FLAG_WINDOW_MOUSE_PASSTHROUGH : // Set to support mouse passthrough, only supported when FLAG_WINDOW_UNDECORATED
	:- FLAG_BORDERLESS_WINDOWED_MODE : // Set to run program in borderless windowed mode
	:- FLAG_MSAA_4X_HINT             : // Set to try enabling MSAA 4X
	:- FLAG_INTERLACED_HINT          : // Set to try enabling interlaced video format (for V3D)

# Keyboards
    .KEY_NULL            : 0,        // Key: NULL, used for no key pressed
	// Alphanumeric keys
	.KEY_APOSTROPHE      : 39,       // Key: '
	.KEY_COMMA           : 44,       // Key: ,
	.KEY_MINUS           : 45,       // Key: -
	.KEY_PERIOD          : 46,       // Key: .
	.KEY_SLASH           : 47,       // Key: /
	.KEY_ZERO            : 48,       // Key: 0
	.KEY_ONE             : 49,       // Key: 1
	.KEY_TWO             : 50,       // Key: 2
	.KEY_THREE           : 51,       // Key: 3
	.KEY_FOUR            : 52,       // Key: 4
	.KEY_FIVE            : 53,       // Key: 5
	.KEY_SIX             : 54,       // Key: 6
	.KEY_SEVEN           : 55,       // Key: 7
	.KEY_EIGHT           : 56,       // Key: 8
	.KEY_NINE            : 57,       // Key: 9
	.KEY_SEMICOLON       : 59,       // Key: ;
	.KEY_EQUAL           : 61,       // Key: =
	.KEY_A               : 65,       // Key: A | a
	.KEY_B               : 66,       // Key: B | b
	.KEY_C               : 67,       // Key: C | c
	.KEY_D               : 68,       // Key: D | d
	.KEY_E               : 69,       // Key: E | e
	.KEY_F               : 70,       // Key: F | f
	.KEY_G               : 71,       // Key: G | g
	.KEY_H               : 72,       // Key: H | h
	.KEY_I               : 73,       // Key: I | i
	.KEY_J               : 74,       // Key: J | j
	.KEY_K               : 75,       // Key: K | k
	.KEY_L               : 76,       // Key: L | l
	.KEY_M               : 77,       // Key: M | m
	.KEY_N               : 78,       // Key: N | n
	.KEY_O               : 79,       // Key: O | o
	.KEY_P               : 80,       // Key: P | p
	.KEY_Q               : 81,       // Key: Q | q
	.KEY_R               : 82,       // Key: R | r
	.KEY_S               : 83,       // Key: S | s
	.KEY_T               : 84,       // Key: T | t
	.KEY_U               : 85,       // Key: U | u
	.KEY_V               : 86,       // Key: V | v
	.KEY_W               : 87,       // Key: W | w
	.KEY_X               : 88,       // Key: X | x
	.KEY_Y               : 89,       // Key: Y | y
	.KEY_Z               : 90,       // Key: Z | z
	.KEY_LEFT_BRACKET    : 91,       // Key: [
	.KEY_BACKSLASH       : 92,       // Key: '\'
	.KEY_RIGHT_BRACKET   : 93,       // Key: ]
	.KEY_GRAVE           : 96,       // Key: `
	// Function keys
	.KEY_SPACE           : 32,       // Key: Space
	.KEY_ESCAPE          : 256,      // Key: Esc
	.KEY_ENTER           : 257,      // Key: Enter
	.KEY_TAB             : 258,      // Key: Tab
	.KEY_BACKSPACE       : 259,      // Key: Backspace
	.KEY_INSERT          : 260,      // Key: Ins
	.KEY_DELETE          : 261,      // Key: Del
	.KEY_RIGHT           : 262,      // Key: Cursor right
	.KEY_LEFT            : 263,      // Key: Cursor left
	.KEY_DOWN            : 264,      // Key: Cursor down
	.KEY_UP              : 265,      // Key: Cursor up
	.KEY_PAGE_UP         : 266,      // Key: Page up
	.KEY_PAGE_DOWN       : 267,      // Key: Page down
	.KEY_HOME            : 268,      // Key: Home
	.KEY_END             : 269,      // Key: End
	.KEY_CAPS_LOCK       : 280,      // Key: Caps lock
	.KEY_SCROLL_LOCK     : 281,      // Key: Scroll down
	.KEY_NUM_LOCK        : 282,      // Key: Num lock
	.KEY_PRINT_SCREEN    : 283,      // Key: Print screen
	.KEY_PAUSE           : 284,      // Key: Pause
	.KEY_F1              : 290,      // Key: F1
	.KEY_F2              : 291,      // Key: F2
	.KEY_F3              : 292,      // Key: F3
	.KEY_F4              : 293,      // Key: F4
	.KEY_F5              : 294,      // Key: F5
	.KEY_F6              : 295,      // Key: F6
	.KEY_F7              : 296,      // Key: F7
	.KEY_F8              : 297,      // Key: F8
	.KEY_F9              : 298,      // Key: F9
	.KEY_F10             : 299,      // Key: F10
	.KEY_F11             : 300,      // Key: F11
	.KEY_F12             : 301,      // Key: F12
	.KEY_LEFT_SHIFT      : 340,      // Key: Shift left
	.KEY_LEFT_CONTROL    : 341,      // Key: Control left
	.KEY_LEFT_ALT        : 342,      // Key: Alt left
	.KEY_LEFT_SUPER      : 343,      // Key: Super left
	.KEY_RIGHT_SHIFT     : 344,      // Key: Shift right
	.KEY_RIGHT_CONTROL   : 345,      // Key: Control right
	.KEY_RIGHT_ALT       : 346,      // Key: Alt right
	.KEY_RIGHT_SUPER     : 347,      // Key: Super right
	.KEY_KB_MENU         : 348,      // Key: KB menu
	// Keypad keys
	.KEY_KP_0            : 320,      // Key: Keypad 0
	.KEY_KP_1            : 321,      // Key: Keypad 1
	.KEY_KP_2            : 322,      // Key: Keypad 2
	.KEY_KP_3            : 323,      // Key: Keypad 3
	.KEY_KP_4            : 324,      // Key: Keypad 4
	.KEY_KP_5            : 325,      // Key: Keypad 5
	.KEY_KP_6            : 326,      // Key: Keypad 6
	.KEY_KP_7            : 327,      // Key: Keypad 7
	.KEY_KP_8            : 328,      // Key: Keypad 8
	.KEY_KP_9            : 329,      // Key: Keypad 9
	.KEY_KP_DECIMAL      : 330,      // Key: Keypad .
	.KEY_KP_DIVIDE       : 331,      // Key: Keypad /
	.KEY_KP_MULTIPLY     : 332,      // Key: Keypad *
	.KEY_KP_SUBTRACT     : 333,      // Key: Keypad -
	.KEY_KP_ADD          : 334,      // Key: Keypad +
	.KEY_KP_ENTER        : 335,      // Key: Keypad Enter
	.KEY_KP_EQUAL        : 336,      // Key: Keypad =
	// Android key buttons
	.KEY_BACK            : 4,        // Key: Android back button
	.KEY_MENU            : 5,        // Key: Android menu button
	.KEY_VOLUME_UP       : 24,       // Key: Android volume up button
	.KEY_VOLUME_DOWN     : 25        // Key: Android volume down button

-: IsKeyPressed(KEYBOARD.KEY_);
-: IsKeyReleased(KEYBOARD.KEY_);
-: IsKeyDown(KEYBOARD.KEY_);
-: ISKEYUp(KEYBOARD.KEY_);

# MouseButton
    -: LEFT    : 0
    -: RIGHT   : 1
    -: MIDDLE  : 2
    -: SIDE    : 3
    -: EXTRA   : 4
    -: FORWARD : 5
    -: BACK    : 6

-: IsButtonPressed(MouseButton.);
-: IsButtonPRelaesed(MouseButton.);
-: IsButtonUp(MouseButton.);
-: IsButtonDown(MouseButton.);

-: SetMousePosition(X, Y);
-: ShowCursor();
-: HideCursor();
-: EnableCursor();
-: DisableCursor();
-: IsCursorHidden();
-: IsCursorOnScreen();

# Sound
    -: LoadSoundFile(Sound_Path);
    -: PlaySound(Sound);
    -: IsSoundPlaying(Soun);
    -: SetSoundVolume(Sound, Volume) # Volume MIN: 0 MAX: 1
    -: SetSoundPitch(Sound, Pitch)   # Pitch  MIN: 0 MAX: 1
    -: UnloadSoundFile(Sound);

# Music
    -: LoadMusicFile(Music File Path);
    -: MusicIsReadyToPlay(Music);    # you must use this before to start music this is not like godot or unity you must use every music if you try play diffrent music
    -: SetMusicVolume(Music, Volume) # Volume MIN: 0 MAX: 1
    -: SetMusicPitch(Music, Pitch)   # Pitch MIN: 0 MAX: 1
    -: Music # warning this is only for music list like things
        -: ReadyMusic();
        -: SetMusicVolume();
        -: PlayMusic(DATA); # Warning if DATA True Music can play that's simple
        -: NextMusic() :    # Simple just read gcLib.js
        -: UnloadMusic();   # i don't know if webasambly do this for us but i'm still using

# Draws
    :- BeginDrawing();
    :- EndDrawing();
    :- BeginMode2D(CAMERA2D);
    :- EndMode2D();
    :- BeginMode3D(CAMERA3D); # NOT IN BINDING
    :- EndMode3D();           # NOT IN BINDING

# don't forget this
    :- ClearBackgroun(RGBA);

# Camera 2D
    :- CreateCamera2D(Offset:Vector2, Target:Vector2, Rotation, Zoom);
    :- UpdateCamera2(Camera, Target:Vector2);
    :- GetCamera2D(Camera);
    :- UnloaCamera2D();     # i nee the know if this nee or not?

# Camera 3D
    :- Not Ready

# Font
    :- LoadFontFile(Font Path);
    :- UnloadFontFile(Font); # webAsambly maybe can do this for us??
    :- GetTextWidth(Text, Font, FontSize, Spacing);
    :- GetTextHeight(Text, Font, FontSize, Spacing);

# Text
    :- DrawFPS(X, Y);
    :- DrawTextEx(Text, X, Y, Font, FontSize, Spacing, RGBA);

# Create And Draw Object
    :- CreateRectangle(X, Y, Widht, Height);
    :- DrawRec(Rectangle, RGBA);
    :- DrawRecRounded(Rectangle, Roundness, Segments, RGBA);
    :- DrawRecPro(Rectangle, Origin, Rotation, RGBA);
    :- DrawRecLines(Rectangle, RGBA);
    :- DrawRecLinexEx(Rectangle, LineThickness, RGBA);
    :- DrawRecRoundedLines(Rectangle, Roundness, Segments, RGBA);
    :- DrawRecRoundedLinesEx(Rectangle, Rounness, Segments, LineThickness)

# 2D Texture
    :- CreateTexture(Texture Path);
    :- UnloadTexture(Texture);
    :- ChangeTextureWidth(Texture);
    :- ChangeTextureHeight(Texture);
    :- GetTextureWithValue(Texture);
    :- GetTextureHeightValue(Texture);
    :- DisableTextureFilter(Texture);
    :- DrawTexture(Texture, X, Y, RGBA);
    :- DrawTextureRec(Texture, Source: Rectangle, Poition: Vector2, RGBA);
    :- DrawTextureEx(Texture, X, Y, Rotation, Scale, RGBA):
    :- DrawTexturePro(Texture, Source: Rectangle, Dest: Rectangle, Origin: Vector2, Rotation, RGBA); # this is little hard for new just look raylib example

# 2D Collision
    :- CollisionRec(RectangleA, RectangleB);
    :- CollisionCircle(CircleA, RadiusA, CircleB, RadiusB);
    :- CollisionCircleToRec(Circle, Radius, Rectangle)
    :- CheckNouseToRec(Cursor: Vector2, Rectangle);

# Extra 
    :- Colors.RGBA -> Colors.Purple0

# Simple UI
    :- new ProgressBar(Value, PositionVec2, SizeVec2, FirstBarColor, SecondBarColor);
        :- Draw();
        :- UpdateMinus();
        :- UpdatePlus();
    :- new Button(Text, PositionVec2, Font, FontSize, NormalColor, HoverColor, PressColor, TextColor);
        :- Update();
        :- Draw();
    :- new CheckBox(PositionVec2, SizeVec2, BackgroundColor, NormalColor, HoverColor, ActiveColor);
        :- Update();
        :- Draw();
    :- new Counter(Value, TextFont, TextFontSize, PositionVec2: Vector2, TextColor, TextBackgroundColor, SideButtonColorNormal, SideButtonColorHover, SieButtonColorPressed);
        :- Update();
        :- Draw();
        :- [Button-]Number[Button+]
    :- new ImageButton(Rectangle, ImageNormal, ImageHover, ImagePresse, Color);
        :- Update();
        :- Draw();
    :- new Image(Texture, X, Y, Width, Height, Rotation, RGBA);
        :- Draw();


