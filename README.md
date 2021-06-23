# bx-stable-infinite-scroll

[Demo](https://cathykc.github.io/bx-stable-infinite-scroll/)

Stable bi-directional infinite scroll component. Load additional data from both ends of a container while maintaining current view. Used for chat, timeline, feed views.

## Documentation
### Installation
```
# yarn
yarn add react-window-infinite-loader

# npm
npm install --save react-window-infinite-loader
```

### Usage
| Prop | Type | Description |
| --- | --- | --- |
| `height` | `string` | Height of infinite scrolling container (e.g. "300px", "100vh"). |
| `loadingComponent` | `ReactNode` | What to display when fetching more data (e.g. `<div>Loading...</div>`). |
| `nextDataFn` | `() => void` | Function to fetch next rows. |
| `nextEnd` | `boolean` | No more next rows to fetch. |
| `nextLoading` | `boolean` | Fetching next rows. |
| `previousDataFn` | `() => void` | Function to fetch previous rows. |
| `previousEnd` | `boolean` | No more previous rows to fetch. |
| `previousLoading` | `boolean` | Fetching previous rows. |
| `initialReverse` | `?boolean` | Default `true` (loading data from top). Indicate whether data will initially be loaded from top or bottom of container. | 


```
import BxInfiniteScroll from "bx-stable-infinite-scroll";

export default function SomeComponent() {
  return (
    <>
      ...
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
    </>
  )
}
```