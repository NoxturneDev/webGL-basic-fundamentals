// console.log('start here')
const doc = window.document;
const canvas = doc.getElementById('canvas');

/** @type {WebGLRenderingContext} */
const gl = canvas.getContext('webgl');

if (!gl) {
  console.log('web gl is not supported');
  throw new Error('web gl is not supported');
}

// vertex data
const vertexData = [
  0, 1, 0,
  1, -1, 0,
  -1, -1, 0
];

// load to buffer 
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);


// create to vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
attributes vec3 position;

void main(){
  gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

// create fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
}
`);
gl.compileShader(fragmentShader);

// create program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// start program
const positionLoc = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0)

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);

console.log('logger start here...')
