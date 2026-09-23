import { useEffect, useId, useRef, useState } from "react";

/** A small, self-contained Three.js studio, loaded separately from the page. */
export default function HeroScene({ paused = false, onReady }) {
  const mountRef = useRef(null);
  const controllerRef = useRef(null);
  const readyCallbackRef = useRef(onReady);
  const pausedRef = useRef(paused);
  const [ready, setReady] = useState(false);
  const fallbackId = useId().replaceAll(":", "");

  useEffect(() => {
    readyCallbackRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    pausedRef.current = paused;
    controllerRef.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    let disposed = false;
    let renderer;
    let scene;
    let environment;
    let resizeObserver;
    let visibilityObserver;
    const removeListeners = [];

    const listen = (target, type, callback, options) => {
      target.addEventListener(type, callback, options);
      removeListeners.push(() =>
        target.removeEventListener(type, callback, options),
      );
    };

    const start = async () => {
      try {
        const [THREE, { RoomEnvironment }, { RoundedBoxGeometry }] =
          await Promise.all([
            import("three"),
            import("three/addons/environments/RoomEnvironment.js"),
            import("three/addons/geometries/RoundedBoxGeometry.js"),
          ]);
        if (disposed) return;

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.domElement.style.cssText =
          "display:block;width:100%;height:100%;outline-offset:-4px;touch-action:pan-y pinch-zoom;cursor:grab;";
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute(
          "aria-label",
          "Interactive cloud infrastructure: connected application servers, database, and deployment node. Drag with a mouse or use the arrow keys to rotate.",
        );
        renderer.domElement.setAttribute("tabindex", "0");
        mount.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
          -3.6,
          3.6,
          3.1,
          -3.1,
          0.1,
          50,
        );
        camera.position.set(7, 5.5, 8.5);
        camera.lookAt(0, 0.9, 0);

        const room = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        scene.environmentIntensity = 0.55;
        room.dispose();
        pmrem.dispose();

        scene.add(new THREE.HemisphereLight(0xadcaff, 0x080d18, 1.4));
        const keyLight = new THREE.DirectionalLight(0xc9e1ff, 4.5);
        keyLight.position.set(-3, 7, 5);
        scene.add(keyLight);
        const edgeLight = new THREE.DirectionalLight(0x3c76ff, 6);
        edgeLight.position.set(5, 3, -4);
        scene.add(edgeLight);
        const fillLight = new THREE.PointLight(0x28bdff, 8, 8, 2);
        fillLight.position.set(-2, 1.5, 2.5);
        scene.add(fillLight);

        const infrastructure = new THREE.Group();
        scene.add(infrastructure);
        const metal = new THREE.MeshPhysicalMaterial({
          color: 0x172944,
          metalness: 0.65,
          roughness: 0.3,
          clearcoat: 0.3,
          clearcoatRoughness: 0.25,
        });
        const faceMetal = new THREE.MeshStandardMaterial({
          color: 0x091323,
          metalness: 0.55,
          roughness: 0.4,
        });
        const topMetal = new THREE.MeshStandardMaterial({
          color: 0x203858,
          metalness: 0.7,
          roughness: 0.32,
        });
        const recess = new THREE.MeshStandardMaterial({
          color: 0x040914,
          metalness: 0.15,
          roughness: 0.7,
        });
        const blue = new THREE.MeshBasicMaterial({
          color: 0x428dff,
          toneMapped: false,
        });
        const cyan = new THREE.MeshBasicMaterial({
          color: 0x83eaff,
          toneMapped: false,
        });
        const mutedBlue = new THREE.MeshBasicMaterial({ color: 0x235690 });
        const addBox = (
          parent,
          dimensions,
          position,
          material,
          radius = 0.06,
        ) => {
          const mesh = new THREE.Mesh(
            new RoundedBoxGeometry(...dimensions, 3, radius),
            material,
          );
          mesh.position.set(...position);
          parent.add(mesh);
          return mesh;
        };
        const addLabel = (parent, text, position, width, color = "#8aa9cc") => {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 64;
          const context = canvas.getContext("2d");
          if (!context) return;
          context.font = "500 30px monospace";
          context.fillStyle = color;
          context.textBaseline = "middle";
          context.fillText(text, 8, 32);
          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          const label = new THREE.Mesh(
            new THREE.PlaneGeometry(width, width / 8),
            new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              depthWrite: false,
              toneMapped: false,
            }),
          );
          label.position.set(...position);
          parent.add(label);
          return label;
        };

        // A single circuit board gives every component a place in the system.
        addBox(infrastructure, [5.05, 0.2, 3.9], [0, -0.16, 0], faceMetal, 0.1);
        addBox(infrastructure, [4.98, 0.018, 3.82], [0, -0.05, 0], metal, 0.05);
        addBox(
          infrastructure,
          [4.66, 0.013, 0.015],
          [0, -0.026, 1.78],
          mutedBlue,
          0.005,
        );
        addBox(
          infrastructure,
          [0.015, 0.013, 3.45],
          [2.37, -0.026, 0],
          mutedBlue,
          0.005,
        );
        const gridPoints = [];
        for (let coordinate = -2.25; coordinate <= 2.25; coordinate += 0.45) {
          gridPoints.push(
            new THREE.Vector3(coordinate, -0.025, -1.7),
            new THREE.Vector3(coordinate, -0.025, 1.7),
          );
        }
        for (let coordinate = -1.7; coordinate <= 1.7; coordinate += 0.425) {
          gridPoints.push(
            new THREE.Vector3(-2.25, -0.025, coordinate),
            new THREE.Vector3(2.25, -0.025, coordinate),
          );
        }
        infrastructure.add(
          new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(gridPoints),
            new THREE.LineBasicMaterial({
              color: 0x35537d,
              transparent: true,
              opacity: 0.25,
            }),
          ),
        );

        const server = new THREE.Group();
        server.position.set(-0.22, 0.1, -0.68);
        infrastructure.add(server);
        const serverLayers = [];
        [
          "EDGE NETWORK",
          "DATA SERVICES",
          "DEPLOY ENGINE",
          "API GATEWAY",
        ].forEach((name, index) => {
          const tray = new THREE.Group();
          tray.position.y = 0.24 + index * 0.56;
          server.add(tray);
          serverLayers.push(tray);
          addBox(tray, [1.95, 0.4, 1.52], [0, 0, 0], metal, 0.09);
          addBox(tray, [1.88, 0.018, 1.43], [0, -0.17, 0], blue, 0.008);
          addBox(tray, [1.73, 0.25, 0.034], [0, 0, 0.758], faceMetal, 0.014);
          addBox(tray, [1.63, 0.02, 1.18], [0, 0.2, -0.025], topMetal, 0.009);
          for (let vent = 0; vent < 6; vent += 1) {
            addBox(
              tray,
              [0.038, 0.1, 0.014],
              [0.37 + vent * 0.073, 0.01, 0.782],
              recess,
              0.004,
            );
          }
          for (let led = 0; led < 3; led += 1) {
            addBox(
              tray,
              [0.048, 0.023, 0.018],
              [-0.73 + led * 0.082, 0.055, 0.783],
              led === 0 ? cyan : mutedBlue,
              0.005,
            );
          }
          addLabel(tray, name, [-0.32, -0.049, 0.783], 0.84);
          // Sparse rails on the top surface catch the studio light.
          for (let rail = 0; rail < 3; rail += 1) {
            addBox(
              tray,
              [0.93, 0.015, 0.012],
              [0, 0.216, -0.3 + rail * 0.12],
              faceMetal,
              0.003,
            );
          }
        });
        const cloudLabel = addLabel(
          server,
          "CLOUD / 01",
          [0, 2.15, 0.1],
          1.1,
          "#b1d9ff",
        );
        if (cloudLabel) cloudLabel.rotation.x = -Math.PI / 2;

        const database = new THREE.Group();
        database.position.set(1.55, 0.03, 0.63);
        infrastructure.add(database);
        addBox(database, [1.36, 0.14, 1.35], [0, 0.035, 0], faceMetal, 0.1);
        for (let layer = 0; layer < 3; layer += 1) {
          const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(0.53, 0.53, 0.32, 64),
            metal,
          );
          cylinder.position.y = 0.31 + layer * 0.36;
          database.add(cylinder);
          const seam = new THREE.Mesh(
            new THREE.CylinderGeometry(0.536, 0.536, 0.022, 64),
            layer === 2 ? cyan : blue,
          );
          seam.position.y = 0.17 + layer * 0.36;
          database.add(seam);
          const rim = new THREE.Mesh(
            new THREE.TorusGeometry(0.516, 0.013, 8, 64),
            topMetal,
          );
          rim.rotation.x = Math.PI / 2;
          rim.position.y = 0.47 + layer * 0.36;
          database.add(rim);
        }
        const disk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.455, 0.455, 0.018, 64),
          topMetal,
        );
        disk.position.y = 1.2;
        database.add(disk);
        const databaseIcon = new THREE.Mesh(
          new THREE.TorusGeometry(0.17, 0.018, 8, 40),
          blue,
        );
        databaseIcon.rotation.x = Math.PI / 2;
        databaseIcon.position.y = 1.215;
        database.add(databaseIcon);

        const deployment = new THREE.Group();
        deployment.position.set(-1.49, 0.03, 0.97);
        infrastructure.add(deployment);
        addBox(deployment, [1.08, 0.13, 1.02], [0, 0.035, 0], faceMetal, 0.08);
        addBox(deployment, [0.9, 0.032, 0.85], [0, 0.13, 0], blue, 0.014);
        addBox(deployment, [0.89, 0.72, 0.84], [0, 0.52, 0], metal, 0.08);
        addBox(deployment, [0.75, 0.02, 0.7], [0, 0.89, 0], topMetal, 0.009);
        addBox(
          deployment,
          [0.13, 0.022, 0.71],
          [0, 0.905, 0],
          mutedBlue,
          0.008,
        );
        addBox(
          deployment,
          [0.13, 0.42, 0.022],
          [0, 0.67, 0.424],
          mutedBlue,
          0.008,
        );
        addLabel(deployment, "DEPLOY", [-0.03, 0.39, 0.437], 0.6, "#b1d9ff");
        addBox(
          deployment,
          [0.13, 0.025, 0.018],
          [-0.25, 0.27, 0.435],
          cyan,
          0.005,
        );

        const packets = [];
        const connect = (points, offset) => {
          const curve = new THREE.CatmullRomCurve3(
            points.map((point) => new THREE.Vector3(...point)),
            false,
            "centripetal",
          );
          const line = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 48, 0.016, 6, false),
            blue,
          );
          infrastructure.add(line);
          const halo = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 48, 0.052, 6, false),
            new THREE.MeshBasicMaterial({
              color: 0x3385ff,
              transparent: true,
              opacity: 0.11,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          );
          infrastructure.add(halo);
          for (let packet = 0; packet < 2; packet += 1) {
            const mesh = new THREE.Mesh(
              new THREE.SphereGeometry(0.043, 10, 8),
              cyan,
            );
            infrastructure.add(mesh);
            const progress = (offset + packet * 0.5) % 1;
            mesh.position.copy(curve.getPointAt(progress));
            packets.push({ mesh, curve, offset: progress });
          }
        };
        connect(
          [
            [-0.22, 0.035, 0.14],
            [-0.22, 0.035, 0.57],
            [-0.1, 0.035, 0.72],
            [0.25, 0.035, 0.73],
            [0.84, 0.035, 0.73],
          ],
          0.1,
        );
        connect(
          [
            [-0.45, 0.04, 0.14],
            [-0.45, 0.04, 0.93],
            [-0.61, 0.04, 1.12],
            [-0.94, 0.04, 1.12],
          ],
          0.38,
        );
        connect(
          [
            [1.55, 0.03, 1.35],
            [1.55, 0.03, 1.56],
            [1.35, 0.03, 1.67],
            [0.1, 0.03, 1.67],
            [-0.11, 0.03, 1.55],
            [-0.11, 0.03, 1.34],
          ],
          0.65,
        );
        addBox(
          infrastructure,
          [0.43, 0.13, 0.3],
          [-0.11, 0.04, 1.18],
          topMetal,
          0.04,
        );
        addBox(
          infrastructure,
          [0.16, 0.012, 0.045],
          [-0.11, 0.112, 1.18],
          cyan,
          0.003,
        );

        const motionQuery = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        let reducedMotion = motionQuery.matches;
        let isPaused = pausedRef.current;
        let isVisible = true;
        let pageVisible = !document.hidden;
        let elapsed = 0;
        let previousTime = 0;
        let dragging = false;
        let previousPointer = { x: 0, y: 0 };
        const drag = { x: 0, y: 0 };
        const pointer = { x: 0, y: 0 };
        const smoothed = { x: 0, y: 0 };

        const canAnimate = () =>
          !disposed && !isPaused && !reducedMotion && isVisible && pageVisible;
        const render = () => {
          if (!disposed) renderer.render(scene, camera);
        };
        const pose = () => {
          // Keep the architecture readable: a slow, small sway instead of a full spin.
          infrastructure.rotation.set(
            smoothed.y + drag.y,
            Math.sin(elapsed * 0.17) * 0.065 + smoothed.x + drag.x,
            0,
          );
          serverLayers.forEach((layer, index) => {
            layer.position.y =
              0.24 +
              index * 0.56 +
              Math.sin(elapsed * 0.75 + index * 0.4) * 0.018;
          });
          packets.forEach(({ mesh, curve, offset }) => {
            mesh.position.copy(curve.getPointAt((elapsed * 0.15 + offset) % 1));
          });
        };
        const animate = (time) => {
          const delta = previousTime
            ? Math.min((time - previousTime) / 1000, 0.04)
            : 0;
          previousTime = time;
          elapsed += delta;
          const easing = 1 - Math.exp(-delta * 4);
          smoothed.x += (pointer.x - smoothed.x) * easing;
          smoothed.y += (pointer.y - smoothed.y) * easing;
          pose();
          render();
        };
        const syncAnimation = () => {
          previousTime = 0;
          renderer.setAnimationLoop(canAnimate() ? animate : null);
          if (isVisible && pageVisible) render();
        };

        controllerRef.current = {
          setPaused(value) {
            isPaused = value;
            syncAnimation();
          },
        };

        const resize = () => {
          if (disposed) return;
          const { width, height } = mount.getBoundingClientRect();
          if (!width || !height) return;
          const aspect = width / height;
          const halfHeight = Math.max(3.15, 3.35 / aspect);
          camera.left = -halfHeight * aspect;
          camera.right = halfHeight * aspect;
          camera.top = halfHeight;
          camera.bottom = -halfHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          render();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);
        if ("IntersectionObserver" in window) {
          visibilityObserver = new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              syncAnimation();
            },
            { threshold: 0.03 },
          );
          visibilityObserver.observe(mount);
        }

        listen(document, "visibilitychange", () => {
          pageVisible = !document.hidden;
          syncAnimation();
        });
        listen(motionQuery, "change", (event) => {
          reducedMotion = event.matches;
          syncAnimation();
        });
        listen(renderer.domElement, "pointermove", (event) => {
          if (dragging) {
            drag.x += (event.clientX - previousPointer.x) * 0.005;
            drag.y = Math.max(
              -0.25,
              Math.min(
                0.25,
                drag.y + (event.clientY - previousPointer.y) * 0.003,
              ),
            );
            previousPointer = { x: event.clientX, y: event.clientY };
            if (!canAnimate()) {
              pose();
              render();
            }
          } else if (canAnimate() && event.pointerType !== "touch") {
            const bounds = mount.getBoundingClientRect();
            pointer.x =
              ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.16;
            pointer.y =
              ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.08;
          }
        });
        listen(renderer.domElement, "pointerdown", (event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          dragging = true;
          previousPointer = { x: event.clientX, y: event.clientY };
          renderer.domElement.setPointerCapture(event.pointerId);
          renderer.domElement.style.cursor = "grabbing";
        });
        const endDrag = () => {
          dragging = false;
          renderer.domElement.style.cursor = "grab";
        };
        listen(renderer.domElement, "pointerup", endDrag);
        listen(renderer.domElement, "pointercancel", endDrag);
        listen(renderer.domElement, "lostpointercapture", endDrag);
        listen(renderer.domElement, "pointerleave", () => {
          pointer.x = 0;
          pointer.y = 0;
        });
        listen(renderer.domElement, "keydown", (event) => {
          if (
            !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
              event.key,
            )
          )
            return;
          event.preventDefault();
          if (event.key === "ArrowLeft") drag.x -= 0.15;
          if (event.key === "ArrowRight") drag.x += 0.15;
          if (event.key === "ArrowUp") drag.y = Math.max(-0.25, drag.y - 0.1);
          if (event.key === "ArrowDown") drag.y = Math.min(0.25, drag.y + 0.1);
          pose();
          render();
        });
        listen(renderer.domElement, "webglcontextlost", (event) => {
          event.preventDefault();
          isPaused = true;
          renderer.setAnimationLoop(null);
          renderer.domElement.style.opacity = "0";
          setReady(false);
        });

        resize();
        syncAnimation();
        setReady(true);
        readyCallbackRef.current?.();
      } catch (error) {
        // Static infrastructure remains visible on devices without WebGL support.
        if (!disposed) {
          renderer?.setAnimationLoop(null);
          if (renderer) renderer.domElement.style.opacity = "0";
          setReady(false);
          console.info(
            "The portfolio is using its static infrastructure fallback.",
            error.message,
          );
        }
      }
    };

    start();
    return () => {
      disposed = true;
      controllerRef.current = null;
      renderer?.setAnimationLoop(null);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      removeListeners.forEach((remove) => remove());
      scene?.traverse((object) => {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => {
          material?.map?.dispose();
          material?.dispose();
        });
      });
      environment?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div
      className="sculpture-studio"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "12%",
          right: "12%",
          bottom: "12%",
          height: "34%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(30, 86, 205, .22), transparent 68%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />
      {!ready && (
        <svg
          viewBox="0 0 500 500"
          role="img"
          aria-label="Connected application servers, database, and deployment node"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <linearGradient
              id={`${fallbackId}-metal`}
              x1="0"
              x2="1"
              y1="0"
              y2="1"
            >
              <stop offset="0" stopColor="#29466d" />
              <stop offset="0.42" stopColor="#172d4a" />
              <stop offset="1" stopColor="#0b172b" />
            </linearGradient>
            <filter
              id={`${fallbackId}-shadow`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="5"
                dy="12"
                stdDeviation="8"
                floodColor="#147aff"
                floodOpacity="0.18"
              />
            </filter>
          </defs>
          <g filter={`url(#${fallbackId}-shadow)`} strokeLinejoin="round">
            <path
              d="M40 321 250 221 464 323 252 430Z"
              fill="#101d32"
              stroke="#25416b"
            />
            <path
              d="M40 321v12l212 110 212-109v-11L252 430Z"
              fill="#0a1425"
              stroke="#192d4a"
            />
            <path
              d="M251 296v53l89 43M251 349l-98 26"
              fill="none"
              stroke="#3d8dff"
              strokeWidth="3"
            />
            {[0, 1, 2, 3].map((layer) => (
              <g key={layer} transform={`translate(0 ${-layer * 43})`}>
                <path
                  d="M169 283 246 243 334 284 253 325Z"
                  fill="#284263"
                  stroke="#36547b"
                />
                <path
                  d="M169 283v31l84 43v-32Z"
                  fill="#142943"
                  stroke="#213c5e"
                />
                <path
                  d="M253 325v32l81-42v-31Z"
                  fill="#0b1a30"
                  stroke="#213c5e"
                />
                <path
                  d="m170 308 83 43 80-42"
                  fill="none"
                  stroke="#458fff"
                  strokeWidth="2"
                />
                <path
                  d="m185 302 6 3m4 2 6 3"
                  stroke="#83eaff"
                  strokeWidth="3"
                />
                <path
                  d="m279 320 30-15m-30 20 30-15"
                  stroke="#385576"
                  strokeWidth="2"
                />
              </g>
            ))}
            <g transform="translate(363 302)">
              {[0, 1, 2].map((layer) => (
                <g key={layer} transform={`translate(0 ${-layer * 23})`}>
                  <path
                    d="M-38 0v24c0 22 76 22 76 0V0Z"
                    fill={`url(#${fallbackId}-metal)`}
                    stroke="#2b4d75"
                  />
                  <ellipse rx="38" ry="16" fill="#223c5d" stroke="#41658e" />
                  <path
                    d="M-38 23c0 21 76 21 76 0"
                    fill="none"
                    stroke="#4999ff"
                    strokeWidth="2"
                  />
                </g>
              ))}
              <ellipse cy="-46" rx="15" ry="6" fill="none" stroke="#71d1ff" />
            </g>
            <g>
              <path
                d="M99 321 138 302 179 321 139 342Z"
                fill="#2a496d"
                stroke="#3c5d86"
              />
              <path d="M99 321v45l40 22v-46Z" fill="#152d4a" stroke="#284a72" />
              <path
                d="M139 342v46l40-23v-44Z"
                fill="#0e2039"
                stroke="#284a72"
              />
              <path
                d="m100 362 39 21 39-22"
                stroke="#4b9bff"
                fill="none"
                strokeWidth="2"
              />
              <path
                d="m116 313 41 21v19"
                stroke="#4280bc"
                fill="none"
                strokeWidth="7"
              />
              <path d="m109 347 9 5" stroke="#83eaff" strokeWidth="3" />
            </g>
            <circle cx="251" cy="347" r="4" fill="#96eeff" />
            <circle cx="315" cy="380" r="3" fill="#96eeff" />
          </g>
        </svg>
      )}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
