import {
  Scene,
  type SceneConstructorOptions,
  Sprite,
  Asset,
} from "kagurajs"
import viteLogo from "../../assets/vite.svg"
import kaguraLogo from "../../assets/kagura.svg"

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
      asset: await new Asset().fromURL(viteLogo)
    })
    this.vite.x = 0
    this.vite.y = 30
    this.vite.children[0]!.width = 150
    this.vite.children[0]!.height = 150
    //this.vite.height = 100

    this.addChild(this.vite)
    
    this.kagura = await new Sprite().init({
      asset: await new Asset().fromURL(kaguraLogo)
    })
    this.kagura.x = 500
    this.kagura.y = 30
    this.kagura.children[0]!.width = 130
    this.kagura.children[0]!.height = 150
    this.addChild(this.kagura)
  }
  frame () {
    this.vite.x += 0.1
    this.kagura.x -= 0.1
  }
}
