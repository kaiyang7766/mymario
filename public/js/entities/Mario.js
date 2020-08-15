import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import {loadSpriteSheet} from '../loaders.js';
import {createAnim} from '../anim.js';

export function loadMario(){
	return loadSpriteSheet('mario')
	.then(createMarioFactory);
}

function createMarioFactory(sprite){
	const runAnim=createAnim(['run-1','run-2','run-3'],6);
		function routeFrame(mario){
			if (mario.jump.falling){
				return 'jump';
			}
			if (mario.go.dir!==0){
				if ((mario.vel.x>0&&mario.go.dir<0)||(mario.vel.x<0&&mario.go.dir>0)){
					return 'break';
				}
				return runAnim(mario.go.distance);
			}
			return 'player';
		}
		function drawMario(context){
			sprite.draw(routeFrame(this),context,0,0,this.go.heading<0);
		}
		return function createMario(){
			const mario = new Entity();
			mario.size.set(50,50);
			
			mario.addTrait(new Go());
			mario.addTrait(new Jump());

			mario.draw=drawMario;

			return mario;
		}
	}