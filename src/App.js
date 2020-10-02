import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['','January', 'February','March', 'April','May'],
      selectedOption: '',
      transactions: {
        'January': [
          {id:'1',name:'Purchase 1',price: 100},
          {id:'2',name:'Purchase 2',price: 200},
          {id:'3',name:'Purchase 3',price: 300}
        ],
        'February': [
          {id:'1',name:'Purchase 1',price: 400},
          {id:'2',name:'Purchase 2',price: 500},
          {id:'3',name:'Purchase 3',price: 600}
      ],
      'March': [
        {id:'1',name:'Purchase 1',price: 700},
        {id:'2',name:'Purchase 2',price: 800},
        {id:'3',name:'Purchase 3',price: 900}
      ],
        'April': [
          {id:'1',name:'Purchase 1',price: 10},
          {id:'2',name:'Purchase 2',price: 30},
          {id:'3',name:'Purchase 3',price: 40}
        ],
        'May': [
          {id:'1',name:'Purchase 1',price: 10},
          {id:'2',name:'Purchase 2',price: 10},
          {id:'3',name:'Purchase 3',price: 10}
        ]
      }
    };
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  getTotal = (transaction) => {
    var transactionTotal = transaction.reduce(function(prev, cur) {
      return prev + cur.price;
    }, 0);

    return transactionTotal;
  }

  getRewards= (transaction) => {
    const transactionTotal = this.getTotal(transaction);    
    let varPoints=0;
    // Transaction  should be greater then  100 $
    if(transactionTotal>=100){
      varPoints = transactionTotal - 100;
      varPoints = varPoints*2; // 2 point for each dollar over 100
      varPoints = varPoints + 50;
    } else if(transactionTotal >=50){
      // plus 1 point for every dollar spent over $50 in each transaction 
      varPoints = transactionTotal - 50;
    }
    
    return varPoints;
  }

  render() {
    return (
      <div className="App">
        <div className="actions">
        <h3> Rewards Program</h3>
        <div className="month-select">
          <label>Select Month</label>
          <select name='selectedOption' onChange={this.handleChange}>
          {this.state.options.map(i => i === this.state.selectedOption ? (
              <option value={i} defaultValue key={i}>
                {i}
              </option>
              ) : (<option value={i}  key={i}>{i}</option>) )}
            </select>
        </div>
        </div>
      <div className="table">
        <div className="table-header">
          <div className="header__item"><span className="filter__link" >Item id</span></div>
          <div className="header__item"><span className="filter__link filter__link--number" >Item Name</span></div>
          <div className="header__item"><span className="filter__link filter__link--number" >Price</span></div>
        </div>
        <div className="table-content">	
        { !!this.state.selectedOption &&
          this.state.transactions[this.state.selectedOption].map(function(transaction){
            return (
              <div className="table-row" key={transaction.id}>		
                <div className="table-data">{transaction.id}</div>
                <div className="table-data">{transaction.name}</div>
                <div className="table-data">{transaction.price}</div>
              </div>              
            );
          })          
        }
         {  !!this.state.selectedOption &&
           <div className="table-row">		
           <div className="table-data"><strong>Rewards Points:</strong>{this.getRewards(this.state.transactions[this.state.selectedOption])}</div>
           <div className="table-data"></div>
           <div className="table-data"><strong>Total:</strong>${this.getTotal(this.state.transactions[this.state.selectedOption])}</div>
         </div>
         }
          { !this.state.selectedOption &&
           <div className="table-row">		
           <div className="table-data"></div>
           <div className="table-data"><strong>Please select Month</strong></div>
           <div className="table-data"></div>
         </div>
         }
        </div>	
      </div>
    </div>
    );
  }
}


export default App;
