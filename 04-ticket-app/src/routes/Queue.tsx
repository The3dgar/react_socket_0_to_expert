import { Card, Col, Divider, List, Row, Tag, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { getLastTickets } from '../helper/getLastTickets';
import { useHiddenMenu } from '../hooks/useHiddenMenu';
import { TicketInterface } from '../interfaces/ticket';

const { Text, Title } = Typography;

export const Queue = () => {
  useHiddenMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<TicketInterface[]>();

  useEffect(() => {
    socket.on('assigned-ticket', (tickets: TicketInterface[]) => {
      setTickets(tickets);
    });

    return () => {
      socket.off('assigned-ticket');
    };
  }, [socket]);

  useEffect(() => {
    getLastTickets().then(setTickets)
  }, []);

  if (!tickets) {
    return <div>No tickets yet</div>;
  }

  return (
    <div>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(i) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag color='volcano'> {i.agent}</Tag>,
                    <Tag color='magenta'> desk: {i.desk}</Tag>,
                  ]}>
                  <Title>Num: {i.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>History</Divider>

          <List
            dataSource={tickets.slice(3)}
            renderItem={(i) => (
              <List.Item>
                <List.Item.Meta
                  title={'Ticket N: ' + i.number}
                  description={
                    <>
                      <Text type='secondary'> In Desk: </Text>
                      <Tag color={'magenta'}>{i.desk}</Tag>
                      <Text type='secondary'> Agent: </Text>
                      <Tag color={'volcano'}>{i.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
