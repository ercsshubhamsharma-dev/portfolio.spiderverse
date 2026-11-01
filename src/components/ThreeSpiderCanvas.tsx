import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react';

interface ThreeSpiderCanvasProps {
  primaryColor?: string;
  secondaryColor?: string;
  scrollProgress?: number;
}

// Pre-allocated math vectors for zero-GC render loop
const _tempVec = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetCamLook = new THREE.Vector3();

export const ThreeSpiderCanvas: React.FC<ThreeSpiderCanvasProps> = ({
  primaryColor = '#e2252b',
  secondaryColor = '#00d4ff',
  scrollProgress = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [activeCameraAngle, setActiveCameraAngle] = useState<'cinematic' | 'rooftop' | 'nexus'>('cinematic');
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Mutable refs to pass into the animation loop without restarting
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const colorRef = useRef({ primary: primaryColor, secondary: secondaryColor });
  colorRef.current = { primary: primaryColor, secondary: secondaryColor };

  const angleRef = useRef(activeCameraAngle);
  angleRef.current = activeCameraAngle;

  const wireframeRef = useRef(wireframeOnly);
  wireframeRef.current = wireframeOnly;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.028);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 14);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e111a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2252b, 2.5);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00d4ff, 2.8);
    rimLight.position.set(-10, 10, -10);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0x00d4ff, 0xe2252b, 0.7);
    scene.add(fillLight);

    // 4. Procedural 3D Skyline Buildings Group
    const cityGroup = new THREE.Group();
    const buildingGeom = new THREE.BoxGeometry(1, 1, 1);

    const buildingMatDark = new THREE.MeshStandardMaterial({
      color: 0x0c0c12,
      roughness: 0.85,
      metalness: 0.2,
    });

    const buildingCount = isSoftwareGl ? 45 : 75;
    const windowCubes: THREE.Mesh[] = [];

    for (let i = 0; i < buildingCount; i++) {
      const bHeight = 2 + Math.random() * 8;
      const bWidth = 0.8 + Math.random() * 1.6;
      const bDepth = 0.8 + Math.random() * 1.6;

      const building = new THREE.Mesh(buildingGeom, buildingMatDark);
      building.scale.set(bWidth, bHeight, bDepth);

      const angle = (i / buildingCount) * Math.PI * 2;
      const radius = 10 + Math.random() * 8;
      building.position.set(
        Math.cos(angle) * radius,
        bHeight / 2 - 4,
        Math.sin(angle) * radius - 4
      );
      cityGroup.add(building);

      // Neon window trim accent on select buildings
      if (i % 3 === 0) {
        const accentMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xe2252b : 0x00d4ff,
          wireframe: true,
        });
        const windowMesh = new THREE.Mesh(buildingGeom, accentMat);
        windowMesh.scale.set(bWidth * 1.01, bHeight * 0.95, bDepth * 1.01);
        windowMesh.position.copy(building.position);
        cityGroup.add(windowMesh);
        windowCubes.push(windowMesh);
      }
    }
    scene.add(cityGroup);

    // 5. Procedural 3D Multiverse Web Nexus Emblem (Composite 3-part Group)
    const nexusGroup = new THREE.Group();
    nexusGroup.position.set(0, 1.2, 0);

    // (Part 1: Primary faceted core)
    const coreGeom = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    nexusGroup.add(coreMesh);

    // (Part 2: Outer glowing holographic wireframe cage)
    const cageGeom = new THREE.IcosahedronGeometry(1.9, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xe2252b,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    nexusGroup.add(cageMesh);

    // (Part 3: Secondary orbital quantum rings)
    const ringGeom = new THREE.TorusGeometry(2.4, 0.04, 12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh1 = new THREE.Mesh(ringGeom, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    nexusGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeom, ringMat.clone());
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    nexusGroup.add(ringMesh2);

    scene.add(nexusGroup);

    // 6. Floating Comic Halftone Particles / Web Node Points
    const particleCount = isSoftwareGl ? 120 : 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colRed = new THREE.Color(0xe2252b);
    const colBlue = new THREE.Color(0x00d4ff);
    const colWhite = new THREE.Color(0xf1f1f5);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16 + 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 22;

      const pickColor = Math.random();
      const col = pickColor < 0.45 ? colRed : pickColor < 0.9 ? colBlue : colWhite;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 7. Mouse coordinates & Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Continuous Render Loop with Software WebGL Guard & Scroll-driven Camera Path
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const progress = scrollRef.current;
      const angleMode = angleRef.current;

      // Update colors dynamically based on active multiverse theme
      const currColors = colorRef.current;
      keyLight.color.setStyle(currColors.primary);
      rimLight.color.setStyle(currColors.secondary);
      cageMat.color.setStyle(currColors.primary);
      ringMat.color.setStyle(currColors.secondary);
      coreMat.wireframe = wireframeRef.current;

      // Animate 3D Nexus Emblem
      nexusGroup.rotation.y += 0.45 * delta;
      nexusGroup.rotation.x = Math.sin(now * 0.001) * 0.2;
      ringMesh1.rotation.z += 0.7 * delta;
      ringMesh2.rotation.y += 0.5 * delta;

      // Drift particles subtly
      particles.rotation.y += 0.06 * delta;

      // Scroll-Driven 3D Camera Kinematics:
      // Smoothly maps page scroll progress to camera position & look-at vector
      if (angleMode === 'rooftop') {
        _targetCamPos.set(0, 8, 12);
        _targetCamLook.set(0, 0, 0);
      } else if (angleMode === 'nexus') {
        _targetCamPos.set(
          Math.sin(now * 0.0008) * 4.5,
          2.5 + Math.cos(now * 0.0006) * 1.2,
          4.5
        );
        _targetCamLook.set(0, 1.2, 0);
      } else {
        // Dynamic Cinematic Scroll Track
        // Progress 0.0 (Hero) -> 0.25 (Playground) -> 0.50 (Projects) -> 0.75 (About) -> 1.0 (Contact)
        const t = progress;
        const camX = Math.sin(t * Math.PI * 1.5) * 5 + mouseX * 0.8;
        const camY = 3.5 - t * 2.8 + mouseY * 0.5;
        const camZ = 13.5 - t * 4.5;

        _targetCamPos.set(camX, Math.max(camY, 0.8), camZ);

        const lookY = 1.2 - t * 1.5;
        _targetCamLook.set(Math.sin(t * Math.PI) * 1.5, lookY, 0);
      }

      // Smooth exponential damping for physical weight
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 3.5, delta);

      _tempVec.x = THREE.MathUtils.damp(_tempVec.x, _targetCamLook.x, 3.5, delta);
      _tempVec.y = THREE.MathUtils.damp(_tempVec.y, _targetCamLook.y, 3.5, delta);
      _tempVec.z = THREE.MathUtils.damp(_tempVec.z, _targetCamLook.z, 3.5, delta);
      camera.lookAt(_tempVec);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Pace loop on software WebGL
        frameId = window.setTimeout(tick, 50);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // 9. Cleanup
    return () => {
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      buildingGeom.dispose();
      buildingMatDark.dispose();
      coreGeom.dispose();
      coreMat.dispose();
      cageGeom.dispose();
      cageMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c1a] via-[#08080a] to-[#040406]" />
        <div className="absolute inset-0 halftone-bg" />
      </div>
    );
  }

  return (
    <>
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
          isCinemaMode ? 'z-40' : 'z-0'
        }`}
        style={{ opacity: isCinemaMode ? 1 : 0.88 }}
      />

      {/* Collapsible Ergonomic 3D Control Dock (Zero Viewport Occlusion) */}
      <div
        className={`fixed z-30 transition-all duration-300 pointer-events-auto left-1/2 -translate-x-1/2 ${
          isControlsCollapsed ? 'bottom-2' : 'bottom-5'
        }`}
        style={{ maxWidth: 'min(940px, 94vw)' }}
      >
        <div className="flex flex-col items-center">
          {/* Collapse Toggle Tab */}
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="px-3 py-1 text-xs font-mono tracking-wider uppercase text-neutral-400 hover:text-white bg-[#0e0e14]/90 border border-white/10 rounded-t-md hover:border-white/25 transition-colors shadow-lg cursor-pointer"
            title="Toggle 3D HUD controls"
          >
            {isControlsCollapsed ? '▲ 3D Canvas Controls' : '▼ Hide 3D Controls'}
          </button>

          {/* Unified Horizontal Control Dock */}
          {!isControlsCollapsed && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#0d0d14]/95 border border-white/15 rounded-b-xl rounded-t-sm shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#00d4ff] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e2252b]" />
                  3D Spider-Verse Engine
                </span>
              </div>

              {/* Camera Angle Selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setActiveCameraAngle('cinematic')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    activeCameraAngle === 'cinematic'
                      ? 'bg-[#e2252b] text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Cinematic Scroll
                </button>
                <button
                  onClick={() => setActiveCameraAngle('rooftop')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    activeCameraAngle === 'rooftop'
                      ? 'bg-[#00d4ff] text-black font-semibold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Rooftop
                </button>
                <button
                  onClick={() => setActiveCameraAngle('nexus')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    activeCameraAngle === 'nexus'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Web Nexus
                </button>
              </div>

              {/* Wireframe & Cinema Mode Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWireframeOnly(!wireframeOnly)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-colors flex items-center gap-1 cursor-pointer ${
                    wireframeOnly
                      ? 'border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/10'
                      : 'border-white/15 text-neutral-400 hover:text-white'
                  }`}
                  title="Toggle wireframe topology"
                >
                  <RotateCcw className="w-3 h-3" />
                  {wireframeOnly ? 'Solid' : 'Wireframe'}
                </button>

                <button
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCinemaMode
                      ? 'bg-[#e2252b] border-[#e2252b] text-white'
                      : 'border-white/15 text-neutral-300 hover:text-white bg-white/5'
                  }`}
                  title="Zen / Fullscreen 3D View"
                >
                  {isCinemaMode ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Exit Zen Mode
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#00d4ff]" />
                      Zen 3D Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
