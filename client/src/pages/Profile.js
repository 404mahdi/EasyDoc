import { Button, Form, Input, Row, Col, Card } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../redux/userSlice";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/update-user-profile",
        {
          ...values,
          userId: user._id,
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
        dispatch(setUser(response.data.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {
          userId: params.userId || user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">User Profile</h1>
      <hr />{" "}
      {userData && (
        <Card className="profile-card">
          <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
            <h2 className="mb-4">Personal Information</h2>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Email" disabled />
                </Form.Item>
              </Col>
            </Row>

            <h2 className="mt-4 mb-4">Account Details</h2>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Account Type">
                  <Input
                    placeholder="Account Type"
                    value={
                      userData.isAdmin
                        ? "Administrator"
                        : userData.isDoctor
                        ? "Doctor"
                        : "Patient"
                    }
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Member Since">
                  <Input
                    placeholder="Join Date"
                    value={new Date(userData.createdAt).toLocaleDateString()}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>

            {userData.isDoctor && (
              <div className="mt-3">
                <Button
                  type="dashed"
                  onClick={() => navigate(`/doctor/profile/${userData._id}`)}
                  style={{ marginRight: "15px" }}
                >
                  Edit Doctor Profile
                </Button>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <Button className="primary-button" htmlType="submit">
                Update Profile
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </Layout>
  );
}

export default Profile;
