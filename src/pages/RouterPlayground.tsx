import { useState } from 'react';
import { PlaygroundSection } from '../components/PlaygroundSection';

export function RouterPlayground() {
  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        TanStack Router Playground 🛣️
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        TanStack Routerは、型安全で強力なルーティングライブラリです。
        ルートベースのコード分割、データローディング、検索パラメータの管理などを提供します。
      </p>

      <BasicRoutingExample />
      <RouteParamsExample />
      <SearchParamsExample />
      <NestedRoutesExample />
      <DataLoadingExample />
    </div>
  );
}

// 基本的なルーティング
function BasicRoutingExample() {
  const [currentRoute, setCurrentRoute] = useState('/');

  const routes = [
    { path: '/', label: 'ホーム' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const code = `import { createRootRoute, createRoute } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
]);`;

  return (
    <PlaygroundSection
      title="1. 基本的なルーティング (Basic Routing)"
      description="TanStack Routerでは、ルートを型安全に定義できます。"
      code={code}
    >
      <div>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => setCurrentRoute(route.path)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: currentRoute === route.path ? '#00d8ff' : '#f5f5f5',
                color: currentRoute === route.path ? 'white' : '#333',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: currentRoute === route.path ? 'bold' : 'normal'
              }}
            >
              {route.label}
            </button>
          ))}
        </div>

        <div style={{
          padding: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '0.5rem',
          minHeight: '150px'
        }}>
          <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
            現在のルート: <code style={{
              backgroundColor: '#e0e0e0',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem'
            }}>{currentRoute}</code>
          </div>

          {currentRoute === '/' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                ホームページ
              </h2>
              <p style={{ color: '#666' }}>
                TanStack Routerへようこそ！左のボタンで別のページに移動できます。
              </p>
            </div>
          )}

          {currentRoute === '/about' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                About
              </h2>
              <p style={{ color: '#666' }}>
                このページはTanStack Routerについての説明ページです。
              </p>
            </div>
          )}

          {currentRoute === '/contact' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Contact
              </h2>
              <p style={{ color: '#666' }}>
                お問い合わせページです。
              </p>
            </div>
          )}
        </div>
      </div>
    </PlaygroundSection>
  );
}

// ルートパラメータ
function RouteParamsExample() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users = [
    { id: 1, name: '山田太郎', role: 'エンジニア' },
    { id: 2, name: '佐藤花子', role: 'デザイナー' },
    { id: 3, name: '鈴木次郎', role: 'プロダクトマネージャー' },
  ];

  const code = `const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserDetail,
  // パラメータは型安全に取得できる
  loader: ({ params }) => fetchUser(params.userId),
});

// コンポーネント内で使用
function UserDetail() {
  const { userId } = userRoute.useParams();
  const user = userRoute.useLoaderData();

  return <div>User ID: {userId}</div>;
}`;

  return (
    <PlaygroundSection
      title="2. ルートパラメータ (Route Params)"
      description="URLパラメータを型安全に扱えます。動的なルートを簡単に作成できます。"
      code={code}
    >
      <div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              style={{
                padding: '1rem',
                backgroundColor: selectedUserId === user.id ? '#e3f2fd' : 'white',
                border: selectedUserId === user.id ? '2px solid #00d8ff' : '1px solid #e0e0e0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {user.name}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>
                {user.role}
              </div>
            </button>
          ))}
        </div>

        {selectedUserId && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '0.5rem',
            borderLeft: '4px solid #00d8ff'
          }}>
            <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
              ルート: <code style={{
                backgroundColor: '#e0e0e0',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem'
              }}>/users/{selectedUserId}</code>
            </div>

            {users.find(u => u.id === selectedUserId) && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {users.find(u => u.id === selectedUserId)?.name}
                </h3>
                <p style={{ color: '#666' }}>
                  役割: {users.find(u => u.id === selectedUserId)?.role}
                </p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  User ID: {selectedUserId}
                </p>
              </div>
            )}
          </div>
        )}

        {!selectedUserId && (
          <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
            ユーザーを選択してください
          </p>
        )}
      </div>
    </PlaygroundSection>
  );
}

