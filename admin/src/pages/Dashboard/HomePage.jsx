import { Row, Col, Card, Statistic } from 'antd';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const dataPie = [
  { name: 'Total Complaints', value: 400 },
  { name: 'Total Queries', value: 300 },
  { name: 'Solved', value: 300 },
  { name: 'Unsolved', value: 200 },
];

const dataLine = [
  { name: 'Jan', Unsolved: 1000, Solved: 2400, amt: 2400 },
  { name: 'Feb', Unsolved: 1800, Solved: 1398, amt: 2210 },
  { name: 'Mar', Unsolved: 1200, Solved: 9800, amt: 2290 },
  { name: 'Apr', Unsolved: 2278, Solved: 3908, amt: 2000 },
  { name: 'May', Unsolved: 8000, Solved: 4800, amt: 2181 },
  { name: 'Jun', Unsolved: 2239, Solved: 3800, amt: 2500 },
  { name: 'Jul', Unsolved: 1349, Solved: 4300, amt: 2100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Progress"
              value={96}
              valueStyle={{ color: '#234abc' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              valueStyle={{ color: '#19EE90' }}
              prefix={<ArrowUpOutlined />}
              suffix="people"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Solved"
              value={93}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Usage" bordered={false}>
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
          <Card title="Monthly Usage" bordered={false}>
            <LineChart width={400} height={300} data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Unsolved" stroke="#FF0000" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Solved" stroke="#00FF00" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;