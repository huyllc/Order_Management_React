import axios from "axios";
import Loading from "components/layout/Loading";
import { API_URL } from "config";
import React from "react";
import { Link } from "react-router-dom";
import formatMoney from "utils/formatMoney";

const Dashboard = () => {
    const [totalInfo, setTotalInfo] = React.useState<any>({});
    const [loading, setLoading] = React.useState(false);

    const fetchTotalInfo = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API_URL}/dashboard`);

            if (response.status === 200 && response.data) {
                setTotalInfo(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTotalInfo();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                        <div className="inner p-3">
                            <h3>{totalInfo?.orderTotal}</h3>
                            <p>Tổng đơn hàng</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag"></i>
                        </div>
                        <Link to="/orders" className="small-box-footer">Chi tiết <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                        <div className="inner p-3">
                            <h3>{totalInfo?.customerTotal}</h3>
                            <p>Tổng khách hàng</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars"></i>
                        </div>
                        <Link to="/customers" className="small-box-footer">Chi tiết <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                        <div className="inner p-3">
                            <h3>{totalInfo?.returnOrderTotal}</h3>
                            <p>Tổng hoàn trả</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add"></i>
                        </div>
                        <Link to="/return-orders" className="small-box-footer">Chi tiết <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                        <div className="inner p-3">
                            <h3>{formatMoney(totalInfo?.paymentTotal)}</h3>
                            <p>Tổng thu nhập</p>
                        </div>
                        <div className="icon">
                        <i className="ion ion-pie-graph"></i>
                        </div>
                        <Link to="#" className="small-box-footer">Chi tiết <i className="fas fa-arrow-circle-right"></i></Link>
                    </div>
                </div>

            </div>
            <div className="row">
                
            </div>
            {loading && <Loading />}
        </>
    )
}

export default Dashboard;
