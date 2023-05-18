import React from 'react'
import { Fab, Icon } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface ChildProps {
  onClick: () => void;
}
const ClientButton : React.FC<ChildProps> = ({ onClick }) => {
  return (
    <div style={{ position: 'absolute', top: '60px', right: '100px' }}>
      <Fab color={'primary'} onClick={onClick}>
        <QuestionAnswerIcon />
      </Fab>
    </div>
  );
}

export default ClientButton;
