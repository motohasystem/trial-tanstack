import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { PlaygroundSection } from '../components/PlaygroundSection';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: Person[] = [
  { id: 1, firstName: '太郎', lastName: '山田', age: 28, email: 'taro@example.com', status: 'active' },
  { id: 2, firstName: '花子', lastName: '佐藤', age: 32, email: 'hanako@example.com', status: 'active' },
  { id: 3, firstName: '次郎', lastName: '鈴木', age: 24, email: 'jiro@example.com', status: 'inactive' },
  { id: 4, firstName: '美咲', lastName: '高橋', age: 29, email: 'misaki@example.com', status: 'active' },
  { id: 5, firstName: '健太', lastName: '田中', age: 35, email: 'kenta@example.com', status: 'active' },
  { id: 6, firstName: '由美', lastName: '伊藤', age: 27, email: 'yumi@example.com', status: 'inactive' },
  { id: 7, firstName: '大輔', lastName: '渡辺', age: 31, email: 'daisuke@example.com', status: 'active' },
  { id: 8, firstName: '真理子', lastName: '中村', age: 26, email: 'mariko@example.com', status: 'active' },
  { id: 9, firstName: '翔太', lastName: '小林', age: 33, email: 'shota@example.com', status: 'inactive' },
  { id: 10, firstName: '愛', lastName: '加藤', age: 30, email: 'ai@example.com', status: 'active' },
];

export function TablePlayground() {
  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        React Table Playground 📊
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        React Tableは、強力で柔軟なテーブル作成ライブラリです。
        ソート、フィルタリング、ページネーションなどの機能を簡単に実装できます。
      </p>

      <BasicTableExample />
      <SortingTableExample />
      <FilteringTableExample />
      <PaginationTableExample />
    </div>
  );
}

// 基本的なテーブル
function BasicTableExample() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: '名',
      },
      {
        accessorKey: 'lastName',
        header: '姓',
      },
      {
        accessorKey: 'age',
        header: '年齢',
      },
      {
        accessorKey: 'email',
        header: 'メールアドレス',
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockData.slice(0, 5),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const code = `const columns: ColumnDef<Person>[] = [
  { accessorKey: 'firstName', header: '名' },
  { accessorKey: 'lastName', header: '姓' },
  { accessorKey: 'age', header: '年齢' },
];

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});`;

  return (
    <PlaygroundSection
      title="1. 基本的なテーブル (Basic Table)"
      description="最もシンプルなテーブルの実装。データとカラム定義を渡すだけで動作します。"
      code={code}
    >
      <div style={{ overflow: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{
                    padding: '0.75rem',
                    textAlign: 'left',
                    backgroundColor: '#f5f5f5',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #e0e0e0'
                  }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '0.75rem' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlaygroundSection>
  );
}

// ソート機能付きテーブル
function SortingTableExample() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: '名',
      },
      {
        accessorKey: 'lastName',
        header: '姓',
      },
      {
        accessorKey: 'age',
        header: '年齢',
      },
      {
        accessorKey: 'status',
        header: 'ステータス',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <span style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              backgroundColor: status === 'active' ? '#e8f5e9' : '#ffebee',
              color: status === 'active' ? '#2e7d32' : '#c62828',
              fontSize: '0.875rem'
            }}>
              {status === 'active' ? 'アクティブ' : '非アクティブ'}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const code = `const [sorting, setSorting] = useState<SortingState>([]);

const table = useReactTable({
  data,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});`;

  return (
    <PlaygroundSection
      title="2. ソート機能 (Sorting)"
      description="カラムヘッダーをクリックすることで、昇順・降順のソートができます。"
      code={code}
    >
      <div style={{ overflow: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      backgroundColor: '#f5f5f5',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #e0e0e0',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '0.75rem' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlaygroundSection>
  );
}

// フィルタリング機能付きテーブル
function FilteringTableExample() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: '名',
      },
      {
        accessorKey: 'lastName',
        header: '姓',
      },
      {
        accessorKey: 'age',
        header: '年齢',
      },
      {
        accessorKey: 'email',
        header: 'メールアドレス',
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const code = `const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

const table = useReactTable({
  data,
  columns,
  state: { columnFilters },
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
});`;

  return (
    <PlaygroundSection
      title="3. フィルタリング (Filtering)"
      description="テーブルのデータを検索・フィルタリングできます。"
      code={code}
    >
      <div>
        <input
          type="text"
          placeholder="検索..."
          onChange={(e) => setColumnFilters([{ id: 'firstName', value: e.target.value }])}
          style={{
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
            width: '300px'
          }}
        />

        <div style={{ overflow: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      backgroundColor: '#f5f5f5',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #e0e0e0'
                    }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ padding: '0.75rem' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: '1rem', color: '#666' }}>
          {table.getRowModel().rows.length} 件中 {table.getFilteredRowModel().rows.length} 件を表示
        </p>
      </div>
    </PlaygroundSection>
  );
}

// ページネーション機能付きテーブル
function PaginationTableExample() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: '名',
      },
      {
        accessorKey: 'lastName',
        header: '姓',
      },
      {
        accessorKey: 'age',
        header: '年齢',
      },
      {
        accessorKey: 'email',
        header: 'メールアドレス',
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const code = `const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  initialState: {
    pagination: { pageSize: 5 },
  },
});`;

  return (
    <PlaygroundSection
      title="4. ページネーション (Pagination)"
      description="大量のデータを複数のページに分割して表示します。"
      code={code}
    >
      <div>
        <div style={{ overflow: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      backgroundColor: '#f5f5f5',
                      fontWeight: 'bold',
                      borderBottom: '2px solid #e0e0e0'
                    }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ padding: '0.75rem' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: table.getCanPreviousPage() ? '#00d8ff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed'
            }}
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: table.getCanPreviousPage() ? '#00d8ff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed'
            }}
          >
            {'<'}
          </button>
          <span style={{ padding: '0 1rem' }}>
            ページ {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: table.getCanNextPage() ? '#00d8ff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed'
            }}
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: table.getCanNextPage() ? '#00d8ff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed'
            }}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </PlaygroundSection>
  );
}
