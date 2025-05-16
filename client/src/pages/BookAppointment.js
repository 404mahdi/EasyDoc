import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  TimePicker,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  // Function to check if a time is within doctor's available hours
  const isTimeWithinDoctorHours = (selectedTime) => {
    if (!doctor || !doctor.timings || doctor.timings.length < 2) return false;

    // Get doctor's start and end times
    const doctorStartTime = moment(doctor.timings[0], "HH:mm");
    const doctorEndTime = moment(doctor.timings[1], "HH:mm");

    // Compare with selected time
    const timeToCheck = moment(selectedTime, "HH:mm");
    return (
      timeToCheck.isSameOrAfter(doctorStartTime) &&
      timeToCheck.isBefore(doctorEndTime)
    );
  };

  // Function to validate if time is at 30-minute intervals
  const validateTimeSlot = (timeString) => {
    const selectedTime = moment(timeString, "HH:mm");
    const minutes = selectedTime.minutes();
    return minutes === 0 || minutes === 30;
  };

  // Function to disable times outside doctor hours or not at 30-min intervals
  const disabledTime = () => {
    if (!doctor || !doctor.timings) return {};

    const doctorStart = moment(doctor.timings[0], "HH:mm");
    const doctorEnd = moment(doctor.timings[1], "HH:mm");

    return {
      disabledHours: () => {
        // Create an array of disabled hours
        let disabledHours = [];
        for (let i = 0; i < 24; i++) {
          if (i < doctorStart.hours() || i > doctorEnd.hours()) {
            disabledHours.push(i);
          }
          // Edge case for end hour
          if (i === doctorEnd.hours() && doctorEnd.minutes() === 0) {
            disabledHours.push(i);
          }
        }
        return disabledHours;
      },
      disabledMinutes: (hour) => {
        // Only allow 0 and 30 minutes
        let disabledMinutes = [];
        for (let i = 0; i < 60; i++) {
          if (i !== 0 && i !== 30) {
            disabledMinutes.push(i);
          }

          // Disable minutes for edge cases
          if (hour === doctorStart.hours() && i < doctorStart.minutes()) {
            disabledMinutes.push(i);
          }

          if (hour === doctorEnd.hours() && i >= doctorEnd.minutes()) {
            disabledMinutes.push(i);
          }
        }
        return disabledMinutes;
      },
    };
  };

  // Filter for available dates (disable past dates)
  const disabledDate = (current) => {
    // Can't select days before today
    return current && current < moment().startOf("day");
  };

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerCunsultation}
              </p>
              <p>
                <b>Website : </b>
                {doctor.website}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={disabledDate}
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  minuteStep={30}
                  showNow={false}
                  hideDisabledOptions={true}
                  onChange={(value) => {
                    setIsAvailable(false);
                    if (value) {
                      const timeString = moment(value).format("HH:mm");

                      // Check if time is within doctor's hours
                      const doctorStartTime = moment(
                        doctor.timings[0],
                        "HH:mm"
                      );
                      const doctorEndTime = moment(doctor.timings[1], "HH:mm");
                      const selectedTime = moment(timeString, "HH:mm");

                      if (
                        selectedTime.isBefore(doctorStartTime) ||
                        selectedTime.isSameOrAfter(doctorEndTime)
                      ) {
                        toast.error(
                          "Selected time is outside doctor's working hours"
                        );
                        return;
                      }

                      // Check if time is at 30-minute intervals
                      const minutes = selectedTime.minutes();
                      if (minutes !== 0 && minutes !== 30) {
                        toast.error(
                          "Please select appointment time at hour or half-hour intervals"
                        );
                        return;
                      }

                      setTime(timeString);
                    }
                  }}
                  placeholder={`Select time between ${doctor.timings[0]} - ${doctor.timings[1]}`}
                  disabledTime={() => {
                    const doctorStart = moment(doctor.timings[0], "HH:mm");
                    const doctorEnd = moment(doctor.timings[1], "HH:mm");

                    return {
                      disabledHours: () => {
                        let disabledHours = [];
                        for (let i = 0; i < 24; i++) {
                          if (
                            i < doctorStart.hours() ||
                            i > doctorEnd.hours()
                          ) {
                            disabledHours.push(i);
                          }
                        }
                        return disabledHours;
                      },
                      disabledMinutes: (hour) => {
                        let disabledMinutes = [];
                        for (let i = 0; i < 60; i++) {
                          if (i !== 0 && i !== 30) {
                            disabledMinutes.push(i);
                          }

                          if (
                            hour === doctorStart.hours() &&
                            i < doctorStart.minutes()
                          ) {
                            disabledMinutes.push(i);
                          }

                          if (
                            hour === doctorEnd.hours() &&
                            i >= doctorEnd.minutes()
                          ) {
                            disabledMinutes.push(i);
                          }
                        }
                        return disabledMinutes;
                      },
                    };
                  }}
                />
                {!isAvailable && date && time && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
