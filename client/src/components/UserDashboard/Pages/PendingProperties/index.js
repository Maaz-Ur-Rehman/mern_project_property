import { Button, Card, Form, Input, Modal, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { dashboarddata, specificproperty, updatedashboarddata } from "../../../../services/api";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import { statusPropertychange } from "../../../../services/api";
import { HomeOutlined, } from "@ant-design/icons";
import { CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ColumnGroup from "antd/es/table/ColumnGroup";

function UserPendingProperties() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [approvalProperty, setApprovalPrperty] = useState(0);
  const [properties, setProperties] = useState(0);
  // const [Pendingusers, setPendingUsers] = useState(0);
  const [Pendingproperties, setPendingProperties] = useState(0);
  const showModal = (record) => {
    setSelectedRecord(record);
    console.log(record);
    setModalVisible(true);
  };

  
  useEffect(() => {

    const getData = async () => {
      const result = await dashboarddata();
      console.log(result,"restulu");
      setData(result.property)
      setProperties(result.propertyCount)
      setApprovalPrperty(result.ApprovedCount);
      // // setPendingUsers(result.pendingUser);
      setPendingProperties(result.pendingCount);
    };
    getData();
 
  }, []);
console.log(data,"aya hai data")
  const handleOk = async () => {
    const selectedID = selectedRecord.Id;
    await statusPropertychange({

      id: selectedID,
      message: "Approved",
    });
    setModalVisible(false);
  };

  const handleCancel = async () => {
    const selectedID = selectedRecord.Id;
    await statusPropertychange({
      id: selectedID,
      message: "Rejected",
    });
    setModalVisible(false);
  };

  return (
    <>
      <AppHeader />
      <div
        className="SideMenuAndPageContent"
        style={{
          background: "#F2F2F2",
          height: "100%",
          // overflow: "auto",
        }}
      >
        <SideMenu></SideMenu> 
        <Space direction="vertical" >
        <Typography.Title level={7 }>Overview Status</Typography.Title>
        <Space direction="horizontal" align="center"  style={{ width: "100%", justifyContent: "center"}} size={40} >
        <DashboardCard
        style={{
        
        }}
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
      
          <Space
            size={20}
            direction="vertical"
            style={{ background: "#F2F2F2" }}
          >
            <Typography.Title level={4}>Pending Properties</Typography.Title>

            <RecentOrders />
            
             
          </Space>
          <Space direction="vertical" size={100}>
           
          {
               <div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"40px",}}>
                {data.map((item) => (
                  <Card key={item.key} sx={{ maxWidth: 345,margin:70 }}>
                    {/* <img src={`http://localhost:7000/uploads/${item.Image}`} /> */}
                    <CardMedia
          component="img"
          height="194"
          // src={item.Image}
          // image={item.Image}
          src={`http://localhost:7000/uploads/${item.Image}`}
          alt="Paella dish"
        />
        
                    <p>ProperType: {item.property_type}</p>
                    <p>Price: {item.priceTo}</p>
                    <p>Location: {item.city}</p>
                  </Card>
                ))}
              </div>
             </div>
         
            }
          </Space>
          
        </Space>
      </div>
    </>
  );
}
function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ width: 200, height: 150 }}>
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

  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate=useNavigate()
  useEffect(() => {
    // setLoading(true);
    const getpropertyData = async()=>{
      const getPropertyDataResult = await dashboarddata();
      // console.log(getPropertyDataResult,"get")
      const propertyDetails = getPropertyDataResult.property;
      console.log(propertyDetails,"detail")
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
    console.log(dataSource,"datasource")
    // setLoading(false)
  }
  getpropertyData();
}, []);

  const handleEdit = async(record) => {
    let keyId=record.key
    console.log(record.key)
    localStorage.setItem("keyId",keyId)

    console.log(record,"rcord")
    const specificPropertyData=await specificproperty()

    console.log(specificPropertyData,"spe")
    
    setSelectedRecord(specificPropertyData);
    console.log(selectedRecord,"selectedrecord")   
    navigate('/editform', { state: { selectedRecord: specificPropertyData } });

  };
  return (
    <> 
<Table
            style={{ width: 1000,marginLeft:"20px" }}
            loading={loading}
            columns={[
              {
                title: "Property Type",
                dataIndex: "type",
              }
              ,{
                title: "About",
                dataIndex: "title",
              },
              
              {
                title: "Property Price",
                dataIndex: "priceFrom",
              },
              {
                title: "Status",
                dataIndex: "status",
              },
               {
                title: "Action",
                key: "action",
                render: (text, record) => (
                  <Button onClick={() => handleEdit(record)}>Edit</Button>
                ),
              },
            ]}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          ></Table>

</>
  )
}
 


export default UserPendingProperties;
