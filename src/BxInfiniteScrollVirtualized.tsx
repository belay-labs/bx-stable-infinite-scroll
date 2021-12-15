import React, {
  ReactNode,
  RefObject,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { useVirtual } from "react-virtual";

import useScroll from "./useScroll";

interface Props {
  loadingComponent: ReactNode;
  nextDataFn: () => void;
  nextEnd: boolean;
  nextLoading: boolean;
  previousDataFn: () => void;
  previousEnd: boolean;
  previousLoading: boolean;
  renderRow: (row: any) => ReactNode;
  rows: Array<any>;
}

const BxInfiniteScrollVirtualized = ({
  loadingComponent,
  nextDataFn,
  nextEnd,
  nextLoading,
  previousDataFn,
  previousEnd,
  previousLoading,
  renderRow,
  rows,
}: Props) => {
  const [scrolledToBottom, scrolledToTop, containerRef] = useScroll();
  const container = (containerRef as RefObject<HTMLDivElement>).current;

  const anchorData = useRef<{ prevHeight: number; rowLength: number }>();
  const isPrependRef = useRef(false);
  const prevLoadingRef = useRef<HTMLDivElement>(null);
  const nextLoadingRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef: containerRef as RefObject<HTMLDivElement>,
  });

  useEffect(() => {
    if (!container) return;

    if (scrolledToTop && !previousLoading && !previousEnd) {
      previousDataFn();
      isPrependRef.current = true;
    }
  }, [scrolledToTop]);

  useEffect(() => {
    if (!container) return;

    if (scrolledToBottom && !nextLoading && !nextEnd) {
      nextDataFn();
    }
  }, [scrolledToBottom]);

  useLayoutEffect(() => {
    if (!container) return;

    const height = rowVirtualizer.totalSize;
    if (
      anchorData.current &&
      anchorData.current.rowLength !== rows.length &&
      isPrependRef.current
    ) {
      const loadingHeights =
        (prevLoadingRef.current?.clientHeight || 0) +
        (nextLoadingRef.current?.clientHeight || 0);
      container.scrollTop =
        container.scrollTop +
        (height - anchorData.current.prevHeight - loadingHeights);
      isPrependRef.current = false;
    }

    anchorData.current = { prevHeight: height, rowLength: rows.length };
  }, [rowVirtualizer.totalSize]);

  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      style={{
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {previousLoading && <div ref={prevLoadingRef}>{loadingComponent}</div>}
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={rows[virtualRow.index].id || virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div ref={virtualRow.measureRef}>
              {renderRow(rows[virtualRow.index])}
            </div>
          </div>
        ))}
      </div>
      {nextLoading && <div ref={nextLoadingRef}>{loadingComponent}</div>}
    </div>
  );
};

BxInfiniteScrollVirtualized.displayName = "BxInfiniteScrollVirtualized";

export default BxInfiniteScrollVirtualized;
