#include <raylib.h>
#include <stdio.h>

int main(void) {
    const int screenWidth = 800;
    const int screenHeight = 450;

    InitWindow(screenWidth, screenHeight, "raylib [shapes] example - draw rectangle rounded");

    Rectangle Walls[] = {
        (Rectangle){0, 0, 0,0}
    };

    printf("X: %f, Y: %f, Width: %f, Height: %f \n", Walls[0].x, Walls[0].y, Walls[0].width, Walls[0].height);


    SetTargetFPS(60);
    while (!WindowShouldClose()) {

        BeginDrawing();



        EndDrawing();


    }



    CloseWindow();
    return 0;
}