from fastapi import FastAPI

app = FastAPI()

#EXAMPLE FUNCTION
@app.get("/")
async def root():
    return {"message": "Hello World"}