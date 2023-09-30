import React from 'react';
import { Badge, Button, IconButton, List, Popover, Stack, Whisper } from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';

const renderNoticeSpeaker = ({ onClose, left, top, className }, ref) => {
  const notifications = [
    ['7 hours ago', 'The charts of the dashboard have been fully upgraded and are more visually pleasing.'],
    [
      '13 hours ago',
      'The function of virtualizing large lists has been added, and the style of the list can be customized as required.',
    ],
    ['2 days ago', 'Upgraded React 18 and Webpack 5.'],
    ['3 days ago', 'Upgraded React Suite 5 to support TypeScript, which is more concise and efficient.'],
  ];

  return (
    <Popover ref={ref} className={className} style={{ left, top, width: 300 }} title="Last updates">
      <List>
        {notifications.map((item, index) => {
          const [time, content] = item;
          return (
            <List.Item key={index}>
              <Stack spacing={4}>
                <Badge /> <span style={{ color: '#57606a' }}>{time}</span>
              </Stack>

              <p>{content}</p>
            </List.Item>
          );
        })}
      </List>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button onClick={onClose}>More notifications</Button>
      </div>
    </Popover>
  );
};

function NotificationWhisper() {
  return (
    <Whisper placement="bottomEnd" trigger="click" speaker={renderNoticeSpeaker}>
      <IconButton
        className="bg-transparent"
        icon={
          <Badge content={5}>
            <NoticeIcon style={{ fontSize: 20 }} />
          </Badge>
        }
      />
    </Whisper>
  );
}

export default NotificationWhisper;
