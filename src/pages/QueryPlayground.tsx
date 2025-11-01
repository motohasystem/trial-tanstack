import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { PlaygroundSection } from '../components/PlaygroundSection';

// モックAPIデータ
interface Post {
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// モックAPI関数
const fetchPosts = async (): Promise<Post[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, title: '最初の投稿', body: 'これは最初の投稿です' },
    { id: 2, title: '2番目の投稿', body: 'これは2番目の投稿です' },
    { id: 3, title: '3番目の投稿', body: 'これは3番目の投稿です' },
  ];
};

const fetchUserById = async (userId: number): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    id: userId,
    name: `ユーザー ${userId}`,
    email: `user${userId}@example.com`
  };
};

const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const posts = Array.from({ length: 5 }, (_, i) => ({
    id: pageParam * 5 + i + 1,
    title: `投稿 ${pageParam * 5 + i + 1}`,
    body: `これは投稿 ${pageParam * 5 + i + 1} の内容です`
  }));
  return {
    posts,
    nextPage: pageParam + 1,
    hasMore: pageParam < 3
  };
};

const createPost = async (newPost: { title: string; body: string }): Promise<Post> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: Math.floor(Math.random() * 10000),
    ...newPost
  };
};

export function QueryPlayground() {
  const [userId, setUserId] = useState(1);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        React Query Playground 🔄
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        React Queryは、サーバー状態管理を簡単にするライブラリです。
        データのフェッチング、キャッシング、同期、更新を宣言的に行えます。
      </p>

      <BasicQueryExample />
      <DependentQueryExample userId={userId} setUserId={setUserId} />
      <MutationExample
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostBody={newPostBody}
        setNewPostBody={setNewPostBody}
      />
      <InfiniteQueryExample />
    </div>
  );
}

// 基本的なクエリ
function BasicQueryExample() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const code = `const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});`;

  return (
    <PlaygroundSection
      title="1. 基本的なクエリ (Basic Query)"
      description="useQueryは最も基本的なフック。データをフェッチし、自動的にキャッシュします。"
      code={code}
    >
      <div>
        <button
          onClick={() => refetch()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          再フェッチ
        </button>

        {isLoading && <p>読み込み中...</p>}
        {isError && <p style={{ color: 'red' }}>エラー: {error.message}</p>}
        {data && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.map(post => (
              <li key={post.id} style={{
                padding: '1rem',
                marginBottom: '0.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '0.25rem'
              }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ color: '#666' }}>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PlaygroundSection>
  );
}

// 依存クエリ
function DependentQueryExample({ userId, setUserId }: { userId: number; setUserId: (id: number) => void }) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
  });

  const code = `const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUserById(userId),
});`;

  return (
    <PlaygroundSection
      title="2. 依存クエリ (Dependent Query)"
      description="パラメータが変更されると自動的に再フェッチされます。queryKeyに依存値を含めることで実現できます。"
      code={code}
    >
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>ユーザーID:</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            min="1"
            max="10"
            style={{
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc'
            }}
          />
          {isFetching && <span style={{ marginLeft: '1rem', color: '#00d8ff' }}>更新中...</span>}
        </div>

        {isLoading && <p>読み込み中...</p>}
        {data && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '0.25rem'
          }}>
            <p><strong>名前:</strong> {data.name}</p>
            <p><strong>メール:</strong> {data.email}</p>
          </div>
        )}
      </div>
    </PlaygroundSection>
  );
}

// ミューテーション
function MutationExample({
  newPostTitle,
  setNewPostTitle,
  newPostBody,
  setNewPostBody
}: {
  newPostTitle: string;
  setNewPostTitle: (title: string) => void;
  newPostBody: string;
  setNewPostBody: (body: string) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewPostTitle('');
      setNewPostBody('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title: newPostTitle, body: newPostBody });
  };

  const code = `const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});

mutation.mutate({ title, body });`;

  return (
    <PlaygroundSection
      title="3. ミューテーション (Mutations)"
      description="useMutationはデータの作成、更新、削除に使用します。成功後にキャッシュを無効化して再フェッチできます。"
      code={code}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="タイトル"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
              marginBottom: '0.5rem'
            }}
          />
          <textarea
            placeholder="本文"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
              minHeight: '100px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: mutation.isPending ? '#ccc' : '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer'
          }}
        >
          {mutation.isPending ? '送信中...' : '投稿を作成'}
        </button>

        {mutation.isError && (
          <p style={{ color: 'red', marginTop: '0.5rem' }}>
            エラーが発生しました
          </p>
        )}
        {mutation.isSuccess && (
          <p style={{ color: 'green', marginTop: '0.5rem' }}>
            投稿が作成されました!
          </p>
        )}
      </form>
    </PlaygroundSection>
  );
}

// 無限クエリ
function InfiniteQueryExample() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: fetchInfinitePosts,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0,
  });

  const code = `const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['infinite-posts'],
  queryFn: fetchInfinitePosts,
  getNextPageParam: (lastPage) =>
    lastPage.hasMore ? lastPage.nextPage : undefined,
  initialPageParam: 0,
});`;

  return (
    <PlaygroundSection
      title="4. 無限クエリ (Infinite Queries)"
      description="useInfiniteQueryは無限スクロールやページネーションに最適です。ページを追加で読み込むことができます。"
      code={code}
    >
      <div>
        {isLoading && <p>読み込み中...</p>}
        {data && (
          <>
            <div style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '1rem' }}>
              {data.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                  {page.posts.map(post => (
                    <div key={post.id} style={{
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '0.25rem'
                    }}>
                      <h4 style={{ fontWeight: 'bold' }}>{post.title}</h4>
                      <p style={{ color: '#666', fontSize: '0.875rem' }}>{post.body}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: !hasNextPage || isFetchingNextPage ? '#ccc' : '#00d8ff',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: !hasNextPage || isFetchingNextPage ? 'not-allowed' : 'pointer'
              }}
            >
              {isFetchingNextPage
                ? '読み込み中...'
                : hasNextPage
                ? 'さらに読み込む'
                : 'すべて読み込み済み'}
            </button>
          </>
        )}
      </div>
    </PlaygroundSection>
  );
}
