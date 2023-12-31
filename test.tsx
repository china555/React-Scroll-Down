import { ReactNode, useEffect, useRef, useState } from "react";

interface FadeScrollDownProps {
  children: ReactNode;
}
export const FadeScrollDown = ({ children }: FadeScrollDownProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && observerRef.current) {
        setIsOnScreen(true);
        observer.unobserve(observerRef.current);
      }
    });

    observerRef.current && observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={observerRef} className={isOnScreen ? " is-visible" : ""}>
      {children}
    </section>
  );
};
