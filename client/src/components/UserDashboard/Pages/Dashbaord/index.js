import {dashboarddata } from "../../../../services/api";
import {
  DollarCircleOutlined,
  UsergroupAddOutlined,
  ShoppingOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Card, Space, Spin, Statistic, Table, Typography } from "antd";
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
  const [approvalProperty, setApprovalPrperty] = useState(0);
  const [Pendingproperties, setPendingProperties] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getData = async () => {
    setLoading(true)

    try{

      const result = await dashboarddata();
      // setData(result);
      console.log(result,"maaz");
      // setData(result.property)
      setProperties(result.propertyCount)
      setApprovalPrperty(result.ApprovedCount);
      // // setPendingUsers(result.pendingUser);
      setPendingProperties(result.pendingCount);
    }
  catch(err){
    console.error("Error fetching dashboard data:", err);
  }
  finally{
    setLoading(false)
  }

    };
    getData();
 
  }, []);

  return (
    <Space size={30} direction="vertical" >
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal"  align="center" style={{display:"flex" ,width:"100%",justifyContent:"center",marginLeft:"50px"}}>
        
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
            <HomeOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Approval Property"}
          value={approvalProperty}
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    try{
    const getpropertyData = async()=>{
      const getPropertyDataResult = await dashboarddata();
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
     console.log(dataSource,"dashbaord")
    }
getpropertyData();
}
catch(err){
  console.error("Error fetching dashboard data:", err);
}
finally{
  setLoading(false)
}
  }, []);

  const handleSearch=(e)=>{
    const query=e.target.value;
    setSearchQuery(query)

    console.log(searchQuery,"query")

  }
  useEffect(()=>{
  if(searchQuery===""){
    setSearchResults(dataSource)
  }
  else{
    const query=searchQuery.toLowerCase();
    const results=dataSource.filter(item=>
     item.title.toLowerCase().includes(query) 
      
      )
      setSearchResults(results)


  }
  },[dataSource,searchQuery])


  return (
    <> 
    <div style={{marginLeft:"80px"}}>
    <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
    </div>
    <Spin spinning={loading}>

      <Table style={{width:"100%", height: "100%", marginBottom: "20px", marginTop: "40px", marginLeft: "30px"}}
       loading={loading}
       
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
        dataSource={searchResults}
       pagination={true}
       
      ></Table>  </Spin>

    </>
  );
}
 
export default Dashboard;
