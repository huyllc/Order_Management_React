import { ISearchMenu } from "types/search.type";
import { ORDER_STATUS } from "./order.const";

export const SearchOrderStatus: ISearchMenu[] = [
    {
        value: ORDER_STATUS.none,
        label: "Chưa thanh toán"
    },
    {
        value: ORDER_STATUS.stake,
        label: "Đã đặt cọc"
    },
    {
        value: ORDER_STATUS.done,
        label: "Đã thanh toán"
    }
];