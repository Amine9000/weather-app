from multistep.model import getModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Allow all origins during development
origins = ["*"]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/temperature")
def get_temperature():
    output = getModel("temperature")
    return output

@app.get("/pressure")
def get_pressure():
    output = getModel("pressure")
    return output

@app.get("/humidity")
def get_pressure():
    output = getModel("humidity")
    return output

@app.get("/windv")
def get_pressure():
    output = getModel("windv")
    return output


@app.get("/all")
def get_pressure():
    temp = getModel("temperature")
    press = getModel("pressure")
    hum = getModel("humidity")
    windv = getModel("windv")
    return {"temp":temp[1][0],"press":press[1][0],"hum":hum[1][0],"windv":windv[1][0]}