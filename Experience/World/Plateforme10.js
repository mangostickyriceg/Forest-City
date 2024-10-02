import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience.js'

export default class Bike {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.plateforme10 = this.resources.items.plateforme10
		this.actualPlateforme10 = this.plateforme10.scene
		this.plateforme10Children = {}

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1
		}

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('plateforme10')
			this.obj = {
				colorObj: { r: 0, g: 0, b: 0 }
			}
		}

		this.scene.add(this.actualPlateforme10)
		this.actualPlateforme10.scale.set(0.01, 0.01, 0.01)
	}
	resize() {}
	update() {}
}
