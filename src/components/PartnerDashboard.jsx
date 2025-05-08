import React from 'react';
import { Typography, Row, Col, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const PartnerDashboard = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f5ff' }}>
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Card
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '30px',
              textAlign: 'center',
            }}
          >
            <Title level={2} style={{ color: '#2f54eb' }}>
              🤝 Partner With IWC
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
              Welcome to the IWC Partner Info Page! We're excited about your interest in working with us. As a partner, you’ll gain exclusive access to insights, resources, and a community of professionals focused on innovation and growth. 🌍
            </Paragraph>

            <Divider />

            <Title level={3} style={{ color: '#52c41a' }}>💡 Why Partner With Us?</Title>
            <Paragraph>
              ✔️ Access to premium services and data insights <br />
              ✔️ Priority support and account management <br />
              ✔️ Co-branding and co-marketing opportunities <br />
              ✔️ Increased visibility through our platform <br />
              ✔️ Participate in joint ventures and innovation projects
            </Paragraph>

            <Divider />

            <Title level={3} style={{ color: '#fa8c16' }}>📈 Partner Benefits</Title>
            <Paragraph>
              💼 Business Growth: Scale your offerings with IWC’s robust client base. <br />
              🧠 Knowledge Sharing: Attend exclusive workshops and industry briefings. <br />
              🔐 Security & Compliance: Enjoy enterprise-grade infrastructure and secure systems. <br />
              🎯 Targeted Campaigns: Run optimized partner campaigns for your niche.
            </Paragraph>

            <Divider />

            <Title level={3} style={{ color: '#13c2c2' }}>📬 How to Get Started</Title>
            <Paragraph>
              Simply reach out to our Partnerships Team at <Text underline>5755 9901</Text> or visit our <a href="/contact">Contact Page</a>. <br />
              We look forward to collaborating with you and building something great together! 🚀
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerDashboard;
