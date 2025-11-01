export function Home() {
  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        TanStack Learning Playground へようこそ 🚀
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        このアプリケーションは、TanStackの主要なライブラリを学習するためのインタラクティブなプレイグラウンドです。
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <FeatureCard
          title="React Query 🔄"
          description="データフェッチング、キャッシング、同期、サーバー状態管理を簡単に実装できます。"
          features={[
            'データのフェッチングとキャッシング',
            '自動バックグラウンド更新',
            'Optimistic Updates',
            'Infinite Queries',
            'Mutations'
          ]}
        />

        <FeatureCard
          title="React Table 📊"
          description="強力で柔軟なテーブルコンポーネントを作成できます。"
          features={[
            'ソート機能',
            'フィルタリング',
            'ページネーション',
            'カラムの表示/非表示',
            '行選択'
          ]}
        />

        <FeatureCard
          title="React Virtual 📜"
          description="大量のデータを効率的に仮想化してレンダリングできます。"
          features={[
            '仮想スクロール',
            '動的な行の高さ',
            '水平/垂直スクロール',
            'グリッドレイアウト',
            'パフォーマンス最適化'
          ]}
        />

        <FeatureCard
          title="React Form 📝"
          description="型安全で柔軟なフォーム管理を実現します。"
          features={[
            'バリデーション',
            'フィールド配列',
            'ネストされたフォーム',
            '条件付きフィールド',
            'リアルタイム検証'
          ]}
        />

        <FeatureCard
          title="TanStack Router 🛣️"
          description="型安全で強力なルーティングライブラリです。"
          features={[
            '完全な型安全性',
            'ルートパラメータ',
            '検索パラメータ管理',
            'データプリローディング',
            'ネストされたルート'
          ]}
        />
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #00d8ff'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          使い方
        </h2>
        <ol style={{
          lineHeight: '2',
          color: '#444',
          paddingLeft: '1.5rem'
        }}>
          <li>左側のナビゲーションから学習したい機能を選択</li>
          <li>各ページで実際に動作するデモを確認</li>
          <li>コードサンプルを参照して理解を深める</li>
          <li>パラメータを変更して動作を試す</li>
        </ol>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  features: string[];
}

function FeatureCard({ title, description, features }: FeatureCardProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '0.75rem',
        color: '#1a1a1a'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#666',
        marginBottom: '1rem',
        lineHeight: '1.6'
      }}>
        {description}
      </p>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        color: '#444'
      }}>
        {features.map((feature, index) => (
          <li key={index} style={{
            padding: '0.25rem 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ color: '#00d8ff', marginRight: '0.5rem' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
