import React, {useState} from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader, CardGroup } from "reactstrap";
import Header from "components/Headers/Header.js";
import style from "views/pages/DashBoard/style";
import {Calendar, momentLocalizer} from 'react-big-calendar'
//import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Dashboard = () => {

  const [datetimer, setDateTimer] = useState("00:00:00");
  const [clocktimer, setClockTimer] = useState("00:00:00");

  const currentDateTimer = () => {
    const date = new Date();
    const year= String(date.getFullYear());
    const month= String(date.getMonth()+1).padStart(2, "0");
    const day= String(date.getDate()).padStart(2, "0");
    setDateTimer(`${year}년 ${month}월 ${day}일`)
  }
  const currentClockTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setClockTimer(`${hours}:${minutes}:${seconds}`)
  }

  const startTimer = () => {
    setInterval(currentDateTimer, 1000)
    setInterval(currentClockTimer, 1000)
  }

  startTimer()

  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment)
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" }
  ];

  return (
    <>
      <Header />
      {/* Page content */}
      <h2>{datetimer}</h2>
      <h1>{clocktimer}</h1>
      <div className="pb-8 pt-5 pt-md-2">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col>
                <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60 h-100">
                  <CardBody className="bg-primary">
                  <div className="col">
                      <CardTitle
                      tag="h1"
                      className="text-uppercase mb-0"  
                    >
                      오늘 예약 및 매장 현황 testtest
                    </CardTitle>
                      </div>
                  </CardBody>
                  <Row>
                  <CardBody>
                    오늘의예약
                  </CardBody>
                  <CardBody>
                    오늘 매출
                  </CardBody>
                  <CardBody>
                    평균 평점
                  </CardBody>
                  </Row>
                  <Row>
                  <CardBody
                  style={{ height: 200 }}>
                    <div>
                      홀 리스트
                    </div>
                  </CardBody>
                  </Row>
                  <Row>
                  <CardBody>
                    <div>
                      예약 관리 바로 가기
                    </div>
                  </CardBody>
                  </Row>
                  <CardBody>
                    <Row>
                    <div className="col">
                      </div>
                      <Col className="col-auto">
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60">
                  <CardBody className="bg-primary">
                  <div className="col">
                      <CardTitle
                      tag="h1"
                      className="text-uppercase mb-0"
                    >
                      관리 메모
                    </CardTitle>
                      </div>
                  </CardBody>
                  <CardBody>
                    <Row>
                      <div>
                        <p>골프채 교체</p>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              </Row>
              <br/>
              <Row classname="row mt-4">
              <Col lg="6" xl="4">
                <Card>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-uppercase text-muted mb-0"
                        >
                          매장 현황
                        </CardTitle>
                        <div>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">97</p>
                          <p className="h3 text-center">즐겨찾기</p>
                          <br/>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">100,000</p>
                          <p className="h3 text-center">이번달 예약</p>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-uppercase text-muted mb-0"
                        >
                          매장 후기
                        </CardTitle>
                        <div>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">924</p>
                          <p className="h3 text-center">전체 후기</p>
                          <br/>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">10</p>
                          <p className="h3 text-center">미 답변 후기</p>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h3"
                          className="text-uppercase text-muted mb-0"
                        >
                          정산 관리
                        </CardTitle>
                        <div>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">D-20</p>
                          <p className="h3 text-center">　</p>
                          <br/>
                          <br/>
                          <p className="h2 text-center font-weight-bold mb-0">5,500,000</p>
                          <p className="h3 text-center">이번달 매출</p>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br/>
          </div>
          <Card className="card-stats mb-4 mb-xl-0 col-md-30 col-sm-60 h-100">
                  <CardBody className="bg-primary">
                  <div className="col">
                      <CardTitle
                      tag="h1"
                      className="text-uppercase mb-0"  
                    >
                      이번 달 예약 현황
                    </CardTitle>
                      </div>
                  </CardBody>
                    <div>

                    </div>
                  <CardBody>
                    <Calendar
                      events={myEventsList}
                      startAccessor="start"
                      endAccessor="end"
                      defaultDate={moment().toDate()}
                      localizer={localizer}
                      style={{ height: 600 }}
                    /> 
                  </CardBody>
                  <CardBody
                    style={{height: 300}}>
                    예약 현황 공간
                  </CardBody>
                </Card>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;