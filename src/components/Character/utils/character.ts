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

                // Stylish modern streetwear outfit
                if (mesh.name === "BODYSHIRT") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#0d3b4f"); // Deep teal bomber jacket
                    mat.roughness = 0.4;
                    mat.metalness = 0.25; // Slight sheen like tech-fabric
                  }
                } else if (mesh.name === "Pant") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#1c1c22"); // Slim dark jogger pants
                    mat.roughness = 0.7;
                    mat.metalness = 0.08;
                  }
                } else if (mesh.name === "Shoe") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#111115"); // Premium black sneakers
                    mat.roughness = 0.35;
                    mat.metalness = 0.15; // Slightly glossy leather look
                  }
                } else if (mesh.name === "Sole") {
                  if (mesh.material && "color" in mesh.material) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.color.set("#e03e8a"); // Vibrant magenta sole pop
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
