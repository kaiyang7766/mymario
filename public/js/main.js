import {loadLevel} from './loaders/level.js';
import Entity from './Entity.js';
//import {loadMario} from './entities/Mario.js';
import {createMario} from './entities.js';
import Timer from './Timer.js';
import Compositor from './Compositor.js';
import {setupKeyboard} from './input.js';
import Camera from './Camera.js';
//import {setupMouseControl} from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

 Promise.all([
 	createMario(),
 	loadLevel('1-1'),
 ])
 .then(([mario,level])=>{
 	const camera = new Camera();
 	window.camera=camera;

 	//const mario =createMario();
 	mario.pos.set(50,90);

 	//mario.addTrait({
 	//	NAME: 'hacktrait',
 	//	spawnTimeout:0,
 	//	obstruct(){
//
 //		},
 	//	update(mario,deltaTime){
 	//		if (this.spawnTimeout>0.1 && mario.vel.y<0){
 	//			const spawn = createMario();
 	//			spawn.pos.x=mario.pos.x;
 	//			spawn.pos.y=mario.pos.y;
 	//			spawn.vel.y=mario.vel.y-200;
 	//			level.entities.add(spawn);
 	//			this.spawnTimeout=0;
 	//		}
 	//		this.spawnTimeout+=deltaTime;
 	//	}
 	//})
 	
 	//createCollisionLayer(level);

	level.entities.add(mario);

	//level.comp.layers.push(
	//	createCollisionLayer(level),
	//	createCameraLayer(camera));

 	const input=setupKeyboard(mario);
 	input.listenTo(window);

 	//setupMouseControl(canvas,mario,camera);

 	const timer= new Timer(1/60);

 	timer.update =function update(deltaTime){
 	level.comp.draw(context,camera);
 	level.update(deltaTime);
 	if (mario.pos.x>100){
 		camera.pos.x=mario.pos.x-100
 	}
 }
 	timer.start();
 });
