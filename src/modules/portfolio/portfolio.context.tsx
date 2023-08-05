import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

interface IProps {
  children: React.ReactNode;
}

interface IPortfolioContext {
  root?: React.RefObject<HTMLDivElement>;
  mask?: React.RefObject<HTMLDivElement>;
  smoother?: any;
}

export const PortfolioContext = createContext<IPortfolioContext>({});

const Portfolio = ({ children }: IProps) => {
  const mask = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    if (!mask?.current || !root?.current) {
      return;
    }

    const ctx = gsap.context((self: any) => {
      const contents = gsap.utils.toArray<HTMLDivElement>(".content");

      const toggleCursor = (show?: boolean) => {
        if (show) {
          gsap.to(mask.current, {
            "--size": "300px",
            duration: 0.4,
            ease: "sine.out",
          });
        } else {
          gsap.to(mask.current, {
            "--size": "30px",
            duration: 0.4,
            ease: "sine.out",
          });
        }
      };

      if (contents) {
        for (let i = 0; i < contents.length; i++) {
          contents[i].addEventListener("mousemove", function () {
            toggleCursor(true);
          });

          contents[i].addEventListener("mouseleave", function () {
            toggleCursor(false);
          });
        }
      }

      let mouse_pos = { x: 0, y: 0, scrollY: 0, lastY: 0 };
      document.addEventListener("mousemove", (e: MouseEvent) => {
        const x = e.pageX;
        const y = e.pageY;

        gsap.to(mask.current, {
          "--x": `${x}px`,
          "--y": `${y}px`,
          duration: 0.3,
          ease: "sine.out",
        });

        mask.current?.setAttribute("data-y", String(y));

        mouse_pos.x = e.pageX;
        mouse_pos.y = e.pageY;
      });

      document.addEventListener("scroll", () => {
        let y: any = parseInt(mask.current?.getAttribute("data-y") || "0");

        const top = document.documentElement.scrollTop;
        let lastScrolledTop: any = parseInt(
          mask.current?.getAttribute("data-l") || "0"
        );

        if (lastScrolledTop != top) {
          y -= lastScrolledTop;
          lastScrolledTop = top;
          y += lastScrolledTop;
        }

        gsap.to(mask.current, {
          ease: "none",
          "--y": `${y}px`,
          duration: 0,
        });
        mask.current?.setAttribute("data-l", lastScrolledTop);
        mask.current?.setAttribute("data-y", y);

        let isHovered;

        const nodes = root.current?.querySelectorAll(".content") || [];
        for (let i = 0; i < nodes.length; i++) {
          const bounding_rect = nodes[i].getBoundingClientRect();

          if (
            mouse_pos.x > bounding_rect.left &&
            mouse_pos.x < bounding_rect.right &&
            y > bounding_rect.top + lastScrolledTop &&
            y < bounding_rect.bottom + lastScrolledTop
          ) {
            isHovered = true;
            break;
          } else {
            isHovered = false;
          }
        }

        toggleCursor(isHovered);
      });

      const headers = root.current?.querySelectorAll(".hidden-cursor");
      if (headers) {
        for (let i = 0; i < headers.length; i++) {
          headers[i].addEventListener("mousemove", function () {
            gsap.to(mask.current, {
              "--size": "0px",
              duration: 0.3,
              ease: "sine.out",
            });
          });
          headers[i].addEventListener("mouseout", function () {
            gsap.to(mask.current, {
              "--size": "30px",
              duration: 1,
              ease: "sine.out",
            });
          });
        }
      }

      const boxes = self.selector(".heading-content");
      boxes.forEach((box: any) => {
        gsap.from(box, {
          "--xPercent": "100%",
          scrollTrigger: {
            trigger: box,
            start: "bottom bottom",
            end: "top 0%",
            scrub: true,
          },
        });
      });

      const lenis = new Lenis({
        duration: 2,
      });

      lenis.on("scroll", ScrollTrigger.update);

      function raf(time: any) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }, root); // <- Scope!

    return () => ctx.revert(); // <- Cleanup!
  }, [root?.current, mask?.current, smoother]);

  return (
    <PortfolioContext.Provider value={{ mask, root, smoother }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () =>
  useContext<IPortfolioContext>(PortfolioContext);

export default Portfolio;
