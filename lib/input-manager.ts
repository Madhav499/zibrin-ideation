"use client";

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  normalizedX: number;
  normalizedY: number;
  velocityX: number;
  velocityY: number;
  isDown: boolean;
}

interface ScrollState {
  y: number;
  progress: number;
  velocity: number;
  direction: number;
}

class InputManager {
  public mouse: MouseState = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
    isDown: false,
  };

  public scroll: ScrollState = {
    y: 0,
    progress: 0,
    velocity: 0,
    direction: 1,
  };

  private listenersAttached: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  public init() {
    if (this.listenersAttached) return;
    this.listenersAttached = true;

    window.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", this.handlePointerDown, { passive: true });
    window.addEventListener("pointerup", this.handlePointerUp, { passive: true });
  }

  private handlePointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;

    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
    this.mouse.normalizedX = (e.clientX / w) * 2 - 1;
    this.mouse.normalizedY = -(e.clientY / h) * 2 + 1;
  };

  private handlePointerDown = () => {
    this.mouse.isDown = true;
  };

  private handlePointerUp = () => {
    this.mouse.isDown = false;
  };

  public updateScroll(y: number, progress: number, velocity: number, direction: number) {
    this.scroll.y = y;
    this.scroll.progress = progress;
    this.scroll.velocity = velocity;
    this.scroll.direction = direction;
  }

  public updateMouseLerp(lerpFactor = 0.16) {
    const prevX = this.mouse.x;
    const prevY = this.mouse.y;

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * lerpFactor;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * lerpFactor;

    this.mouse.velocityX = this.mouse.x - prevX;
    this.mouse.velocityY = this.mouse.y - prevY;
  }

  public destroy() {
    if (!this.listenersAttached) return;
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerdown", this.handlePointerDown);
    window.removeEventListener("pointerup", this.handlePointerUp);
    this.listenersAttached = false;
  }
}

export const inputManager = new InputManager();
