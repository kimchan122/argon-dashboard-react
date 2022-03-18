import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import {
  Badge,
  Card,Col,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavLink,
  
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,

  Row,Button,
  UncontrolledTooltip,
} from "reactstrap";
import * as S from "./style";


const Store = () => {

  const [data, setData] = useState([]);

  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);
  const [images, setImages]=useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
        try {
            setError(null);
            setLoading(true);
            
            const response = await axios.get("/partner/myStore");
            setData(response.data.result);
            setImages(response.data.result.storeImage);
      
        } catch (e){
            setError(e);
        }
        setLoading(false);
    };
    
    fetchData();
},[]);

  return (
    <>
      <Header />
      {/* Page content */}
      <br/> <br/> <br/> <br/> <br/> <br/>
      <Container className="mt--7" fluid>
        {/* Table */}
       <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">매장 정보</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>

                <thead className="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                  
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <th scope="row">

                          <span className="mb-0 text-sm">
                            매장 이름
                          </span>
                    </th>
                    <td> {data.storeName} </td>
                    
                  </tr>
                  <tr>

                <th scope="row">
                  
                      <span className="mb-0 text-sm">
                        매장 대표 사진
                      </span>
                
                </th>
                <td>
                <S.Image>

                   <img src={data.mainStoreImage}/>
                   </S.Image>
             
                 </td></tr>
                 <tr>
<th scope="row">
  
      <span className="mb-0 text-sm">
        매장 전체 사진
      </span>

  </th>
<td>
   <S.Image>
{images.map((d)=><Media>
  <img width="300px" src={d}/>
<br/></Media>
)}
           </S.Image> 
 </td>
                </tr>

                <tr>

<th scope="row">

      <span className="mb-0 text-sm">
       매장 소개
      </span>
  
</th>
<td> {data.storeInfo} </td>

</tr>





   <tr>

                    <th scope="row">
                   
                          <span className="mb-0 text-sm">
                            전화번호
                          </span>
                     
                    </th>
                    <td>{data.storePhoneNumber} </td>
                    
                  </tr>
                     <tr>

                    <th scope="row">
                 
                          <span className="mb-0 text-sm">
                           주소
                          </span>
                   
                    </th>
                    <td> {data.storeLocation} </td>
                    
                  </tr>
                  <tr>

<th scope="row">

      <span className="mb-0 text-sm">
       브랜드
      </span>
  
</th>
<td> {data.storeBrand} </td>

</tr>

<tr>

<th scope="row">

      <span className="mb-0 text-sm">
        운영시간
      </span>
   
</th>
<td> {data.storeTime} </td>

</tr>

<tr>

<th scope="row">

      <span className="mb-0 text-sm">
       타석 수
      </span>
   
</th>
<td> {data.batCount} </td>

</tr>
<tr >

<th scope="row">
   
      <span className="mb-0 text-sm">
       편의 시설
      </span>
</th>
<td> 
   </td>
</tr>

<tr >
<th scope="row">
   
      <span className="mb-0">
       바닥 스크린
      </span>
   
</th>
{data.floorScreenStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>


   <tr >
<th scope="row">
      <span className="mb-0">
      장비 보관 
      </span>
</th>
{data.storageStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="mb-0">
      주차 시설
      </span>
</th>
{data.parkingStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="mb-0">
     왼손 전용
      </span>
</th>
{data.leftHandsatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="mb-0">
      그룹 석 
      </span>
</th>
{data.groupSeatStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>

   <tr >
<th scope="row">
      <span className="mb-0">
      레쓴 제공
      </span>
</th>
{data.lessonStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
      예약 가능 여부 
      </span>
</th>
{data.reserveStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
  쿠폰 여부
      </span>
</th>
{data.couponStatus?
  <td> 
   O</td>:
  <td> 
   X</td> } 
   </tr>
 


                  
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        
        
       
        
   <br/>
   <NavLink
             to=
             {{
               pathname:"/admin/storeedit",
               state:{
              data: data}}}

             tag={NavLinkRRD}
             activeClassName="active"
          >  
        <Button 
                color="info"
              >
               정보 수정
              </Button>
              </NavLink>




              
                  </Container>
    </>
  );
};

export default Store;
