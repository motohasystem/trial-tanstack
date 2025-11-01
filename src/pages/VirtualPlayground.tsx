import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PlaygroundSection } from '../components/PlaygroundSection';

export function VirtualPlayground() {
  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        React Virtual Playground 📜
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        React Virtualは、大量のデータを効率的にレンダリングするための仮想化ライブラリです。
        スクロール可能な領域で、表示されている要素のみをDOMにレンダリングすることでパフォーマンスを向上させます。
      </p>

      <BasicVirtualList />
      <DynamicSizeList />
      <HorizontalVirtualList />
      <VirtualGrid />
    </div>
  );
}

// 基本的な仮想リスト
function BasicVirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  const code = `const parentRef = useRef<HTMLDivElement>(null);

const virtualizer = useVirtualizer({
  count: 10000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});

// レンダリング
virtualizer.getVirtualItems().map(virtualItem => (
  <div key={virtualItem.key}
       style={{ height: virtualItem.size }}>
    Row {virtualItem.index}
  </div>
))`;

  return (
    <PlaygroundSection
      title="1. 基本的な仮想リスト (Basic Virtual List)"
      description="10,000個の要素を持つリストですが、表示されている部分のみをレンダリングします。"
      code={code}
    >
      <div
        ref={parentRef}
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                padding: '1rem',
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: virtualItem.index % 2 === 0 ? 'white' : '#f9f9f9'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>行 {virtualItem.index}</div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>
                これは {virtualItem.index} 番目の項目です
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        スクロールして、パフォーマンスの良さを体感してください！
      </p>
    </PlaygroundSection>
  );
}

// 動的なサイズのリスト
function DynamicSizeList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    content: `項目 ${i}`,
    description: i % 5 === 0
      ? 'これは長い説明文を持つ項目です。仮想化により、異なる高さの要素も効率的にレンダリングできます。React Virtualは各要素の高さを自動的に測定し、スクロール位置を正確に計算します。'
      : `これは項目 ${i} の短い説明です。`,
  }));

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  const code = `const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80, // 初期推定値
  overscan: 5, // 余分にレンダリングする要素数
});`;

  return (
    <PlaygroundSection
      title="2. 動的サイズのリスト (Dynamic Size List)"
      description="要素の高さが異なる場合でも、自動的にサイズを測定して適切にレンダリングします。"
      code={code}
    >
      <div
        ref={parentRef}
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                  padding: '1rem',
                  borderBottom: '1px solid #e0e0e0',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {item.content}
                </div>
                <div style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PlaygroundSection>
  );
}

// 水平方向の仮想リスト
function HorizontalVirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    horizontal: true,
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
  });

  const code = `const virtualizer = useVirtualizer({
  horizontal: true, // 水平スクロール
  count: 1000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 200,
});`;

  return (
    <PlaygroundSection
      title="3. 水平方向の仮想リスト (Horizontal Virtual List)"
      description="縦方向だけでなく、横方向のスクロールも仮想化できます。"
      code={code}
    >
      <div
        ref={parentRef}
        style={{
          width: '100%',
          height: '250px',
          overflowX: 'auto',
          overflowY: 'hidden',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      >
        <div
          style={{
            width: `${virtualizer.getTotalSize()}px`,
            height: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${virtualItem.size}px`,
                transform: `translateX(${virtualItem.start}px)`,
                padding: '1rem',
                borderRight: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: virtualItem.index % 2 === 0 ? '#e3f2fd' : '#f3e5f5'
              }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {virtualItem.index}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>
                カード {virtualItem.index}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PlaygroundSection>
  );
}

// 仮想グリッド
function VirtualGrid() {
  const parentRef = useRef<HTMLDivElement>(null);

  const columnCount = 5;
  const rowCount = 1000;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
  });

  const code = `const rowVirtualizer = useVirtualizer({
  count: rowCount,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 120,
});

const columnVirtualizer = useVirtualizer({
  horizontal: true,
  count: columnCount,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 150,
});`;

  return (
    <PlaygroundSection
      title="4. 仮想グリッド (Virtual Grid)"
      description="行と列の両方を仮想化することで、大量のグリッドデータを効率的に表示できます。"
      code={code}
    >
      <div
        ref={parentRef}
        style={{
          height: '400px',
          width: '100%',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div key={virtualRow.key}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${virtualColumn.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    padding: '1rem',
                    border: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (virtualRow.index + virtualColumn.index) % 2 === 0
                      ? 'white'
                      : '#f9f9f9'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      セル ({virtualRow.index}, {virtualColumn.index})
                    </div>
                    <div style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      行 {virtualRow.index} / 列 {virtualColumn.index}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </PlaygroundSection>
  );
}
