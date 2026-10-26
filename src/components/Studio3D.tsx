import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Eye, RotateCw, Palette, Scissors, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Studio3DProps {
  onCustomizeOrder: (customOptions: {
    colorName: string;
    hex: string;
    embroidery: string;
    neckline: string;
    notes: string;
  }) => void;
}

export const Studio3D: React.FC<Studio3DProps> = ({ onCustomizeOrder }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  // Customization state
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({
    name: 'Rani Pink',
    hex: '#E91E63',
  });
  const [selectedEmbroidery, setSelectedEmbroidery] = useState<string>('Zari Brocade');
  const [selectedNeckline, setSelectedNeckline] = useState<string>('Sweetheart Neck');
  const [isRotating, setIsRotating] = useState(true);

  // References to pass into Three.js
  const mannequinBodiceRef = useRef<THREE.Mesh | null>(null);
  const fabricDrapeRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  const colorPresets = [
    { name: 'Rani Pink', hex: '#E91E63' },
    { name: 'Royal Emerald', hex: '#0F4C3F' },
    { name: 'Jaipur Gold', hex: '#D4AF37' },
    { name: 'Deep Maroon', hex: '#6A1B29' },
    { name: 'Ivory Cream', hex: '#FFF8F0' },
  ];

  const embroideryTypes = ['Zari Brocade', 'Mirror Accents', 'Minimal Silk', 'Heavy Bridal'];
  const necklineTypes = ['Sweetheart Neck', 'Boat Neck', 'Deep Back Dori', 'Queen Anne'];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;

    try {
      // Detect software WebGL per Three.js skill
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

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFF8F0');
    scene.fog = new THREE.FogExp2(0xFFF8F0, 0.04);

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map using PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.2);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x0f4c3f, 0.9);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Assembly Group for Composite Procedural Tailoring Mannequin (10 Parts)
    const mannequinGroup = new THREE.Group();
    mannequinGroup.position.set(0, -0.9, 0);
    scene.add(mannequinGroup);

    // 1. Turned Wooden Pedestal Base
    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e1a0f,
      roughness: 0.35,
      metalness: 0.1,
    });
    const basePlateGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.06, 32);
    const basePlate = new THREE.Mesh(basePlateGeo, woodMaterial);
    basePlate.position.y = 0.03;
    basePlate.receiveShadow = !isSoftwareGl;
    mannequinGroup.add(basePlate);

    const baseTorusGeo = new THREE.TorusGeometry(0.38, 0.04, 16, 32);
    baseTorusGeo.rotateX(Math.PI / 2);
    const baseTorus = new THREE.Mesh(baseTorusGeo, woodMaterial);
    baseTorus.position.y = 0.08;
    mannequinGroup.add(baseTorus);

    // 2. Brass Support Pole & Height Collar
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.88,
    });
    const poleGeo = new THREE.CylinderGeometry(0.024, 0.024, 1.4, 24);
    const pole = new THREE.Mesh(poleGeo, brassMaterial);
    pole.position.y = 0.78;
    pole.castShadow = !isSoftwareGl;
    mannequinGroup.add(pole);

    const collarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 24);
    const collar = new THREE.Mesh(collarGeo, brassMaterial);
    collar.position.y = 0.95;
    mannequinGroup.add(collar);

    // 3. Tailored Torso Bodice Form (Contoured Female Mannequin Silhouette)
    // Create organic contour points for LatheGeometry
    const lathePoints: THREE.Vector2[] = [];
    lathePoints.push(new THREE.Vector2(0.18, 0.95)); // bottom edge
    lathePoints.push(new THREE.Vector2(0.24, 1.05)); // hip contour
    lathePoints.push(new THREE.Vector2(0.21, 1.18)); // lower waist
    lathePoints.push(new THREE.Vector2(0.19, 1.26)); // narrow waist
    lathePoints.push(new THREE.Vector2(0.23, 1.38)); // ribcage
    lathePoints.push(new THREE.Vector2(0.26, 1.48)); // bust apex
    lathePoints.push(new THREE.Vector2(0.25, 1.56)); // upper chest
    lathePoints.push(new THREE.Vector2(0.22, 1.65)); // clavicle
    lathePoints.push(new THREE.Vector2(0.12, 1.74)); // neck base
    lathePoints.push(new THREE.Vector2(0.09, 1.80)); // neck

    const bodiceGeo = new THREE.LatheGeometry(lathePoints, 32);
    bodiceGeo.scale(1.0, 1.0, 0.68); // Slight oval depth for natural body proportions

    // Fabric material for bodice
    const fabricMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedColor.hex),
      roughness: 0.42,
      metalness: 0.18,
    });
    const bodiceMesh = new THREE.Mesh(bodiceGeo, fabricMaterial);
    bodiceMesh.castShadow = !isSoftwareGl;
    bodiceMesh.receiveShadow = !isSoftwareGl;
    mannequinBodiceRef.current = bodiceMesh;
    mannequinGroup.add(bodiceMesh);

    // 4. Brass Neck Finial Cap
    const neckCapGeo = new THREE.SphereGeometry(0.1, 24, 16);
    neckCapGeo.scale(1, 1.3, 1);
    const neckCap = new THREE.Mesh(neckCapGeo, brassMaterial);
    neckCap.position.y = 1.86;
    neckCap.castShadow = !isSoftwareGl;
    mannequinGroup.add(neckCap);

    // 5. Procedural Measuring Tape wrapped around waist
    const tapeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22, 1.27, 0.0),
      new THREE.Vector3(0.16, 1.26, 0.14),
      new THREE.Vector3(-0.16, 1.25, 0.14),
      new THREE.Vector3(-0.21, 1.26, -0.02),
      new THREE.Vector3(-0.14, 1.27, -0.15),
      new THREE.Vector3(0.15, 1.28, -0.14),
      new THREE.Vector3(0.23, 1.29, 0.08),
      new THREE.Vector3(0.18, 1.05, 0.22), // hanging tail
      new THREE.Vector3(0.14, 0.72, 0.18),
    ]);
    const tapeGeo = new THREE.TubeGeometry(tapeCurve, 48, 0.015, 8, false);
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0xf5d061,
      roughness: 0.5,
      metalness: 0.2,
    });
    const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
    mannequinGroup.add(tapeMesh);

    // 6. Draped Royal Silk Sash / Pleats over shoulder
    const drapeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, 1.68, 0.08),
      new THREE.Vector3(-0.14, 1.54, 0.22),
      new THREE.Vector3(0.04, 1.34, 0.24),
      new THREE.Vector3(0.20, 1.15, 0.18),
      new THREE.Vector3(0.24, 0.88, 0.16),
      new THREE.Vector3(0.26, 0.55, 0.12),
    ]);
    const drapeGeo = new THREE.TubeGeometry(drapeCurve, 32, 0.045, 12, false);
    const drapeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.65,
    });
    const drapeMesh = new THREE.Mesh(drapeGeo, drapeMat);
    fabricDrapeRef.current = drapeMesh;
    mannequinGroup.add(drapeMesh);

    // 7. Base Accessories: Pincushion & Scissors
    const pincushionGeo = new THREE.SphereGeometry(0.07, 16, 12);
    pincushionGeo.scale(1, 0.55, 1);
    const pincushionMat = new THREE.MeshStandardMaterial({
      color: 0xe91e63,
      roughness: 0.7,
    });
    const pincushion = new THREE.Mesh(pincushionGeo, pincushionMat);
    pincushion.position.set(-0.24, 0.08, 0.14);
    mannequinGroup.add(pincushion);

    // Little colorful tailoring pins sticking out
    const pinColors = [0xffffff, 0xd4af37, 0x0f4c3f, 0xe91e63];
    for (let i = 0; i < 6; i++) {
      const pinHeadGeo = new THREE.SphereGeometry(0.012, 8, 8);
      const pinHeadMat = new THREE.MeshStandardMaterial({
        color: pinColors[i % pinColors.length],
        metalness: 0.5,
      });
      const pinHead = new THREE.Mesh(pinHeadGeo, pinHeadMat);
      const angle = (i / 6) * Math.PI * 2;
      pinHead.position.set(
        -0.24 + Math.cos(angle) * 0.04,
        0.13 + (i % 2) * 0.02,
        0.14 + Math.sin(angle) * 0.04
      );
      mannequinGroup.add(pinHead);
    }

    // 8. Ground Soft Radial Contact Shadow Disk
    const shadowGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      gradient.addColorStop(0, 'rgba(15, 76, 63, 0.35)');
      gradient.addColorStop(0.5, 'rgba(40, 20, 20, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 248, 240, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    mannequinGroup.add(shadowPlane);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.target.set(0, 0.45, 0);
    controlsRef.current = controls;

    // Render loop following software-WebGL pacing rules
    let animId = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRotatingRef.current) {
        mannequinGroup.rotation.y += delta * 0.35;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        controls?.dispose();
        renderer?.dispose();
        if (renderer?.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn('WebGL initialization fallback in Studio3D:', err);
      setHasWebGLError(true);
      return () => {};
    }
  }, []);

  // Update bodice material when color or embroidery changes
  useEffect(() => {
    if (mannequinBodiceRef.current) {
      const mat = mannequinBodiceRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(selectedColor.hex);

      if (selectedEmbroidery === 'Zari Brocade') {
        mat.metalness = 0.45;
        mat.roughness = 0.35;
      } else if (selectedEmbroidery === 'Mirror Accents') {
        mat.metalness = 0.6;
        mat.roughness = 0.25;
      } else if (selectedEmbroidery === 'Heavy Bridal') {
        mat.metalness = 0.55;
        mat.roughness = 0.3;
      } else {
        mat.metalness = 0.15;
        mat.roughness = 0.5;
      }
      mat.needsUpdate = true;
    }
  }, [selectedColor, selectedEmbroidery]);

  const handleCameraPreset = (view: 'front' | 'side' | 'back' | 'close') => {
    if (!controlsRef.current) return;
    setIsRotating(false);
    const controls = controlsRef.current;
    if (view === 'front') {
      controls.object.position.set(0, 0.45, 3.4);
    } else if (view === 'side') {
      controls.object.position.set(3.2, 0.45, 0.5);
    } else if (view === 'back') {
      controls.object.position.set(0, 0.45, -3.4);
    } else if (view === 'close') {
      controls.object.position.set(0, 0.65, 2.2);
    }
    controls.target.set(0, 0.45, 0);
    controls.update();
  };

  return (
    <section id="studio-3d" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF8F0] via-[#FAF3EC] to-[#FFF8F0] border-y border-[#0F4C3F]/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F4C3F]/10 text-[#0F4C3F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#E91E63]" />
            Interactive 3D Tailoring Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]">
            Design & Visualize Your Tailored Silhouette
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Rotate 360°, inspect neckline cuts, preview opulent Indian silks and zari borders, and send your custom 3D configuration directly to our master tailors.
          </p>
        </div>

        {/* 3D Viewport Container */}
        <div className="relative w-full h-[540px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-[#0F4C3F]/15 bg-[#FFF8F0]">
          {/* Top Info Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md border border-gray-100 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F4C3F] ring-2 ring-[#0F4C3F]/20"></span>
            <span className="font-semibold text-gray-800">Radha Procedural Mannequin</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">PBR Studio Lighting</span>
          </div>

          {/* Camera View Angle Pills (Top Right) */}
          <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-md border border-gray-100 text-xs">
            <button
              onClick={() => handleCameraPreset('front')}
              className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Front
            </button>
            <button
              onClick={() => handleCameraPreset('side')}
              className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Side
            </button>
            <button
              onClick={() => handleCameraPreset('back')}
              className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Back Detail
            </button>
            <button
              onClick={() => handleCameraPreset('close')}
              className="px-2.5 py-1 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Close-up
            </button>
            <button
              onClick={() => setIsRotating(!isRotating)}
              aria-label="Toggle auto-rotation"
              className={`p-1.5 rounded-lg transition ${isRotating ? 'bg-[#0F4C3F] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
              title="Toggle Auto Rotate"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Three.js Canvas Mount or Fallback */}
          {hasWebGLError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FFF8F0] to-[#FAF3EC] text-center">
              <div
                className="w-48 h-64 rounded-3xl shadow-xl border-4 border-white flex flex-col items-center justify-center p-4 transition-all duration-500"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <img
                  src="/assets/aistudio/logo_3fe417b7.png"
                  alt="Tailoring Preview"
                  className="w-24 h-24 object-contain filter drop-shadow-md bg-white/90 p-2 rounded-2xl"
                />
                <span className="mt-3 text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">
                  {selectedColor.name} Bodice
                </span>
                <span className="text-[10px] text-white/90">
                  {selectedNeckline} • {selectedEmbroidery}
                </span>
              </div>
            </div>
          ) : (
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          )}

          {/* Unified Collapsible Bottom Control Dock */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300 ${
              isCollapsed ? 'translate-y-[calc(100%-42px)]' : 'translate-y-0'
            }`}
          >
            {/* Collapse / Expand Tab Button */}
            <div className="flex justify-center -mb-px">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-white/95 text-xs font-semibold text-[#0F4C3F] shadow-md border-t border-x border-[#0F4C3F]/15 hover:bg-white transition"
              >
                {isCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#E91E63]" /> Show Studio Customizer
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#E91E63]" /> Hide Customizer (Zen Mode)
                  </>
                )}
              </button>
            </div>

            {/* Main Dock Surface */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0F4C3F]/15">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* 1. Fabric Color Swatches */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2">
                    <Palette className="w-3.5 h-3.5 text-[#E91E63]" />
                    Bodice Silk Color: <span className="text-[#0F4C3F] font-semibold">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {colorPresets.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        aria-label={`Select color ${c.name}`}
                        style={{ backgroundColor: c.hex }}
                        className={`w-7 h-7 rounded-full shadow-sm transition transform hover:scale-110 flex items-center justify-center border-2 ${
                          selectedColor.name === c.name ? 'border-[#0F4C3F] ring-2 ring-[#0F4C3F]/30 scale-105' : 'border-white'
                        }`}
                      >
                        {selectedColor.name === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#FFF8F0' ? 'text-gray-800' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Embroidery & Neckline Selectors */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Work / Finish
                    </label>
                    <select
                      value={selectedEmbroidery}
                      onChange={(e) => setSelectedEmbroidery(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-200 bg-gray-50 py-1.5 px-2 text-gray-800 font-medium focus:ring-1 focus:ring-[#0F4C3F] focus:border-[#0F4C3F]"
                    >
                      {embroideryTypes.map((emb) => (
                        <option key={emb} value={emb}>
                          {emb}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Neckline
                    </label>
                    <select
                      value={selectedNeckline}
                      onChange={(e) => setSelectedNeckline(e.target.value)}
                      className="w-full text-xs rounded-lg border-gray-200 bg-gray-50 py-1.5 px-2 text-gray-800 font-medium focus:ring-1 focus:ring-[#0F4C3F] focus:border-[#0F4C3F]"
                    >
                      {necklineTypes.map((neck) => (
                        <option key={neck} value={neck}>
                          {neck}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Action Button */}
                <div className="flex items-center justify-end">
                  <button
                    onClick={() =>
                      onCustomizeOrder({
                        colorName: selectedColor.name,
                        hex: selectedColor.hex,
                        embroidery: selectedEmbroidery,
                        neckline: selectedNeckline,
                        notes: `3D Studio Configuration: Color: ${selectedColor.name}, Neckline: ${selectedNeckline}, Work: ${selectedEmbroidery}.`,
                      })
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0F4C3F] to-[#176655] hover:from-[#0d3f34] hover:to-[#0F4C3F] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition transform active:scale-95"
                  >
                    <Scissors className="w-4 h-4 text-[#D4AF37]" />
                    Order This 3D Custom Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
