import {
  Scene,
  type SceneConstructorOptions,
  Sprite,
  Asset,
} from "kagurajs"
import ViteLogo from "../../assets/vite.svg"
import KaguraLogo from "../../assets/kagura.svg"

export default class MainScene extends Scene {
  vite: Sprite
  kagura: Sprite
  constructor (options: SceneConstructorOptions) {
    super(options)
    this.vite = {} as Sprite
    this.kagura = {} as Sprite
  }
  async init () {
    this.vite = await new Sprite().init({
      asset: new Asset().fromURL(ViteLogo)
    })
    this.vite.x = 0
    this.addChild(this.vite)
    
    this.kagura = await new Sprite().init({
      asset: new Asset().fromURL(KaguraLogo)
    })
    this.kagura.x = 800
    this.addChild(this.kagura)
  }
  frame () {
    this.vite.x += 0.1
    this.kagura.x -= 0.1
  }
}
