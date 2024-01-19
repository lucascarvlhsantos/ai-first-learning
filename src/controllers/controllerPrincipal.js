import { Graph, GraphEditor } from '../services/services.graph.js';

const canvas = document.getElementById('canvas');
const graphEditor = new GraphEditor(new Graph(), canvas);

const animate = () => {
    graphEditor.ctx.clearRect(0, 0, canvas.width, canvas.height);
    graphEditor.renderizar();
    requestAnimationFrame(animate);
}

animate();