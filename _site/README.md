# bx-stable-infinite-scroll

[Demo](https://cathykc.github.io/bx-stable-infinite-scroll/)

Stable bi-directional infinite scroll React component. Load additional data from both ends of a container while maintaining current view. Used for chat, timeline, feed views.

## Documentation
### Installation
```
npm install --save react-window-infinite-loader

# or

yarn add react-window-infinite-loader
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
| `children` | ReactNode | Rows to render |

#### Example
See [demo code](https://github.com/cathykc/bx-stable-infinite-scroll/blob/master/examples/src/App.tsx) for detailed usage example.

**🚨 Use unique keys for children**
Make sure the elements you're passing into `<BxInfiniteScroll>` have unique and consistent keys.

```
<BxInfiniteScroll {...props}>
  {map(rows, (row) => {
    return <div key={row.key}>{row.content}</div>
  })}
</BxInfiniteScroll>
```

![](recording.gif)