import { useContext, useEffect, useState } from 'react';
import { CloseCircleFilled, RightOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserStorage } from '../helper/getUserStorage';
import { useHiddenMenu } from '../hooks/useHiddenMenu';
import { SocketContext } from '../context/SocketContext';
import { TicketInterface } from '../interfaces/ticket';

const { Title, Text } = Typography;

export const Desk = () => {
  useHiddenMenu(false);
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketInterface>();
  const [user] = useState(getUserStorage());
  const { socket } = useContext(SocketContext);

  const closeDesk = () => {
    localStorage.clear();
    navigate('/agent', { replace: true });
  };

  const nextTicket = () => {
    socket.emit('attend-ticket', user, (ticket: TicketInterface) => {
      setTicket(ticket);
    });
  };

  useEffect(() => {
    if (!user.agent || !user.desk) {
      navigate('/agent');
    }
  }, []);

  return (
    <>
      <Row>
        <Col span={18} sm={{span: 20}}>
          <Title level={2}>{user.agent}</Title>
          <Text>You are in desk: </Text>
          <Text type='success'>{user.desk}</Text>
        </Col>

        <Col span={4}style={{ justifyContent: 'right' }}>
          <Button type='primary' danger shape='round' onClick={closeDesk}>
            <CloseCircleFilled />
            Close
          </Button>
        </Col>
      </Row>

      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>You are attending ticket number: </Text>
            <Text type='danger' style={{ fontSize: 30 }}>
              {ticket.number}
            </Text>
          </Col>
        </Row>
      )}

      <Row>
        <Col offset={16} span={6} sm={{offset: 18}}>
          <Button type='primary' shape='round' onClick={nextTicket}>
            <RightOutlined />
            Next ticket
          </Button>
        </Col>
      </Row>
    </>
  );
};
