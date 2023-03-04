import { Result } from "antd";

export default function NotPermission() {
    return (
        <>
            <Result
                status={403}
                title="403"
                subTitle="Уучлаарай, та энэ хуудсанд хандах эрхгүй байна."
            />
        </>
    )
}