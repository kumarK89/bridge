import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import { connect, Provider } from 'react-redux'
import CreateSurveyContainer from '../../../../src/containers/survey/createSurvey/CreateSurveyContainer.js';
import SurveyTemplateComponent from '../../../../src/components/survey/SurveyTemplateComponent'
