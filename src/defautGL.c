
#include "raylib.h"

//------------------------------------------------------------------------------------
// Program main entry point
//------------------------------------------------------------------------------------
int main(void)
{
    // Initialization
    //--------------------------------------------------------------------------------------
    const int screenWidth = 1920;
    const int screenHeight = 900;

    InitWindow(screenWidth, screenHeight, "raylib [models] example - loading gltf");

    // Define the camera to look into our 3d world
    Camera camera = { 0 };
    camera.position = (Vector3){ 6.0f, -1.0f, 6.0f };    // Camera position
    camera.target = (Vector3){ 0.0f, 2.0f, 0.0f };      // Camera looking at point
    camera.up = (Vector3){ 0.0f, 1.0f, 0.0f };          // Camera up vector (rotation towards target)
    camera.fovy = 90.0f;                                // Camera field-of-view Y
    camera.projection = CAMERA_PERSPECTIVE;             // Camera projection type

	char MrVegasPath[] = "./MrVegas.glb";

    Model model = LoadModel(MrVegasPath);
    Vector3 position = { 0.0f, 0.0f, 0.0f }; // Set model world position

    // Load model animations
    int animCount = 0;
    ModelAnimation *anims = LoadModelAnimations(MrVegasPath, &animCount);

    // Animation playing variables
    int animIndex = 10;                  // Current animation playing
    float animCurrentFrame = 0.0f;      // Current animation frame (supporting interpolated frames)
    float animFrameSpeed = 0.5f;        // Animation play speed
    bool animPause = false;             // Pause animation

    // UI required variables
    char *animNames[64] = { 0 };
    for (int i = 0; i < animCount; i++) animNames[i] = anims[i].name;

	int AAA[50];

	AAA[51] = 31;

    SetTargetFPS(60);                   // Set our game to run at 60 frames-per-second
    //--------------------------------------------------------------------------------------

    // Main game loop
    while (!WindowShouldClose())        // Detect window close button or ESC key
    {
        // Update
        //----------------------------------------------------------------------------------
        UpdateCamera(&camera, CAMERA_ORBITAL);


        if (!animPause && (animIndex < animCount))
        {
            // Update model animation
            animCurrentFrame += animFrameSpeed;
            if (animCurrentFrame >= anims[animIndex].keyframeCount) animCurrentFrame = 0.0f;
            UpdateModelAnimation(model, anims[animIndex], animCurrentFrame);
        }



        // Draw
        //----------------------------------------------------------------------------------
        BeginDrawing();

            ClearBackground(RAYWHITE);

            BeginMode3D(camera);

                DrawModel(model, position, 1.0f, WHITE);

                DrawGrid(10, 1.0f);

            EndMode3D();

        EndDrawing();
        //----------------------------------------------------------------------------------
    }

    // De-Initialization
    //--------------------------------------------------------------------------------------
    UnloadModelAnimations(anims, animCount); // Unload model animations data
    UnloadModel(model);         // Unload model

    CloseWindow();              // Close window and OpenGL context
    //--------------------------------------------------------------------------------------

    return 0;
}
