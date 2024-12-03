from typing import Annotated, Any, Optional, Union

from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI()

class ItemEvent(BaseModel):
  username:str
  icon_url:str
  text:str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post('/')
async def read_body(
  body:ItemEvent
):
  print(body)
  return {"done":True}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}