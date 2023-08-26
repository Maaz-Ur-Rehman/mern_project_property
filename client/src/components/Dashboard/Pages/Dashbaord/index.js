import {admindashboarddata, dashboarddata } from "../../../../services/api";
import {
  DollarCircleOutlined,
  UsergroupAddOutlined,
  ShoppingOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [users, setUsers] = useState(0);
  const [properties, setProperties] = useState(0);
  const [Pendingusers, setPendingUsers] = useState(0);
  const [Pendingproperties, setPendingProperties] = useState(0);
  // const navigate=useNavigate()
  // let getData=async ()=>{
  //     let userToken=localStorage.getItem('userDataToken')
  //     console.log(userToken)  

  //     axios 
  //     .get("http://localhost:7000/validuser",{
  //       headers:{
  //         Authorization: userToken,
  //       }
  //     })
  //     .then((res)=>{
  //       console.log(res.data)
  //       if (res.data.status === 401 || !res.data) {
  //             console.log("error page")
  //             navigate("*");
  //           } else {
      
  //             console.log("user verify")
              
  //             navigate("/dash");
  //           }
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })
  // }

  // useEffect(()=>{
  //   getData();
  // },[])
  useEffect(() => {

    const getData = async () => {
      const result = await admindashboarddata();
      // setData(result);
      console.log(result,"admin");
      setUsers(result.usersCount);
      setProperties(result.propertyCount);
      setPendingUsers(result.pendingCount);
      setPendingProperties(result.pendingPropertiesCount);
    };
    getData();
 
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard 
          icon={
            <UsergroupAddOutlined
              style={{
                color: "green",
                // backgroundColor: "rgba(0,255,0,0.25)",
                backgroundColor: "#FEF8DD",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Users"}
          value={users}
        />
        <DashboardCard
          icon={
            <HomeOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Properties"}
          value={properties}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Pending Users"}
          value={Pendingusers}
        />
        <DashboardCard
          icon={
            <HomeOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Pending Properties"}
          value={Pendingproperties}
        />
      </Space>
      <Space>
        <RecentOrders />
        {/* <DashboardChart /> */}
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 200, height: 150,margin: '20px' }}>
      <Space direction="horizontal" >
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    const getpropertyData = async()=>{
      const getPropertyDataResult = await admindashboarddata();
      console.log(getPropertyDataResult,"adminData")
     const propertyDetails = getPropertyDataResult.property;
     const newDataSource = propertyDetails.map((property)=>({
      key : property._id,
      title : property.title,
          type : property.property_type,
          price : property.price,
          status : property.status,
          priceFrom : property.priceFrom,
          priceTo : property.priceTo
     }));
     setDataSource(newDataSource);
    //  console.log(dataSource)
    }
getpropertyData();
  }, []);

  return (
    <> 
      <Typography.Text>Properties</Typography.Text>
      <Table style={{ width: 1000, height: "100%", marginBottom: "20px" }}
        columns={[
          {
            title: "Property Title",
            dataIndex: "title",
          },
          {
            title: "Property Type",
            dataIndex: "type",
          },
          {
            title: "Property Price From",
            dataIndex: "priceFrom",
          },
          {
            title: "Property Price To",
            dataIndex: "priceTo",
          },
          {
            title: "Property Status",
            dataIndex: "status",
          }, 
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={true}
      ></Table>
    </>
  );
}
 
export default Dashboard;
