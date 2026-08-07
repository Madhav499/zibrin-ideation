"use client";

type TickCallback = (deltaTime: number, elapsedTime: number) => void;

class MasterTickEngine {
  private subscribers: Map<string, TickCallback> = new Map();
  private animId: number | null = null;
  private lastTime: number = 0;
  private startTime: number = 0;
  private isRunning: boolean = false;
  private isTabVisible: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.lastTime = performance.now();
      this.startTime = this.lastTime;
      document.addEventListener("visibilitychange", this.handleVisibilityChange);
    }
  }

  private handleVisibilityChange = () => {
    this.isTabVisible = !document.hidden;
    if (this.isTabVisible && this.subscribers.size > 0 && !this.isRunning) {
      this.start();
    }
  };

  public subscribe(id: string, callback: TickCallback): () => void {
    this.subscribers.set(id, callback);
    if (!this.isRunning && this.subscribers.size > 0) {
      this.start();
    }
    return () => this.unsubscribe(id);
  }

  public unsubscribe(id: string): void {
    this.subscribers.delete(id);
    if (this.subscribers.size === 0 && this.isRunning) {
      this.stop();
    }
  }

  private tick = (currentTime: number) => {
    if (!this.isRunning) return;

    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap delta to avoid giant leaps
    const elapsedTime = (currentTime - this.startTime) / 1000;
    this.lastTime = currentTime;

    if (this.isTabVisible) {
      this.subscribers.forEach((callback) => {
        try {
          callback(deltaTime, elapsedTime);
        } catch (err) {
          console.error("Error in tickEngine subscriber:", err);
        }
      });
    }

    this.animId = requestAnimationFrame(this.tick);
  };

  private start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animId = requestAnimationFrame(this.tick);
  }

  private stop() {
    this.isRunning = false;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }
}

export const tickEngine = new MasterTickEngine();
