#include <emscripten.h>
#include <raylib.h>
#include <raymath.h>
#include <stdbool.h>
#include <stdlib.h>
#include <stdio.h>




// Simple Functions
int add(int a, int b) {
    return a + b;
}

int gc_GetRandomNumber(int min, int max) {
    return GetRandomValue(min, max);
}

float gc_GetFrameTime() {
	return GetFrameTime();
}



// Raylib Window
void gc_InitWindow(int Width, int Height, const char* Title) { 
	InitWindow(Width, Height, Title); 
}


bool gc_WindowShouldClose() { 
	return WindowShouldClose(); 
}

void gc_CloseWindow() { 
	CloseWindow(); 
}

// Audio Device
void gc_InitAudioDevice() { 
	InitAudioDevice(); 
}


void gc_CloseAudioDevice() { 
	CloseAudioDevice(); 
}

// Base Draw
void gc_BeginDrawing() { 
	BeginDrawing(); 
}


void gc_EndDrawing() { 
	EndDrawing(); 
}

// Press Keyboard
bool gc_IsKeyPressed(int key) {
	return IsKeyPressed(key); }


bool gc_IsKeyReleased(int key) {
	return IsKeyReleased(key); }


bool gc_IsKeyUp(int key) {
	return IsKeyUp(key); }


bool gc_IsKeyDown(int key) {
	return IsKeyDown(key); }

// Press Mouse Button
bool gc_IsMouseButtonPressed(int key) {
	return IsMouseButtonPressed(key); 
}

bool gc_IsMouseButtonReleased(int key) {
	return IsMouseButtonReleased(key); 
}

bool gc_IsMouseButtonUp(int key) {
	return IsMouseButtonUp(key); 
}

bool gc_IsMouseButtonDown(int key) {
	return IsMouseButtonDown(key); 
}

int gc_GetMousePositionX() {
	return GetMousePosition().x; 
}

int gc_GetMousePositionY() {
	return GetMousePosition().y;
}

void gc_SetMousePosition(int x, int y) {
	SetMousePosition(x, y);
}


// Cursor
void gc_ShowCursor(void) {
	ShowCursor();
}

void gc_HideCursor(void) {
	HideCursor();
}

bool gc_IsCursorHidden(void) {
	return IsCursorHidden();
}

void gc_EnableCursor(void) {
	EnableCursor();
}

void gc_DisableCursor(void) {
	DisableCursor();
}

bool gc_IsCursorOnScreen(void){
	return IsCursorOnScreen();
}


// Camera2D
Camera2D* gc_CreateCamera(float offsetX, float offsetY, float targetX, float targetY, float rotation, float zoom) {
    Camera2D* cam2D = (Camera2D*)malloc(sizeof(Camera2D));
    if (cam2D != NULL) {
        cam2D->offset = (Vector2){ offsetX, offsetY };
        cam2D->target = (Vector2){ targetX, targetY };
        cam2D->rotation = rotation;
        cam2D->zoom = zoom;
    }
    return cam2D;
}

void gc_MoveCamera2DX(Camera2D* cam2D, float TargetX) {
	if (cam2D != NULL) {
		cam2D->target.x = TargetX;
	}
}

void gc_MoveCamera2DY(Camera2D* cam2D, float TargetY) {
	if (cam2D != NULL) {
		cam2D->target.y = TargetY;
	}
}

void gc_UnloadCamera(Camera2D* cam2D) {
	free(cam2D);
}

void gc_BeginMode2D(Camera2D* camera) {
	BeginMode2D(*camera);
}

void gc_EndMode2D(){
	EndMode2D();
}


// Audio - Sound
Sound* gc_LoadSound(const char* Path) {
    Sound* snd = malloc(sizeof(Sound));
    *snd = LoadSound(Path);
    return snd;
}

void gc_UnloadSound(Sound* sound) {
    UnloadSound(*sound);
    free(sound);
}

void gc_PlaySound(Sound* sound) {
    PlaySound(*sound); }


bool gc_IsSoundPlaying(Sound* sound) {
	return IsSoundPlaying(*sound);
}


bool gc_SetSoundVolume(Sound* sound, float volume) {
	if (volume <= 1.0) {
		SetSoundVolume(*sound, volume);
		return true;
	}
	
	return false;
}

