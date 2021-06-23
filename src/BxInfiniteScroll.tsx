import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import useScroll from "./useScroll";

interface Props {
  children: ReactNode;
  height: string;
  initialReverse?: boolean;
  loadingComponent: ReactNode;

  nextDataFn: () => void;
  nextEnd: boolean;
  nextLoading: boolean;
  previousDataFn: () => void;
  previousEnd: boolean;
  previousLoading: boolean;
}

const BxInfiniteScroll = forwardRef<ReactNode, Props>(
  (
    {
      children,
      height,
      initialReverse = true,
      loadingComponent,

      nextDataFn,
      nextEnd,
      nextLoading,
      previousDataFn,
      previousEnd,
      previousLoading,
    }: Props,
    ref,
  ) => {
    useImperativeHandle(ref, () => {
      return {
        setReverseCol,
      };
    });

    const [reverseCol, setReverseCol] = useState(initialReverse);
    const [reverseColValue, setReverseColValue] = useState<number | null>(null);
    const [scrolledToBottom, scrolledToTop, containerRef] = useScroll(
      reverseCol,
    );
    const container = (containerRef as RefObject<HTMLDivElement>).current;

    // This is called next render - next flex-col or flex-col-reverse is set
    useEffect(() => {
      if (reverseColValue !== null) {
        container?.scrollTo({ top: reverseColValue });
      }
    }, [reverseColValue]);

    useEffect(() => {
      if (!container) return;

      if (scrolledToTop && !previousLoading && !previousEnd && !nextLoading) {
        if (!reverseCol) {
          const scrollTo =
            container.scrollTop -
            container.scrollHeight -
            container.clientHeight;
          setReverseCol(true);
          setReverseColValue(scrollTo);
        }

        previousDataFn();
      }
    }, [scrolledToTop, reverseCol]);

    useEffect(() => {
      if (!container) return;

      if (scrolledToBottom && !nextLoading && !nextEnd && !previousLoading) {
        if (reverseCol) {
          const scrollTo =
            container.scrollTop +
            container.scrollHeight -
            container.clientHeight;
          setReverseCol(false);
          setReverseColValue(scrollTo);
        }

        nextDataFn();
      }
    }, [scrolledToBottom, reverseCol]);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: reverseCol ? "column-reverse" : "column",
          height,
          overflowY: "scroll",
        }}
        ref={containerRef as RefObject<HTMLDivElement>}
      >
        <div>
          {previousLoading && loadingComponent}
          {children}
          {nextLoading && loadingComponent}
        </div>
      </div>
    );
  },
);

BxInfiniteScroll.displayName = "BxInfiniteScroll";

export default BxInfiniteScroll;
