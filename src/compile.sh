#!/bin/bash

# first you need
# git clone https://github.com/raysan5/raylib.git
# cd raylib/src/
# make PLATFORM=PLATFORM_DESKTOP
# make PLATFORM=PLATFORM_WEB

# second you need for web export
#git clone https://github.com/emscripten-core/emsdk.git
#cd emsdk
#./emsdk install latest
#./emsdk activate latest

# emcc -xc /dev/null -o /tmp/a.out # don't forget this

# this is for only gnu/linux
#source ~/tmp/emsdk/emsdk_env.fish or emsdk_env.sh
emcc gcLib.c \
    -o build/gcLib_raw.js \
    -I/home/archkubi/tmp/raylib/src \
    -I/home/archkubi/tmp/raylib/src/external \
    -lm \
    /home/archkubi/tmp/raylib/src/libraylib.web.a \
    -DPLATFORM_WEB \
    -sUSE_GLFW=3 \
    -sASYNCIFY=1 \
    -sASSERTIONS=1 \
    -sEXPORTED_FUNCTIONS="[
        '_add', 
        '_gc_GetRandomNumber',
        '_gc_SetTargetFPS',
		'_gc_GetFrameTime',
		'_gc_SetConfigFlags',

		'_gc_InitWindow', 
        '_gc_WindowShouldClose', 
        '_gc_CloseWindow',
        '_gc_InitAudioDevice',
        '_gc_CloseAudioDevice',

        '_gc_CreateCamera',
        '_gc_MoveCamera2DX',
        '_gc_MoveCamera2DY',
        '_gc_UnloadCamera',
        '_gc_BeginMode2D',
        '_gc_EndMode2D',

		'_gc_LoadSound',
        '_gc_UnloadSound',
        '_gc_PlaySound',
        '_gc_IsSoundPlaying',
        '_gc_SetSoundVolume',
        '_gc_SetSoundPitch',

		'_gc_LoadMusic',
		'_gc_UnloadMusic',
		'_gc_PlayMusic',
		'_gc_UpdateMusic',
		'_gc_SetMusicPitch',
		'_gc_SetMusicVolume',

        '_gc_LoadFont',
        '_gc_UnloadFont',
        '_gc_FontSizeX',
        '_gc_FontSizeY',

        '_gc_LoadTexture',
        '_gc_UnloadTexture',
        '_gc_DrawTexture',
        '_gc_DrawTextureEx',
        '_gc_DrawTexturePro',
        '_gc_GetTextureWidth',
        '_gc_GetTextureHeight',
        '_gc_DrawTextureRec',
		'_gc_ChangeTextureWidth',
		'_gc_ChangeTextureHeight',
		'_gc_DisableTextureFilter',

		'_gc_BeginDrawing', 
        '_gc_ClearBackground',

        '_gc_DrawFPS',
		'_gc_DrawText',
        '_gc_DrawTextEx',
        '_gc_DrawRectangleRec',
        '_gc_DrawRectangleRounded',
        '_gc_DrawRectanglePro',
        '_gc_DrawRectangleLines',
        '_gc_DrawRectangleLinesEx',
        '_gc_DrawRectangleRoundedLines',
        '_gc_DrawRectangleRoundedLinesEx',



        '_gc_EndDrawing',



        '_gc_IsKeyPressed',
        '_gc_IsKeyDown',
        '_gc_IsKeyUp',
        '_gc_IsKeyReleased',
        
        '_gc_IsMouseButtonPressed',
        '_gc_IsMouseButtonReleased',
        '_gc_IsMouseButtonUp',
        '_gc_IsMouseButtonDown',
        '_gc_GetMousePositionX',
        '_gc_GetMousePositionY',
        '_gc_SetMousePosition',

        '_gc_ShowCursor',
        '_gc_HideCursor',
        '_gc_IsCursorHidden',
        '_gc_EnableCursor',
        '_gc_DisableCursor',
        '_gc_IsCursorOnScreen',

        '_gc_CheckCollisionRecs',
        '_gc_CheckCollisionCircles',
        '_gc_CheckCollisionCircleRec',
        '_gc_CheckCollisionMousetoRec',





        '_gcFileExists'
        ]" \
    -sEXPORTED_RUNTIME_METHODS='["cwrap","FS"]' \
    -sMODULARIZE=1 \
    -sEXPORT_NAME="gcLibModule" \
    -sEXPORT_ES6=1 \
    -sENVIRONMENT=web \
    -sALLOW_MEMORY_GROWTH=1 \
    -sINITIAL_MEMORY=64MB



