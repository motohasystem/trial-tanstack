import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { PlaygroundSection } from '../components/PlaygroundSection';

export function FormPlayground() {
  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>
        React Form Playground 📝
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: '#666',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        TanStack Formは、型安全で柔軟なフォーム管理ライブラリです。
        バリデーション、フィールド配列、条件付きフィールドなど、複雑なフォームを簡単に実装できます。
      </p>

      <BasicFormExample />
      <ValidationFormExample />
      <FieldArrayExample />
      <ConditionalFieldsExample />
    </div>
  );
}

// 基本的なフォーム
function BasicFormExample() {
  const [submittedData, setSubmittedData] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      setSubmittedData(value);
      console.log('送信されたデータ:', value);
    },
  });

  const code = `const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
  },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});

// フィールドの使用
<form.Field name="firstName">
  {(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  )}
</form.Field>`;

  return (
    <PlaygroundSection
      title="1. 基本的なフォーム (Basic Form)"
      description="useFormフックを使って、シンプルなフォームを作成できます。"
      code={code}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '500px'
        }}
      >
        <form.Field name="firstName">
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                名前
              </label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="lastName">
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                苗字
              </label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                メールアドレス
              </label>
              <input
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          送信
        </button>

        {submittedData && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            borderRadius: '0.25rem',
            borderLeft: '4px solid #4caf50'
          }}>
            <h4 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>送信されたデータ:</h4>
            <pre style={{ fontSize: '0.875rem' }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </PlaygroundSection>
  );
}

// バリデーション付きフォーム
function ValidationFormExample() {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      alert('フォームが正常に送信されました!');
      console.log(value);
    },
  });

  const code = `const form = useForm({
  defaultValues: { username: '', password: '' },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});

<form.Field
  name="username"
  validators={{
    onChange: ({ value }) =>
      value.length < 3
        ? '3文字以上で入力してください'
        : undefined,
  }}
>
  {(field) => (
    <>
      <input value={field.state.value} ... />
      {field.state.meta.errors && (
        <span>{field.state.meta.errors[0]}</span>
      )}
    </>
  )}
</form.Field>`;

  return (
    <PlaygroundSection
      title="2. バリデーション (Validation)"
      description="リアルタイムでフォームのバリデーションを行えます。"
      code={code}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '500px'
        }}
      >
        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              value.length < 3
                ? 'ユーザー名は3文字以上で入力してください'
                : undefined,
          }}
        >
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                ユーザー名
              </label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: field.state.meta.errors.length > 0 ? '1px solid #f44336' : '1px solid #ccc'
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              value.length < 8
                ? 'パスワードは8文字以上で入力してください'
                : undefined,
          }}
        >
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                パスワード
              </label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: field.state.meta.errors.length > 0 ? '1px solid #f44336' : '1px solid #ccc'
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ['password'],
            onChange: ({ value, fieldApi }) => {
              const password = fieldApi.form.getFieldValue('password');
              return value !== password
                ? 'パスワードが一致しません'
                : undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                パスワード(確認)
              </label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: field.state.meta.errors.length > 0 ? '1px solid #f44336' : '1px solid #ccc'
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span style={{ color: '#f44336', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          送信
        </button>
      </form>
    </PlaygroundSection>
  );
}

// フィールド配列
function FieldArrayExample() {
  const form = useForm({
    defaultValues: {
      tasks: ['タスク 1', 'タスク 2'],
    },
    onSubmit: async ({ value }) => {
      alert('タスクリストが保存されました!');
      console.log(value);
    },
  });

  const code = `<form.Field name="tasks" mode="array">
  {(field) => (
    <>
      {field.state.value.map((_, i) => (
        <form.Field key={i} name={\`tasks[\${i}]\`}>
          {(subField) => (
            <input
              value={subField.state.value}
              onChange={(e) =>
                subField.handleChange(e.target.value)
              }
            />
          )}
        </form.Field>
      ))}
      <button
        onClick={() =>
          field.pushValue(\`タスク \${field.state.value.length + 1}\`)
        }
      >
        追加
      </button>
    </>
  )}
</form.Field>`;

  return (
    <PlaygroundSection
      title="3. フィールド配列 (Field Arrays)"
      description="動的にフィールドを追加・削除できる配列フィールドを作成できます。"
      code={code}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '500px'
        }}
      >
        <form.Field name="tasks" mode="array">
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
                タスクリスト
              </label>
              {field.state.value.map((_, i) => (
                <form.Field key={i} name={`tasks[${i}]`}>
                  {(subField) => (
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        value={subField.state.value}
                        onChange={(e) => subField.handleChange(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid #ccc'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => field.removeValue(i)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer'
                        }}
                      >
                        削除
                      </button>
                    </div>
                  )}
                </form.Field>
              ))}
              <button
                type="button"
                onClick={() => field.pushValue(`タスク ${field.state.value.length + 1}`)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                + タスクを追加
              </button>
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          保存
        </button>
      </form>
    </PlaygroundSection>
  );
}

// 条件付きフィールド
function ConditionalFieldsExample() {
  const form = useForm({
    defaultValues: {
      accountType: 'personal',
      companyName: '',
      vatNumber: '',
    },
    onSubmit: async ({ value }) => {
      alert('フォームが送信されました!');
      console.log(value);
    },
  });

  const code = `const accountType = form.useStore((state) =>
  state.values.accountType
);

{accountType === 'business' && (
  <form.Field name="companyName">
    {(field) => <input ... />}
  </form.Field>
)}`;

  return (
    <PlaygroundSection
      title="4. 条件付きフィールド (Conditional Fields)"
      description="他のフィールドの値に応じて、フィールドの表示/非表示を切り替えられます。"
      code={code}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '500px'
        }}
      >
        <form.Field name="accountType">
          {(field) => (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                アカウントタイプ
              </label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              >
                <option value="personal">個人</option>
                <option value="business">ビジネス</option>
              </select>
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => state.values.accountType}
        >
          {(accountType) => (
            <>
              {accountType === 'business' && (
                <>
                  <form.Field name="companyName">
                    {(field) => (
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                          会社名
                        </label>
                        <input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid #ccc'
                          }}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="vatNumber">
                    {(field) => (
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                          VAT番号
                        </label>
                        <input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            border: '1px solid #ccc'
                          }}
                        />
                      </div>
                    )}
                  </form.Field>
                </>
              )}
            </>
          )}
        </form.Subscribe>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#00d8ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          送信
        </button>
      </form>
    </PlaygroundSection>
  );
}
