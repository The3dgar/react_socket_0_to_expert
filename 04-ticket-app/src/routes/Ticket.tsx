import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import { useHiddenMenu } from '../hooks/useHiddenMenu';
import { SocketContext } from '../context/SocketContext';
import { useContext, useState } from 'react';
import { TicketInterface } from '../interfaces/ticket';
const { Title, Text } = Typography;

export const Ticket = () => {
  useHiddenMenu(true);

  const { socket } = useContext(SocketContext);

  const [ticket, setTicket] = useState<TicketInterface>();

  const onClick = () => {
    socket.emit('request-ticket', null, (ticket: TicketInterface) => {
      setTicket(ticket);
    });
  };
  return (
    <>
      <Row>
        <Col span={14} offset={6}>
          <Title level={3}>Press the button for create a new ticket</Title>
          <Button
            type='primary'
            shape='round'
            icon={<DownloadOutlined />}
            size='large'
            onClick={onClick}>
            Press me
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col span={14} offset={6}>
            <Text>Your number:</Text>
            <br />
            <Text type='success' style={{ fontSize: 55 }}>
              {ticket?.number}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};