bool gc_SetSoundPitch(Sound* sound, float pitch) {
	if (pitch <= 1.0) {
		SetSoundPitch(*sound, pitch);
		return true;
	}

	return false;
}


// Music
Music* gc_LoadMusic(const char* Path) {
	Music* msc = malloc(sizeof(Music));
	*msc = LoadMusicStream(Path);
	return msc;
}

void gc_UnloadMusic(Music* Music) {
	UnloadMusicStream(*Music);
	free(Music);
}

void gc_PlayMusic(Music* music) {
	PlayMusicStream(*music);
}

void gc_UpdateMusic(Music* music) {
	UpdateMusicStream(*music);
}

void gc_SetMusicPitch(Music *music, float Pitch) {
	SetMusicPitch(*music, Pitch);
}

void gc_SetMusicVolume(Music *music, float Volume) {
	SetMusicVolume(*music, Volume);
}


// Font
Font* gc_LoadFont(const char* Path) {
	Font* fnt = malloc(sizeof(Font));
	*fnt = LoadFont(Path);
	return fnt;
}

void gc_UnloadFont(Font* font) {
	UnloadFont(*font);
	free(font);
}

int gc_FontSizeX(const char* Text, Font* font, int FontSize, float TextSpacing) {
	float X = MeasureTextEx(*font, Text, FontSize, TextSpacing).x;
	return (int)(X);
}

int gc_FontSizeY(const char* Text, Font* font, int FontSize, float TextSpacing) {
	float Y = MeasureTextEx(*font, Text, FontSize, TextSpacing).y;
	return (int)(Y);
}

// Texture
Texture2D* gc_LoadTexture(const char *Path) {
	Texture2D* txtr = malloc(sizeof(Texture2D));
	*txtr = LoadTexture(Path);
	return  txtr;
}

void gc_UnloadTexture(Texture2D* texture) {
	UnloadTexture(*texture);
	free(texture);
}

int gc_GetTextureWidth(Texture* texture) {
	return texture->width;
}

int gc_GetTextureHeight(Texture* texture) {
	return texture->height;
}

void gc_ChangeTextureWidth(Texture* texture, float width) {
	texture->width = width;
}

void gc_ChangeTextureHeight(Texture* texture, float height) {
	texture->height = height;
}

void gc_DisableTextureFilter(Texture2D *texture) {
	SetTextureFilter(*texture, TEXTURE_FILTER_POINT);
}

// Settings
void gc_SetTargetFPS(int fps) {
    SetTargetFPS(fps);
}

void gc_ClearBackground(int R, int G, int B, int A) {
    Color color = CLITERAL(Color){R, G, B, A};
    ClearBackground(color);
}

void gc_SetConfigFlags(unsigned int flags) {
	SetConfigFlags(flags);
}


// Draw Text
void gc_DrawFPS(int posX, int posY) {
    DrawFPS(posX, posY);
}

void gc_DrawText(const char *Text, int X, int Y, float fontSize, int r, int g, int b, int a) {
	DrawText(Text, X, Y, fontSize, CLITERAL(Color){(int)r, (int)g, (int)b, (int)a});
}

void gc_DrawTextEx(Font* font, const char *Text, int X, int Y, float fontSize, float TextSpacing, int r, int g, int b, int a) {
	DrawTextEx(*font, Text, (Vector2){X, Y}, fontSize, TextSpacing, CLITERAL(Color){(int)r, (int)g, (int)b, (int)a});
}



// Rectangle
void gc_DrawRectangleRec(float x, float y, float width, float heigh, float r, float g, float b, float a) {
	DrawRectangleRec((Rectangle){x, y, width, heigh}, CLITERAL(Color){(int)r, (int)g, (int)b, (int)a});
}

void gc_DrawRectangleRounded(float x, float y, float width, float height, float roundness, int segments, int r, int g, int b, int a) {
	DrawRectangleRounded((Rectangle){x, y, width, height}, roundness, segments, CLITERAL(Color){(int)r, (int)g, (int)b, (int)a});
}

