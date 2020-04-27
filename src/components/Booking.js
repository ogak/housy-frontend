import React from "react";
import QRCode from "qrcode.react";
import { Row, Col } from "reactstrap";
import logo from "../assets/img/icon.svg";

import { connect } from "react-redux";
import { getDetailOrder } from "../_actions/detail-order";

class Booking extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    // get id from parent component
    const id = this.props.data;

    this.props.getDetailOrder(id);
  }

  render() {
    const { data: booking, loading, error } = this.props.booking;

    if (error) return <h1>Error</h1>;
    if (loading)
      return (
        <div id="loader-wrapper">
          <div id="loader"></div>
        </div>
      );

    return (
      <>
        {booking && booking.house && (
          <div className="card pt-3 p-2 mb-3">
            <div className="d-flex px-3 justify-content-between align-items-top">
              <img
                style={{ width: "100px", height: "40px" }}
                src={logo}
                alt=".."
              />
              <div className="text-right">
                <h5 className="mb-0">INVOICE</h5>
                <small className="text-muted mb-2">{booking.createdAt}</small>
              </div>
            </div>
            <Row>
              <Col lg={4} md={12} sm={12} className="mb-3">
                <div className="p-3">
                  <h4>House {booking.house.name}</h4>
                  <p className="small mb-0">{booking.house.address}</p>
                  <div className="mt-3 bold badge badge-success">
                    {booking.status}
                  </div>
                </div>
              </Col>
              <Col lg={5} md={12} sm={12} className="p-0">
                <div className="p-3 timeline-wrapper">
                  <ul className="StepProgress">
                    <li className="StepProgress-item is-done">
                      <div className="d-flex">
                        <div className="mr-4">
                          <div className="bold">Check-in</div>
                          <div>{booking.checkin}</div>
                        </div>
                        <div>
                          <div className="bold">Amenities</div>
                          <div>
                            {booking.house.amenities.map((amn, i) => (
                              <small key={i}>{amn}, </small>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="StepProgress-item is-done">
                      <div className="d-flex">
                        <div className="mr-4">
                          <div className="bold">Check-out</div>
                          <div>{booking.checkout}</div>
                        </div>
                        <div>
                          <div className="bold">Type of Rent</div>
                          <div>{booking.house.typeRent}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col>
                <div className="p-3">
                  <div className="text-center">
                    <div>
                      <QRCode
                        size={256}
                        style={{ height: "80px", width: "80px" }}
                        value={booking.createdAt}
                      />
                    </div>
                    <h4 className="mt-3">TYE938</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="px-3">
              <table className="table table-striped table-bordered table-sm">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>User</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{booking.user.fullName}</td>
                    <td>{booking.user.gender}</td>
                    <td>{booking.user.phone}</td>
                    <td>
                      Long time rent :
                      <b className="text-danger float-right">
                        {booking.house.typeRent}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      Total :
                      <b className="text-danger float-right">
                        {booking.house.price}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    booking: state.detailOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailOrder: id => dispatch(getDetailOrder(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
