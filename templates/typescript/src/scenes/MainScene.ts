import {
  Scene,
  type SceneConstructorOptions,
  Sprite,
  Asset,
} from "kagurajs"
import GoboImage from "../../assets/gobo.svg"

export default class MainScene extends Scene {
  gobo: Sprite
  constructor (options: SceneConstructorOptions) {
    super(options)
    this.gobo = {} as Sprite
  }
  async init () {
    this.gobo = await new Sprite().init({
      asset: new Asset().fromURL(GoboImage)
    })
    this.addChild(this.gobo)
  }
  frame () {
    this.gobo.x += Math.random() - 0.5
  }
}