void gc_DrawRectanglePro(float x, float y, float width, float height, float OriginX, float OriginY, float rotation, int r, int g, int b, int a) {
	DrawRectanglePro((Rectangle){x, y, width, height}, (Vector2){OriginX, OriginY}, rotation, CLITERAL(Color){r, g, b, a});
}

void gc_DrawRectangleLines(int posX, int posY, int width, int height, int r, int g, int b, int a) {
	DrawRectangleLines(posX, posY, width, height, CLITERAL(Color){r, g, b, a});
}

void gc_DrawRectangleLinesEx(float x, float y, float width, float height, float lineThick, int r, int g, int b, int a) {
	DrawRectangleLinesEx((Rectangle){x, y, width, height}, lineThick, CLITERAL(Color){r, g, b, a});
}

void gc_DrawRectangleRoundedLines(float x, float y, float width, float height, float roundness, int segments, int r, int g, int b, int a) {
	DrawRectangleRoundedLines((Rectangle){x, y, width, height}, roundness, segments, CLITERAL(Color){r, g, b, a});
}

void gc_DrawRectangleRoundedLinesEx(float x, float y, float width, float height, float roundness, int segments, float lineThick, int r, int g, int b, int a) {
	DrawRectangleRoundedLinesEx((Rectangle){x, y, width, height}, roundness, segments, lineThick, CLITERAL(Color){r, g, b, a});
}



// Texture Draw
void gc_DrawTexture(Texture2D* texture, float posX, float posY, int r, int g, int b, int a) {
	DrawTexture(*texture, posX, posY, CLITERAL(Color){r, g, b, a});
}

void gc_DrawTextureRec(
		Texture2D *texture, 
		float x, float y, float width, float height, 
		float posX, float posY, 
		int r, int g, int b, int a
	) {
	
	DrawTextureRec(
		*texture, 
		(Rectangle){x, y, width, height}, 
		(Vector2){posX, posY},
		(Color){r, g, b, a}
	);

}

void gc_DrawTextureEx(Texture2D* texture, float x, float y, float rotation, float scale, int r, int g, int b, int a) {
	DrawTextureEx(*texture, (Vector2){x, y}, rotation, scale, CLITERAL(Color){r, g, b, a});
}

// not finish yet!!
void gc_DrawTexturePro(
		Texture2D* texture, 
		float sourceX, float sourceY, float sourceWidth, float sourceHeight, 
		float destX, float destY, float destWidth, float destHeight, 
		float originX, float originY, 
		float rotation, 
		int r, int g, int b, int a
	) {
		DrawTexturePro(
			*texture, 
			(Rectangle){sourceX, sourceY, sourceWidth, sourceHeight}, 
			(Rectangle){destX, destY, destWidth, destHeight}, 
			(Vector2){originX, originY}, 
			rotation, 
			CLITERAL(Color){r, g, b, a}
	);

}


// Extra
bool gcFileExists(const char* filePath) {
    return FileExists(filePath);
}



// Check Collision
bool gc_CheckCollisionRecs(
		float rec1X, float rec1Y, float rec1Width, float rec1Height,
		float rec2X, float rec2Y, float rec2Width, float rec2Height
	) {
		return CheckCollisionRecs(
			(Rectangle){rec1X, rec1Y, rec1Width, rec1Height}, 
			(Rectangle){rec2X, rec2Y, rec2Width, rec2Height}
		);
	}

bool gc_CheckCollisionCircles(
		float c1X, float c1Y, float radius1, 
		float c2X, float c2Y, float radius2
	) {
		return CheckCollisionCircles(
			(Vector2){c1X, c1Y}, radius1, 
			(Vector2){c2X, c2Y}, radius2
		);
	}

bool gc_CheckCollisionCircleRec(
		float CenterX, float CenterY, float radius, 
		float RecX, float RecY, float RecWidth, float RecHeight
	) {
		return CheckCollisionCircleRec(
			(Vector2){CenterX, CenterY}, radius, 
			(Rectangle){RecX, RecY, RecWidth, RecHeight}
		);
	}


bool gc_CheckCollisionMousetoRec(
    float PointX, float PointY,
    float RecX, float RecY, float RecWidth, float RecHeight
) {
    return CheckCollisionPointRec(
        (Vector2){ PointX, PointY },
        (Rectangle){ RecX, RecY, RecWidth, RecHeight }
    );
}






