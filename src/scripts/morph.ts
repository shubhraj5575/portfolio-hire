// /hire — one 3D object that takes a new shape for every section.
import {
  AmbientLight, BoxGeometry, BufferGeometry, DirectionalLight, DodecahedronGeometry, EdgesGeometry, Group, IcosahedronGeometry,
  LineBasicMaterial, LineSegments, Mesh, MeshPhysicalMaterial, OctahedronGeometry, PerspectiveCamera, PointLight, Scene,
  TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, WebGLRenderer,
} from 'three';
import { chapterAt } from './chapter';

const sections = [...document.querySelectorAll<HTMLElement>('section')];
const bg = document.querySelector<HTMLElement>('.bg')!;
const dots = document.querySelector('.dots')!;
const links = [...document.querySelectorAll<HTMLAnchorElement>('.pill a')];
const mobile = () => innerWidth < 760;

// bubbles drifting up behind everything
for (let i = 0; i < 14; i++) {
  const b = document.createElement('span');
  b.className = 'bubble';
  const s = 10 + Math.random() * 34;
  b.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s}px;animation-duration:${9 + Math.random() * 12}s;animation-delay:${-Math.random() * 20}s`;
  document.body.appendChild(b);
}

sections.forEach(() => dots.appendChild(document.createElement('i')));
let active = -1;
function activate(i: number) {
  if (i === active) return;
  active = i;
  sections[i].classList.add('in');
  [...dots.children].forEach((d, j) => d.classList.toggle('on', i === j));
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + sections[i].id));
}

// magnetic buttons and tilting cards
document.querySelectorAll<HTMLElement>('.mag').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});
document.querySelectorAll<HTMLElement>('.card').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(500px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateY(-4px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

const renderer = new WebGLRenderer({ canvas: document.getElementById('gl') as HTMLCanvasElement, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new Scene();
const camera = new PerspectiveCamera(40, 1, 0.1, 50);
camera.position.z = 7;
scene.add(new AmbientLight(0xbfffe6, 1.5));
const key = new DirectionalLight(0xffffff, 3.2); key.position.set(3, 4, 5); scene.add(key);
const pink = new PointLight(0xff8fc8, 5, 0, 0); pink.position.set(-4, -2, 3); scene.add(pink);
const lime = new PointLight(0xd6ff7a, 3.6, 0, 0); lime.position.set(4, 2, 2); scene.add(lime);

// One shape per section, in page order.
const geos: BufferGeometry[] = [
  new IcosahedronGeometry(1.5, 0),          // hero: a raw gem
  new OctahedronGeometry(1.6, 0),           // services: cut and sharpened
  new TorusKnotGeometry(1, 0.34, 120, 14),  // WhatsApp: many threads, one knot
  new BoxGeometry(1.9, 1.9, 1.9),           // CRM: structure
  new TorusGeometry(1.15, 0.46, 14, 48),    // briefing: a loop that runs every day
  new DodecahedronGeometry(1.5, 0),         // process: many faces, one solid
  new IcosahedronGeometry(1.5, 2),          // proof: polished
  new TetrahedronGeometry(1.7, 0),          // contact: an arrow forward
];
const group = new Group(); scene.add(group);
const mat = new MeshPhysicalMaterial({ color: 0x8ff0c4, metalness: 0.25, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.1, flatShading: true });
const edge = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
const shapes = sections.map((_, i) => {
  const g = geos[i % geos.length];
  const m = new Mesh(g, mat);
  m.add(new LineSegments(new EdgesGeometry(g, 20), edge));
  m.scale.setScalar(0);
  group.add(m);
  return m;
});

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// On wide screens the object sits in the space the copy leaves free, and shrinks to fit it.
// Mirrors the layout in hire.css: 7vw side padding and a copy column of at most 540px.
function slot(side: number) {
  const halfW = Math.tan((camera.fov / 2) * Math.PI / 180) * camera.position.z * camera.aspect;
  const pad = innerWidth * 0.07, copyW = Math.min(540, innerWidth - pad * 2);
  const free = innerWidth - pad - copyW;
  const centre = (pad + copyW + free / 2) / innerWidth * 2 - 1;
  return { x: side * centre * halfW, scale: Math.min(1, (free / innerWidth) * halfW * 0.9 / 1.6) };
}

let px = 0, py = 0, cx = 0;
addEventListener('pointermove', e => { px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5; });
const ease = (t: number) => t * t * (3 - 2 * t);

function frame(t: number) {
  const c = chapterAt(sections);
  const i = Math.round(c);
  activate(i);
  shapes.forEach((m, j) => { const s = ease(Math.max(0, 1 - Math.abs(c - j) * 1.5)); m.scale.setScalar(s); m.visible = s > 0.001; });
  const side = i % 2 === 0 ? 1 : -1;        // the object sits opposite the copy
  const m = mobile();
  const spot = slot(side);
  const tx = m ? 0 : spot.x;
  cx += (tx - cx) * 0.06;
  group.position.set(cx + px * 0.3, (m ? 1.5 : 0) - py * 0.3 + Math.sin(t / 900) * 0.12, 0);
  group.scale.setScalar(m ? 0.52 : spot.scale);
  group.rotation.set(scrollY * 0.0016 + py * 0.4, scrollY * 0.0028 + t / 4000 + px * 0.6, 0);
  bg.style.setProperty('--gx', m ? '50%' : 50 + side * 18 + '%');
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
