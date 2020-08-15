import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

export function loadPlayer(){
	return loadImage('/img/me.png')
	.then(image=>{
	const sprites2=new SpriteSheet(image,100,100);
	sprites2.define('player',0,0);
	return sprites2;
	});
}