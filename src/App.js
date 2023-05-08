import 'rsuite/styles/index.less';
import { Button, Steps } from 'rsuite';
function App() {
  return (
    <div >
    <Steps current={1}>
    <Steps.Item />
    <Steps.Item />
    <Steps.Item />
    <Steps.Item />
  </Steps>
    </div>
  );
}

export default App;
