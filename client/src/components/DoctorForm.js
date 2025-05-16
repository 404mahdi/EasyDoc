import { Button, Col, Form, Input, Row, TimePicker, message } from "antd";
import moment from "moment";
import React from "react";

function DoctorForm({ onFinish, initivalValues }) {
  // Function to check if time is within allowed slots (30 minute increments)
  const validateTimeSlots = (_, value) => {
    if (!value || !value[0] || !value[1]) {
      return Promise.reject(new Error("Please select start and end time"));
    }

    const startTime = value[0];
    const endTime = value[1];

    // Check if start time minutes are on a 30-minute boundary (0 or 30)
    const startMinutes = startTime.minutes();
    if (startMinutes !== 0 && startMinutes !== 30) {
      return Promise.reject(
        new Error("Start time must be on the hour or half hour")
      );
    }

    // Check if end time minutes are on a 30-minute boundary (0 or 30)
    const endMinutes = endTime.minutes();
    if (endMinutes !== 0 && endMinutes !== 30) {
      return Promise.reject(
        new Error("End time must be on the hour or half hour")
      );
    }

    // Check if end time is after start time
    if (endTime.isSameOrBefore(startTime)) {
      return Promise.reject(new Error("End time must be after start time"));
    }

    // Check if the time range is between 6 AM and 10 PM (reasonable working hours)
    const minTime = moment().hour(6).minute(0).second(0);
    const maxTime = moment().hour(22).minute(0).second(0);

    if (startTime.isBefore(minTime)) {
      return Promise.reject(
        new Error("Start time cannot be earlier than 6:00 AM")
      );
    }

    if (endTime.isAfter(maxTime)) {
      return Promise.reject(
        new Error("End time cannot be later than 10:00 PM")
      );
    }

    return Promise.resolve();
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [
            moment(initivalValues?.timings[0], "HH:mm"),
            moment(initivalValues?.timings[1], "HH:mm"),
          ],
        }),
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Cunsultation"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Cunsultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[
              {
                required: true,
                message: "Please select your available time slot",
              },
              { validator: validateTimeSlots },
            ]}
            tooltip="Please select time slots in 30-minute increments between 6:00 AM and 10:00 PM"
          >
            <TimePicker.RangePicker
              format="HH:mm"
              minuteStep={30}
              hideDisabledOptions={true}
              disabledHours={() => [
                ...Array(6).keys(),
                ...Array(2)
                  .fill()
                  .map((_, i) => i + 22),
              ]}
              use12Hours
            />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
