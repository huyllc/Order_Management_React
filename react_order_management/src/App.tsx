
import { AlertProvider } from "contexts/alert-context";
import MainLayout from "layouts/MainLayout";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import('pages/Dashboard'));
const OrdersPage = lazy(() => import('pages/Orders'));
const OrderDetailPage = lazy(() => import('pages/Detail'));
const CreateOrder = lazy(() => import('pages/CreateOrder'))
const CustomersPage = lazy(() => import('pages/Customers'));
const CustomersAddPage = lazy(() => import('pages/Customer/create'));
const CustomerId = lazy(() => import('pages/Customer/id'));
const ReturnOrderPage = lazy(() => import('pages/ReturnOrders'));
const ReturnOrderAdd = lazy(() => import('pages/ReturnOrder/id'));

const App = () => {
	return (
		<Suspense fallback={<></>}>
			<AlertProvider>
				<Routes>
					<Route element={<MainLayout></MainLayout>}>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="/orders" element={<OrdersPage />}></Route>
						<Route path="/orders/add" element={<CreateOrder />}></Route>
						<Route path="/orders/:id" element={<OrderDetailPage />}></Route>
						<Route path="/customers">
							<Route path="" element={<CustomersPage />} />
							<Route path="add" element={<CustomersAddPage />} />
							<Route path=":id" element={<CustomerId />} />
						</Route>
						<Route path="/return-orders" element={<ReturnOrderPage />}></Route>
						<Route path="/return-orders/:id" element={<ReturnOrderAdd />}></Route>
					</Route>
				</Routes>
			</AlertProvider>
		</Suspense>
	);
};

export default App;
