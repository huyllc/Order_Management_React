import { TSibebarLink } from "types/general.type";
import { IPagination } from "types/pagination.type";
import IconDashboard from "components/icons/IconDashboard";
import IconOrder from "components/icons/IconOrder";
import IconReturnOrder from "components/icons/IconReturnOrder";

export const SidebarLink: TSibebarLink[] = [
    {
        name: 'Dashboard',
        href: '/',
        icon: <IconDashboard />
    },
    {
        name: 'Quản lý đơn hàng',
        href: '/orders',
        icon: <IconOrder />
    },
    {
        name: 'Quản lý khách hàng',
        href: '/customers',
        icon: <IconDashboard />
    },
    {
        name: 'Quản lý trả hàng',
        href: '/return-orders',
        icon: <IconReturnOrder />
    }
];

export const defaultPagination: IPagination = {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0
};