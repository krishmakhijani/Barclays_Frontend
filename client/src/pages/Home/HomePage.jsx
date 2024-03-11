import { Row, Col, Card, Statistic } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const dataPie = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 300 },
  { name: 'Category D', value: 200 },
];

const dataLine = [
  { name: 'Jan', uv: 1000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 1800, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 1200, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2278, pv: 3908, amt: 2000 },
  { name: 'May', uv: 8000, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2239, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 1349, pv: 4300, amt: 2100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Revenue"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix="$"
              suffix="USD"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
              suffix="people"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Downloads"
              value={93}
              valueStyle={{ color: '#234abc' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Sales Distribution" bordered={false}>
            <PieChart width={400} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={dataPie}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Monthly Sales" bordered={false}>
            <LineChart width={400} height={300} data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
