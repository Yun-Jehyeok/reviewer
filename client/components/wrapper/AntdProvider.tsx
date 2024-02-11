import { ConfigProvider } from 'antd';

interface AntdProviderProps {
  children: React.ReactNode;
}

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000',
        },
        components: {
          Pagination: {
            itemSize: 36,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
