"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create("cinematicTravel", "M0,0 C0.25,1 0.25,1 1,1");
  } catch (e) {
    // CustomEase fallback
  }
}

export type TransitionStage = "idle" | "exiting" | "entering";

interface TransitionContextType {
  isTransitioning: boolean;
  transitionStage: TransitionStage;
  transitionProgress: number; // 0 to 1
  currentPath: string;
  targetPath: string | null;
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionStage: "idle",
  transitionProgress: 0,
  currentPath: "/",
  targetPath: null,
  navigateTo: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [transitionStage, setTransitionStage] = useState<TransitionStage>("idle");
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(pathname);

  const isNavigatingRef = useRef(false);

  // Sync pathname changes
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const navigateTo = useCallback(
    (href: string) => {
      // Don't trigger if already navigating to the exact same path
      if (isNavigatingRef.current || href === pathname || (href === "/" && pathname === "/")) {
        return;
      }

      // Check if user prefers reduced motion
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      isNavigatingRef.current = true;
      setTargetPath(href);
      setTransitionStage("exiting");

      // GSAP Timeline for Outgoing Page Travel (1.4s–2.2s range: 0.9s exit, route switch, 0.9s entrance)
      const tl = gsap.timeline({
        onUpdate: () => {
          setTransitionProgress(tl.progress());
        },
        onComplete: () => {
          // Perform actual Next.js route change
          router.push(href);
          
          // Switch stage to entering
          setTransitionStage("entering");

          // Reset scroll smoothly to top
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
          }

          // Trigger entrance timeline
          const enterTl = gsap.timeline({
            onUpdate: () => {
              setTransitionProgress(1 - enterTl.progress());
            },
            onComplete: () => {
              setTransitionStage("idle");
              setTransitionProgress(0);
              setTargetPath(null);
              isNavigatingRef.current = false;
            },
          });

          enterTl.to({}, { duration: 0.95, ease: "cinematicTravel" });
        },
      });

      tl.to({}, { duration: 0.9, ease: "cinematicTravel" });
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning: transitionStage !== "idle",
        transitionStage,
        transitionProgress,
        currentPath,
        targetPath,
        navigateTo,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

/**
 * Reusable TransitionLink component that intercepts clicks for 3D Cinematic Navigation
 */
interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className, onClick, ...props }: TransitionLinkProps) {
  const { navigateTo } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Allow standard target="_blank", cmd/ctrl clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || props.target === "_blank") {
      return;
    }

    e.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
