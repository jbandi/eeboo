import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Tabs, Tab, Button } from 'react-bootstrap';

import { QuestionTab } from './QuestionTab';
import { ContextTab } from './ContextTab';
import { RoleTab } from './RoleTab';


const QuestionaireDetail = props => (
  <div>
    <Panel header="Fragebogen">
      <Tabs defaultActiveKey={1} id="questionaire-tabs">
        <Tab eventKey={1} title="Fragen">
          <QuestionTab
            questionaire={props.questionaire}
            procId={props.procId}
          />
        </Tab>
        <Tab eventKey={2} title="Themen"><ContextTab questionaire={props.questionaire} /></Tab>
        <Tab eventKey={3} title="Rollen"><RoleTab questionaire={props.questionaire} /></Tab>
      </Tabs>
      <p align="right">
        <Button onClick={() => props.save(props.procId)}>save</Button>
      </p>
    </Panel>
  </div>
);

QuestionaireDetail.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    questions: PropTypes.shape({}),
  }).isRequired,
  procId: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default QuestionaireDetail;
