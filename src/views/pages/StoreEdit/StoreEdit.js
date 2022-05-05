import React, {useState, useEffect} from "react";
import Header from "components/Headers/Header.js";
import axios from "axios";
import useInput from "hooks/useInput";
import Post from "./Post";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import * as S from "../style";
import {
  Badge,
  Card,Col,
  CardBody,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  NavLink,
  Table,
  Container,
  Row,Button,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import { drawerClasses } from "@mui/material";

const StoreEdit = ( ) => {
  const [data, setData] = useState([]);
  const [loading, setLoading ]=useState(false);
  const [error, setError] = useState(null);
  
  const [reload,setReload]=useState(1);

  const [brands, setBrands]=useState([]);
  const [mainImage, setMainImage]=useState();
  const [storeImage, setStoreImage]=useState([]);
    
  const [nm, onChangeNm, setNm] = useInput();
  const [inf, onChangeInf, setInf] =useInput();
  const [pn, onChangePn, setPn] =useInput();
  const[bc, onChangeBc, setBc] =useInput(0);
  const[room, onChangeRoom, setRoom]=useInput();
  const[roomCount, onChangRoomCount, setRoomCount] =useInput();
  const[roomData, setRoomData]=useState([]);

  const [br, setBr] =useState();
  const [startTime, setST] =useState();
  const [endTime, setET] =useState();

  const [fss, setFss] =useState();
  const [ss, setSs] =useState();
  const [ps, setPs] =useState();
  const [lhs, setLhs] =useState();
  const [gs, setGs] =useState();
  const [ls, setLs] =useState();
  const [rs, setRs] =useState();
  const [cs, setCs] =useState();
  const [lc, onChangeLc, setLc] =useInput();
  const [postPop, setPostPop]=useState(false);
  //for files
  const [main, setMain]=useState();
  const [images, setImages]=useState([]);

  useEffect(()=>{
    const fetchData = async () =>{
        try {
            setError(null);
            setLoading(true);
        
            const d = await axios.get("/partner/myStore");
            console.log(d);
            setData(d.data.result);
            
            const response = await axios.get("/stores/brand");
            setBrands(response.data.result);

            if(d.data.result.storeName!=null){
            setNm(d.data.result.storeName);
            setInf(d.data.result.storeInfo);
            setPn(d.data.result.storePhoneNumber);
            setBr(d.data.result.storeBrand);
            const str = d.data.result.storeTime.split(" ");
            if(str[2].split(":")[0]==24){
             str[2]="00:"+str[2].split(":")[1];
            }
            setST(str[0]);
            setET(str[2]);
            setFss(d.data.result.floorScreenStatus);
            setSs(d.data.result.storageStatus);
            setPs(d.data.result.parkingStatus);
            setLhs(d.data.result.lefthandStatus);
            setGs(d.data.result.groupSeatStatus);
            setLs(d.data.result.lessonStatus);
            setRs(d.data.result.reserveStatus);
           setLc(d.data.result.storeLocation);
           setMainImage(d.data.result.mainStoreImage);

           const i = await axios.get("/partner/get_storeIdx");
          const idx= i.data.result.storeIdx;    

           const im = await axios.get(`/stores/images/${idx}`)
           setStoreImage(im.data.result);

           const d2 = await axios.get(`/stores/roomIdx?storeIdx=${idx}`);
           setRoomData(d2.data.result);
           setBc(0);
           d2.data.result.map(d=>{
            setBc(prev=>prev+d.roomIdx.length);
            });
          }  
        } catch (e){
          console.log("useEffect error:" + e);
            setError(e);
        }
        setLoading(false);
    };
    
    fetchData();
},[,reload]);

const onDrop= event =>{
  const value = (event.target.value);
  console.log(value);
  setBr(value);

}

const onTime= event =>{
  const value = (event.target.value);
  console.log(value);
  setST(value);
}

const onETime= event =>{
  const value = (event.target.value);
  console.log(value);
  setET(value);
}

  const onHandleImage=e=>{
    e.preventDefault();
    const formData = new FormData();
    
    //대표
    formData.append(
      "mainStoreImage",
      main
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
   
    try{
      axios.post('/partner/register_image', formData).then(response => {
     // window.location.reload();

    });
    }catch(e){
      console.log(e);
    }
    setReload(reload+1);
    

  }
    const onHandleImages=e=>{
      const formData = new FormData();
    
    //전체
    for(let i=0; i<images.length;i++){
      formData.append(
        "storeImages",
        images[i]);
      }
      
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
   
try{
  axios.post('/partner/register_image', formData).then(response => {
  console.log(response);
  setReload(reload+1);
  });
}catch(e){
  console.log(e);
}


  }

  
  const onDeleteImage=e=>{ 
      axios.delete(`/partner/image/${e.target.value}`).then(response => {
        console.log(response);  

    })
    setReload(reload+1);
  }

  const onRoom=e=>{
    const newData ={
      "roomType" : room,
      "count":roomCount
    }
    axios.post("/partner/room",newData).then(response=>{
      console.log(response);
      setReload(reload+1);
    });
  }
const onDelRoom=e=>{
  axios.delete(`/partner/room?roomIdx=${e.target.value}`).then(response=>{
    console.log(response);
    setReload(reload+1);
  })
}

const onSubmit =event =>{
  
 const newData= {
  "storeName": nm,
  "storeInfo": inf,
  "storePhoneNumber": pn,
  "storeBrand": br,
  "storeLocation": lc,
  "storeTime": startTime+" ~ "+endTime,
  "storeImage": [],
  "lefthandStatus": lhs?lhs:false,
  "parkingStatus": ps?ps:false,
  "groupSeatStatus": gs?gs:false,
  "floorScreenStatus": fss?fss:false,
  "storageStatus": ss?ss:false,
  "lessonStatus": ls?ls:false,
  "reserveStatus": rs?rs:false
}

console.log(newData);
try{

  axios.post('/partner/register', newData).then(response => {
  console.log(response);
      
  });
}catch(e){
  console.log(e);
}}





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
                      <Media className="align-items-center">
      
                          <span className="mb-0 text-sm">
                            매장 이름
                          </span>
                      </Media>
                    </th>
                    <td> 
                    <Input
                            className="form-control-alternative"
                            type="text"
                            onChange={onChangeNm}
                            value={nm}
                          />
                       </td>
                    
                  </tr>
                 
         

                <tr>

<th scope="row">
  <Media className="align-items-center">
   
    <Media>
      <span className="mb-0 text-sm">
       매장 소개
      </span>
    </Media>
  </Media>
</th>
<td>
<Input
                        className="form-control-alternative"
                        rows="4"
                        value={inf}
                        onChange={onChangeInf}
                        type="textarea"
                      /> </td>

</tr>





   <tr>

                    <th scope="row">
                      <Media className="align-items-center">
                       
                        <Media>
                          <span className="mb-0 text-sm">
                            전화번호
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                    <Input
                            className="form-control-alternative"
                            type="tel"
                            required
                            onChange={onChangePn}
                            value={pn}
                          /> </td>
                    
                  </tr>
                     <tr>

                    <th scope="row">
                      <Media className="align-items-center">
                       
                        <Media>
                          <span className="mb-0 text-sm">
                           주소
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td> 
                      <Button
                      onClick={()=>{
                        setPostPop(!postPop)
                      }}>
                        주소 검색
                      </Button>
                      {postPop &&
                      <Post address={lc} setAddress={setLc}/>}
                      
                      <Input
                            className="form-control-alternative"
                            type="text"
                            onChange={onChangeLc}
                            value={lc}
                          /> </td>
                    
                  </tr>
                  <tr>

<th scope="row">
  <Media className="align-items-center">
   
    <Media>
      <span className="mb-0 text-sm">
       브랜드
      </span>
    </Media>
  </Media>
</th>
<td>


<UncontrolledDropdown>
                  <DropdownToggle
                    className="btn btn-secondary dropdown-toggle"
                    role="button"
                    type="button"
                    data-toggle="dropdown"
                    
                    >
                    {br? <a>{br}</a>:<a>브랜드 선택</a>}
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu
                  className="dropdown-menu-arrow" right

                  >
                  {brands.map(b=><DropdownItem
 value={b.brandName}
 onClick={e => onDrop(e)}

 >{b.brandName}</DropdownItem>)}
</DropdownMenu>
                </UncontrolledDropdown>

                           </td>

</tr>

<tr>

<th scope="row">
      <span className="mb-0 text-sm">
        운영시간
      </span>

</th>
<td>
<input 
className="btn btn-secondary btn-lg"
type="time"
value={startTime} 
onChange={e=>onTime(e)}
/>
<input 
className="btn btn-secondary btn-lg"
type="time"
value={endTime} 
onChange={e=>onETime(e)}
/>
   </td>

</tr>
<tr>
<th scope="row">
        <span className="mb-0 text-sm">
       방 관리
      </span>
</th>
<td>
<Input style={{display:"inline-block", width:"200px"}}
                            className="form-control-alternative mr-3"
                            type="text"
                            onChange={onChangeRoom}
                            placeholder="방 종류"
                            value={room}
                          /> 
 
 <Input style={{display:"inline-block", width:"100px"}}
                            className="form-control-alternative mr-3"
                            type="number"
                            placeholder="개수"
                            onChange={onChangRoomCount}
                            value={roomCount}
                          /> 
                              <Button
        onClick={e=>onRoom(e)} 
                color="primary">
               방 추가
              </Button>
                <Card className="mt-2">
              <Table>
                <thead>
                <th style={{"width":"5%"}}>방 종류</th><th style={{"width":"5%"}}>개수</th><th>방 현황 (idx)</th>
                </thead>
                <tbody>
                  {roomData? roomData.map(d=>
                     <tr>
                     <th>
                    {d.roomType}
                     </th>
                     <td>
                       {d.roomIdx.length}
                     </td>
                     <td>
                       {d.roomIdx.map( (i,index )=>
                       <span>
                       <div style={{"display":"inline-block"}}className="mr-2">
                         {i}번방
                         <button className="btn btn-outline-secondary btn-sm m-0"
                          value={i}
                          onClick={e=>onDelRoom(e)}
                          >
                          [ - ]</button>  
                       </div>
                        {(index+1)%8==0?
                        <br/>:null}
                      </span>
                       )}
                     </td>
                   </tr>
                    ):null}
               
                </tbody>
              </Table>
              </Card>

                          </td>

</tr>

<tr>
<th scope="row">
        <span className="mb-0 text-sm">
      총 타석 수
      </span>
</th>
<td> {bc} </td>

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
      <span className="ml-3">
       바닥 스크린
      </span>
</th>
<td>
    <S.ReserveStatusContainer>                     
    <S.RadioButton
          type="radio"
           defaultChecked={fss}
           name="fss"
           onClick={e=>setFss(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           defaultChecked={!fss}
           name="fss"
           onClick={e=>setFss(false)}
                 /><h3>X</h3>         
</S.ReserveStatusContainer>

</td>
   </tr>


   <tr >
<th scope="row">
      <span className="ml-3">
      장비 보관 
      </span>
</th>
  <td>  <S.ReserveStatusContainer>                     
  <S.RadioButton
            type="radio"
            defaultChecked={ss}
            name="ss"
            onClick={e=>setSs(true)}
             />
             <h3>O</h3>
               
             <S.RadioButton
            type="radio"
            defaultChecked={!ss}
            name="ss"
            onClick={e=>setSs(false)}   
                   /><h3>X</h3>         
  </S.ReserveStatusContainer>
  </td>
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      주차 시설
      </span>
</th>
  <td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="ps"
           defaultChecked={ps}
           onClick={e=>setPs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="ps"
           defaultChecked={!ps}
           onClick={e=>setPs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer></td> 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
     왼손 전용
      </span>
</th> <td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="lhs"
           defaultChecked={lhs}
           onClick={()=>setLhs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="lhs"
           defaultChecked={!lhs}
           onClick={()=>setLhs(false)}     
/><h3>X</h3>         
</S.ReserveStatusContainer></td> 
   </tr>

   <tr >
<th scope="row">
      <span className="ml-3">
      그룹 석 
      </span>
</th><td> 
  <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           name="gs"
           defaultChecked={gs}
           onClick={e=>setGs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="gs"
           defaultChecked={!gs}
           onClick={e=>setGs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer></td></tr>
<tr>
<th scope="row">
      <span className="ml-3">
      레슨 제공
      </span>
</th>
  <td> <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           defaultChecked={ls}
           name="ls"
           onClick={e=>setLs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
           name="ls"
           defaultChecked={!ls}
           onClick={e=>setLs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer> </td>  
   </tr>
   <tr >
<th scope="row">
      <span className="mb-0 text-sm">
      예약 가능 여부 
      </span>
</th>
  <td> 
    <S.ReserveStatusContainer>                     
<S.RadioButton
          type="radio"
           defaultChecked={rs}
           name="rs"
           onClick={e=>setRs(true)}
           />
           <h3>O</h3>
             
           <S.RadioButton
          type="radio"
          defaultChecked={!rs}
          name="rs"
           onClick={e=>setRs(false)}     
                 /><h3>X</h3>         
</S.ReserveStatusContainer>
</td>  
   </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
         
  
        <Button 
                     onClick={e=>onSubmit(e)}
                color="info"

                >
               정보 수정
              </Button>
        <br/><br/>
        <Row>
        <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">매장 사진 관리</h3>
              </CardHeader>
              <CardBody>
              { data.storeName==null?
            <h5>매장 정보를 먼저 등록해주세요</h5>  
            :
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
                    매장 대표 사진
                  </span>
            
            </th>
            <td>
            <S.Image>

               <img src={mainImage}/>
               </S.Image>

               <Input type="file" class="form-control"
                onChange={e=>setMain(e.target.files[0])}
                />
        <Button
        onClick={e=>onHandleImage(e)} 
                color="info">
               변경
              </Button>



             </td></tr>
             <tr>
<th scope="row">

  <span className="mb-0 text-sm">
    추가 사진
  </span>

</th>
<td>
<S.Image>
{storeImage.map((d)=><Media key={d.imgFileIdx}>
<img width="300px" src={d.storeImage}/>
<Button
value={d.imgFileIdx}
onClick={e=>onDeleteImage(e)}
class="form-control sm">
               삭제
              </Button>
<br/></Media>
)}
       </S.Image> 
       <Input type="file" class="form-control"
                multiple
                onChange={e=>setImages(e.target.files)}
                />
        <Button
        onClick={e=>onHandleImages(e)} 
                color="info">
               사진 추가
              </Button>


</td>
            </tr>
            </tbody>
            </Table>
}            </CardBody>

        </Card>
        </div>
        </Row>
       
       
      </Container>
    </>
  );
};

export default StoreEdit;
