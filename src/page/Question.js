import React from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';
import { Spinner } from '../components/Spinner.js';
import { api } from '../functions/api.js';

const CHAR = { 1: 'A', 2:'B', 3:'C', 4:'D' }

class Question extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      questions: {}, code: 404, isAnswered: false, answer: {}
    };

  }

  componentWillMount() {
    this.getDate();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getDate() {
    axios.get(api("question"))
      .then((response) => {
        if (response.data.code === 200) {
          this.setState({ questions: response.data.questions });
          this.setState({ code: 200 });
        }
      }).catch((error) => {
        alert(error);
      });
  }

  showData() {
    if (this.state.code === 404) {
      return (<Spinner />);
    } else {
      return this.showQuestion();
    }
  }

  showQuestion() {
    if (this.state.isAnswered === true) {
      let questions = this.state.questions
      let result = []
      questions.map(question => 
        result.push(this.showQuestionAnswered(question, this.state.answer[question.id]))
      );
      return (
        <div className="panel" style={{ minHeight: '600px' }}>
          {result}
          <button type="button" 
            className="btn btn-success btn-col-s-12" 
            onClick={this.refresh}>
            再来一次
          </button>
        </div>
      );

    }else{
      let questions = this.state.questions
      let result = []
      questions.map(question => 
        result.push(this.showQuestionDefault(question))
      );
      return (
        <div className="panel" style={{ minHeight: '600px' }}>
          {result}
          <button type="button" 
            className="btn btn-success btn-col-s-12" 
            onClick={this.answer}>
            查看答案
          </button>
        </div>
      );
    }
  }

  showQuestionDefault(question) {
    return (
      <div key={question.id} onChange={(e) => this.changeSelect(question.id, e)}>
        <p>{question.title}</p>
        <p>
          <input type="radio" name={question.id} value="1"/>
          <label htmlFor="color1" >{question.optionA}</label>
        </p>
        <p>
          <input type="radio" name={question.id} value="2"/>
          <label htmlFor="color1" >{question.optionB}</label>
        </p>
        { question.optionC ?  
          <p>
            <input type="radio" name={question.id} value="3"/>
            <label htmlFor="color1" >{question.optionC}</label>
          </p> : '' }

        { question.optionD ?  
          <p>
            <input type="radio" name={question.id} value="4"/>
            <label htmlFor="color1" >{question.optionD}</label>
          </p> : '' }
        <hr/>
      </div>
    );
  }

  setColor(question, answer, value) {
    if(question.answer !== CHAR[answer] & answer == value){
      return '#C93756'
    } 
    if (question.answer === CHAR[value]) {
      return '#5CB85C'
    }
  }

  showQuestionAnswered(question, answer) {
    return (
      <div key={question.id}>
        <p>{question.title}</p>
        <p style={{backgroundColor : this.setColor(question, answer, 1)}}>
          <input type="radio" name={question.id} value="1" checked={answer == 1}/>
          <label htmlFor="color1" >{question.optionA}</label>
        </p>
        <p style={{backgroundColor : this.setColor(question, answer, 2)}}>
          <input type="radio" name={question.id} value="2" checked={answer == 2}/>
          <label htmlFor="color1" >{question.optionB}</label>
        </p>
        { question.optionC ?  
          <p style={{backgroundColor : this.setColor(question, answer, 3)}}>
            <input type="radio" name={question.id} value="3" checked={answer == 3}/>
            <label htmlFor="color1" >{question.optionC}</label>
          </p> : '' }

        { question.optionD ?  
          <p style={{backgroundColor : this.setColor(question, answer, 4)}}>
            <input type="radio" name={question.id} value="4" checked={answer == 4}/>
            <label htmlFor="color1" >{question.optionD}</label>
          </p> : '' }
        <hr/>
      </div>
    );
  }

  changeSelect (id, e) {
    this.state.answer[id] = e.target.value;
  }

  answer() {
    console.log('answer')
    if (this.state.isAnswered !== true) {
      this.setState({ isAnswered: true });
    } 
  }

  refresh() {
    window.location.reload();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          {this.showData()}
        </div>
      </div>
    );
  }
}


export { Question }
