import * as THREE from "three";

export function safeDisposeObject(obj: THREE.Object3D | null | undefined): void {
  if (!obj) return;

  obj.traverse((child) => {
    // Dispose geometry
    if ("geometry" in child && child.geometry instanceof THREE.BufferGeometry) {
      child.geometry.dispose();
    }

    // Dispose material(s)
    if ("material" in child && child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((mat) => {
        if (!mat) return;
        // Dispose material textures
        Object.keys(mat).forEach((key) => {
          const prop = (mat as unknown as Record<string, unknown>)[key];
          if (prop && typeof prop === "object" && "dispose" in prop && typeof (prop as { dispose: unknown }).dispose === "function") {
            (prop as { dispose: () => void }).dispose();
          }
        });
        mat.dispose();
      });
    }
  });

  if (obj.parent) {
    obj.parent.remove(obj);
  }
}

export function safeDisposeRenderTarget(target: THREE.WebGLRenderTarget | null | undefined): void {
  if (!target) return;
  if (target.texture) target.texture.dispose();
  target.dispose();
}
