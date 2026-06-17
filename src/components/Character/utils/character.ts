import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Elegant feminine outfit
                if (mesh.name === "BODYSHIRT") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#6b4a7d"); // Soft plum top
                    mat.roughness = 0.45;
                    mat.metalness = 0.2;
                  }
                } else if (mesh.name === "Pant") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#1a1520"); // Dark plum pants
                    mat.roughness = 0.65;
                    mat.metalness = 0.08;
                  }
                } else if (mesh.name === "Shoe") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#2a1a2e"); // Deep mauve shoes
                    mat.roughness = 0.3;
                    mat.metalness = 0.18;
                  }
                } else if (mesh.name === "Sole") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#e8637a"); // Coral-pink sole accent
                    mat.roughness = 0.5;
                    mat.metalness = 0.1;
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
