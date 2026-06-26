import { useState, useRef, useEffect } from "react";

type CollapsibleProps = {
  label: string;
  children: React.ReactNode;
  className?:string;
};

export default function Collapsible(props: CollapsibleProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (open) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, props.children]);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`collapsible ${open ? "open" : ""} ${props.className || ""}`}>
      <button className="toggleBtn" onClick={toggle}>
        {props.label}
      </button>

      <div
        className="content-parent"
        ref={contentRef}
        style={{ height: `${height}px` }}
      >
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
