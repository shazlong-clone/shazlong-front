// ClickCounter.js
import hoc from './hoc';

const ClickCounter = (props) => {
    return (
        <button onClick={() => props.increateCounter()}> {/* Change "increaseCounter" to "increateCounter" */}
            clicked {props.counter} counter
        </button>
    );
}

export default hoc(ClickCounter);
