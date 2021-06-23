import { concat, map } from "lodash";
import randomColor from "randomcolor";
import React, { useState } from "react";

import BxInfiniteScroll from "../../src";

export default function App() {
  const [items, setItems] = useState(map([1,2,3,4,5,7,8,9,10], (i) => {
    return { color: "#AAA", text: `Initial item ${i}`};
  }));
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);

  const handleNextDataLoad = () => {
    setLoadingNext(true);
    setTimeout(() => {
      const color = randomColor();
      const time = new Date().toLocaleTimeString();
      const loadedItems = map([1, 2, 3, 4, 5], (i) => {
        return { color, text: `Next ${i}: ${time}` };
      });
      setItems((prevItems) => concat(prevItems, loadedItems));

      setLoadingNext(false)
    }, 1000);
  }

  const handlePreviousDataLoad = () => {
    setLoadingPrevious(true);
    setTimeout(() => {
      const color = randomColor();
      const time = new Date().toLocaleTimeString();
      const loadedItems = map([1, 2, 3, 4, 5], (i) => {
        return { color, text: `Previous ${i}: ${time}` };
      });
      setItems((prevItems) => concat(loadedItems, prevItems));

      setLoadingPrevious(false)
    }, 1000);
  }

  return (
    <>
      <h4 style={{
        margin: "24px 0",
      }}>Scroll in both directions to load additional items 👆👇</h4>
      <div style={{
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      }}>
        <BxInfiniteScroll
          height="300px"
          loadingComponent={<div style={{ padding: "8px 16px" }}>Loading 5 more items...</div>}

          nextDataFn={handleNextDataLoad}
          nextEnd={false}
          nextLoading={loadingNext}

          previousDataFn={handlePreviousDataLoad}
          previousEnd={false}
          previousLoading={loadingPrevious}
        >
          {map(items, (item) => {
            return (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderBottom: "1px solid #DDD"
                }}
              >
                <div 
                  style={{
                    backgroundColor: item.color,
                    height: "16px",
                    width: "16px",
                    borderRadius: "4px",
                    marginRight: "4px",
                  }}
                />
                {item.text}
              </div>
            )
          })}
        </BxInfiniteScroll>
      </div>
    </>
  )
}