// 検索パラメータ
function SearchParamsExample() {
  const [searchParams, setSearchParams] = useState({
    query: '',
    category: 'all',
    sortBy: 'date'
  });

  const handleChange = (key: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [key]: value }));
  };

  const code = `const searchSchema = z.object({
  query: z.string().optional(),
  category: z.enum(['all', 'tech', 'design']),
  sortBy: z.enum(['date', 'name']),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  validateSearch: searchSchema,
});

// コンポーネント内で使用
function Search() {
  const search = searchRoute.useSearch();
  const navigate = searchRoute.useNavigate();

  const updateSearch = (updates) => {
    navigate({ search: (prev) => ({ ...prev, ...updates }) });
  };
}`;

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (searchParams.query) params.append('query', searchParams.query);
    params.append('category', searchParams.category);
    params.append('sortBy', searchParams.sortBy);
    return params.toString();
  };

  return (
    <PlaygroundSection
      title="3. 検索パラメータ (Search Params)"
      description="検索パラメータ（クエリ文字列）を型安全に管理できます。Zodなどでバリデーションも可能です。"
      code={code}
    >
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              検索クエリ
            </label>
            <input
              type="text"
              value={searchParams.query}
              onChange={(e) => handleChange('query', e.target.value)}
              placeholder="検索..."
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              カテゴリ
            </label>
            <select
              value={searchParams.category}
              onChange={(e) => handleChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc'
              }}
            >
              <option value="all">すべて</option>
              <option value="tech">テクノロジー</option>
              <option value="design">デザイン</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              並び替え
            </label>
            <select
              value={searchParams.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc'
              }}
            >
              <option value="date">日付順</option>
              <option value="name">名前順</option>
            </select>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '0.5rem'
        }}>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            生成されるURL:
          </div>
          <code style={{
            display: 'block',
            padding: '0.75rem',
            backgroundColor: '#e0e0e0',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            wordBreak: 'break-all'
          }}>
            /search?{buildQueryString()}
          </code>

          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: '0.25rem' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>検索条件:</div>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
              <li>クエリ: {searchParams.query || '(なし)'}</li>
              <li>カテゴリ: {searchParams.category}</li>
              <li>並び替え: {searchParams.sortBy}</li>
            </ul>
          </div>
        </div>
      </div>
    </PlaygroundSection>
  );
}

// ネストされたルート
function NestedRoutesExample() {
  const [selectedSection, setSelectedSection] = useState<string>('profile');

  const sections = [
    { id: 'profile', label: 'プロフィール', content: 'ユーザーのプロフィール情報を表示します。' },
    { id: 'settings', label: '設定', content: 'アカウント設定を管理します。' },
    { id: 'notifications', label: '通知', content: '通知設定を変更できます。' },
  ];

  const code = `const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: Profile,
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/settings',
  component: Settings,
});

// ルートツリー
const routeTree = rootRoute.addChildren([
  dashboardRoute.addChildren([
    profileRoute,
    settingsRoute,
  ]),
]);`;

  return (
    <PlaygroundSection
      title="4. ネストされたルート (Nested Routes)"
      description="親子関係のあるルートを作成し、レイアウトを共有できます。"
      code={code}
    >
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '0.5rem',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            ダッシュボード
          </h3>
          <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
            /dashboard - 親ルート
          </p>
        </div>

        <div style={{ display: 'flex', minHeight: '300px' }}>
          <div style={{
            width: '200px',
            backgroundColor: '#fafafa',
            borderRight: '1px solid #e0e0e0',
            padding: '1rem'
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: selectedSection === section.id ? '#00d8ff' : 'white',
                  color: selectedSection === section.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: selectedSection === section.id ? 'bold' : 'normal'
                }}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, padding: '1.5rem' }}>
            {sections.find(s => s.id === selectedSection) && (
              <>
                <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>
                  ルート: <code style={{
                    backgroundColor: '#e0e0e0',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>/dashboard/{selectedSection}</code>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {sections.find(s => s.id === selectedSection)?.label}
                </h4>
                <p style={{ color: '#666' }}>
                  {sections.find(s => s.id === selectedSection)?.content}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </PlaygroundSection>
  );
}

// データローディング
function DataLoadingExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const loadData = async () => {
    setIsLoading(true);
    setData(null);

    // モックデータのロード（1秒遅延）
    await new Promise(resolve => setTimeout(resolve, 1000));

    setData({
      title: 'サンプル記事',
      author: '山田太郎',
      publishedAt: '2024-01-15',
      content: 'TanStack Routerのローダー機能を使用すると、ルートに遷移する前にデータをプリロードできます。これにより、スムーズなユーザー体験を提供できます。',
      views: 1234,
      likes: 89
    });
    setIsLoading(false);
  };

  const code = `const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  // ルート遷移前にデータをロード
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
  component: PostDetail,
});

function PostDetail() {
  const { post } = postRoute.useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}`;

  return (
    <PlaygroundSection
      title="5. データローディング (Data Loading)"
      description="ルートレベルでデータをプリロードできます。ページ遷移前にデータを取得し、スムーズな体験を提供します。"
      code={code}
    >
      <div>
        <button
          onClick={loadData}
          disabled={isLoading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isLoading ? '#ccc' : '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}
        >
          {isLoading ? 'データ読み込み中...' : 'データをロード'}
        </button>

        {isLoading && (
          <div style={{
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #00d8ff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              ローダーがデータを取得しています...
            </p>
          </div>
        )}

        {!isLoading && data && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '0.5rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {data.title}
            </h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: '#666'
            }}>
              <span>著者: {data.author}</span>
              <span>公開日: {data.publishedAt}</span>
              <span>👁 {data.views}</span>
              <span>❤️ {data.likes}</span>
            </div>
            <p style={{ color: '#333', lineHeight: '1.6' }}>
              {data.content}
            </p>
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              color: '#2e7d32'
            }}>
              ✓ データがローダーによってプリロードされました
            </div>
          </div>
        )}

        {!isLoading && !data && (
          <p style={{
            color: '#999',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '0.5rem'
          }}>
            「データをロード」ボタンをクリックしてください
          </p>
        )}
      </div>
    </PlaygroundSection>
  );
}
