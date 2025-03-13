import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

interface AntdProviderProps {
    children: React.ReactNode;
}

export default function AntdProvider({ children }: AntdProviderProps) {
    return (
        <AntdRegistry>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#000",
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
        </AntdRegistry>
    );
}
