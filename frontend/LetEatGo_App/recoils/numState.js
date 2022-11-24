import {atom} from 'recoil';

const numState = atom({
  key: 'numState',
  default: 0,
});

export default numState;
