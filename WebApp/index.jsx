import React, {useState} from 'react';
import {
  webViewRender,
  emit,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';
import './example.css';
import png from './Octocat.png';
import {Button} from './button';
import Box from '@mui/material/Box';

const style = {
  width: '100vw',
  height: '100vh',
  margin: 'auto',
  backgroundColor: 'lightblue',
};

const Root = () => {
  const [data, setData] = useState('This is Web');
  useNativeMessage(message => {
    if (message.type === 'hello') {
      setData(message.data);
    }
  });
  return (
    <div style={style}>
      {/* FIXME: None of the components from @mui/material work when used inside
      the Webview React app, when this Box is removed, the app works just fine.
      This issue started popping after React Native 0.72.x. Earlier to this version
      the react-native-react-bridge had no issues rendering any component from 
      @mui/material */}
      <Box
        // Border is added here just to confirm that Box is rendered
        border={10}
        borderColor={"red"}> 
        <div>
          <img src={png} width={100} height={'auto'} />
        </div>
        <textarea value={data} onChange={e => setData(e.target.value)} />
        <div>
          <Button onClick={() => emit({type: 'hi', data: data})}>
            send to React Native
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default webViewRender(<Root />);
