const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader()

const geometry = new THREE.PlaneGeometry(5, 3, 50, 30);

const material = new THREE.MeshBasicMaterial( { 
    map: loader.load('img.jfif')
} );

const flag = new THREE.Mesh( geometry, material );
scene.add( flag );

flag.rotation.set(-0.1,0,0)

camera.position.z = 5;

const clock = new THREE.Clock()
let t = 0
function animate() {

     t += .07// clock.getElapsedTime()
    flag.geometry.vertices.map(v=> {

        const waveOne = 0.3 * Math.sin(v.x * 1 + t)
        const waveTwo = -0.6 * Math.sin(v.x * 3 + t)
        const waveThree = -0.2 * Math.sin(v.x * 2 + t)
        const waveFour = -0.8 * Math.sin(v.y  * 2+ t)

        v.z = waveOne + waveTwo + waveThree + waveFour
        // v.z = 0.5 * Math.sin(v.x * 2) - v.x - отвечает за кол-во волн
    })

    flag.geometry.verticesNeedUpdate = true

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}
animate();