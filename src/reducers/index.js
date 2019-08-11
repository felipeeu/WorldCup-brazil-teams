import {playerReducer} from "./playerReducer";
import {combineReducers} from 'redux';

const Reducers = combineReducers({
    playerState: playerReducer
});
export default Reducers