import { Avatar, Space, Table, Typography ,Spin} from "antd";
import { useEffect, useState } from "react";
import { GetCustomers } from "../../../../services/api";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {

    const getCustomerData = async () => {
    setLoading(true)
    try{

      const result = await GetCustomers();
      console.log(result.allUsers,"allusers")
      const results = result.allUsers;
      const customers = results.map((customer) => ({
        // name: customer.Name,
        company_name: customer.company_name,
        email: customer.email,
        status: customer.status
      }));
      setDataSource(customers);
    }
    catch(err){
      console.error("Error fetching customer data:", err);
    }
    finally{
      setLoading(false)
    }
    }
    
    getCustomerData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query)


  }

  useEffect(() => {

    if(searchQuery===""){
      setSearchResults(dataSource)
    }
    else{
          const query=searchQuery.toLowerCase()
          const results=dataSource.filter(item=>
            item.company_name.toLowerCase().includes(query) 
            )
          setSearchResults(results);
    }
  }, [dataSource,searchQuery]);

  return (
    <>
      <AppHeader />
      <div className="SideMenuAndPageContent" style={{
        background: "#F2F2F2",
        height: "91vh"
      }}>
        <SideMenu></SideMenu>
        <Space size={20} direction="vertical" style={{ background: "#F2F2F2" }}>
          <Typography.Title level={4}>Customers</Typography.Title>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <Spin spinning={loading}>
          <Table
            style={{ width: 1000 }}
            loading={loading}
            columns={[
              
              {
                title: "Company Name",
                dataIndex: "company_name",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Status",
                dataIndex: "status",
              },
            ]}
            dataSource={searchResults}
            pagination={{
              pageSize: 5,
            }}
          >
          </Table>
          </Spin>
        </Space>
      </div>
    </>
  );
}

export default Customers;