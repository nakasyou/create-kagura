import { Kagura } from "kagurajs"
import MainScene from "./scenes/MainScene.ts"

const app = new Kagura({
  element: document.getElementById("app") as HTMLCanvasElement,
  startScene: MainScene,
})

kagura.setCanvasSize(1000,200)
await app.start()
