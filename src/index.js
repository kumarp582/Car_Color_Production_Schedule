import React from "react";
import ReactDOM from "react-dom";

import './index.css';


class CalculateColorDetails extends React.Component {
    constructor(props) {
        super(props);
        this.colorList = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black'];
        this.dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 
        this.state = {
            selectedDate: this.props.selectedDay,
            listData: [],
            tableData: [],
            dayOffs: []
        }
    }

    componentDidMount() {
        this.calculateList()
    }

    calculateList = (event) => {
        this.setState((state) => ({
                listData: [],
                tableData: []
            }),
        );

        var arrayValuesForCalender = [];
        let count = 1;
        let initialValue = event? +event.target.value: this.state.selectedDate;
        let dayValue = initialValue;
        let dayOffs = [];

        while(count !== 31) {
            if(!((initialValue % 5 === 0 && initialValue / 5 === 1) || (initialValue % 6 === 0 && initialValue / 6 === 1))) {
                arrayValuesForCalender.push(count)
            } else {
                dayOffs.push(count);
            }
            count = count + 1;
            initialValue = (initialValue + 1) % 7;
        }

        this.setState((state) => ({
                listData: arrayValuesForCalender,
                selectedDate: dayValue,
                dayOffs: dayOffs
            }), () => {
                console.log(this.state.listData)
                this.createTable();
            }
        );
    }

    addToTheTable(children) {

        this.setState((state) => ({
            tableData: this.state.tableData.concat(<tr key={this.state.tableData.length}>{children}</tr>)
        }))
    }

    createTable = () => {

        const pStyle = {
            textAlign: "center"
        };
        
        var tableData = [];
        let children = [];


        for(let index=0; index < this.state.listData.length; index++) {

            children.push(<td style={pStyle} key={index}>{this.state.listData[index]}</td>);

            if(children.length === 7 || index === this.state.listData.length - 1) {
                tableData.push(<tr key={tableData.length}>{children}</tr>)
                children = [];
            }
        }

        this.setState((state) => ({
            tableData: tableData
        }))
      }



    render() {
        return(
            <div style={{"marginBottom": "50px"}}>
                {this.props.render(this.state)}

                <table style={{"marginTop": "30px"}}>
                    <thead>
                        <tr>
                            {this.colorList.map((color, index) => {

                                    const pStyle = {
                                        backgroundColor: color.toLowerCase(),
                                        width: '180px',
                                        color: 'white',
                                        textAlign: "center"
                                    };

                                    return <td style={pStyle} key={index}>{color}</td>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData}
                    </tbody>
                </table>

                <h2>List of Day Offs: </h2><span>{this.state.dayOffs.join(',')}</span>
            </div>
        )
    }
}


// Extended Component to configure the first Day of the Month


class CalculateColorDetailsDynamic extends React.Component {
    constructor(props) {
        super(props);
        this.colorList = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black'];
        this.dayList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
 
        this.state = {
            selectedDate: this.props.selectedDay,
            listData: [],
            tableData: [],
            dayOffs: []
        }
    }

    componentDidMount() {
        this.calculateList()
    }

    calculateList = (event) => {
        this.setState((state) => ({
                listData: [],
                tableData: []
            }),
        );

        var arrayValuesForCalender = [];
        let count = 1;
        let initialValue = event? +event.target.value: this.state.selectedDate;
        let dayValue = initialValue;
        let dayOffs = [];

        while(count !== 31) {
            if(!((initialValue % 5 === 0 && initialValue / 5 === 1) || (initialValue % 6 === 0 && initialValue / 6 === 1))) {
                arrayValuesForCalender.push(count)
            } else {
                dayOffs.push(count);
            }
            count = count + 1;
            initialValue = (initialValue + 1) % 7;
        }

        this.setState((state) => ({
                listData: arrayValuesForCalender,
                selectedDate: dayValue,
                dayOffs: dayOffs
            }), () => {
                console.log(this.state.listData)
                this.createTable();
            }
        );
    }

    addToTheTable(children) {

        this.setState((state) => ({
            tableData: this.state.tableData.concat(<tr key={this.state.tableData.length}>{children}</tr>)
        }))
    }

    createTable = () => {
        
        var tableData = [];
        let children = [];

        const pStyle = {
            textAlign: "center"
        };
        


        for(let index=0; index < this.state.listData.length; index++) {

            children.push(<td style={pStyle} key={index}>{this.state.listData[index]}</td>);

            if(children.length === 7 || index === this.state.listData.length - 1) {
                tableData.push(<tr key={tableData.length}>{children}</tr>)
                children = [];
            }
        }

        this.setState((state) => ({
            tableData: tableData
        }))
      }



    render() {
        return(
            <div style={{"marginTop": "30p"}}>
                {this.props.render(this.state)}
                <select value={this.state.selectedDate} onChange={this.calculateList} >

                    {this.dayList.map((color, index) => {
                            return <option key={index} value={index}>{color}</option>
                        })
                    }
                </select>

                <table style={{"marginTop": "30px"}}>
                    <thead>
                        <tr>
                            {this.colorList.map((color, index) => {

                            const pStyle = {
                                backgroundColor: color.toLowerCase(),
                                width: '180px',
                                color: 'white'
                            };

                                    return <td style={pStyle} key={index}>{color}</td>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableData}
                    </tbody>
                </table>

                <h2>List of Day Offs: </h2><span>{this.state.dayOffs.join(',')}</span>
            </div>
        )
    }
}

ReactDOM.render((
    <div>
        <h1>Day Color Selector</h1>

        <CalculateColorDetails selectedDay="0" render={() => (
            <label>Select the First Day of the Month: Monday</label>
        )}></CalculateColorDetails><hr></hr>

        <p><b>We are extending the functionality below</b>, so that user can configure the start day of the month (Monday, Tuesday...)</p>
        <p>We are assuming that the first production day of the company starts with the production of Red Color Car</p>
        <p>And based on the assumption, the user can configure any day as the first day of the Current Month</p><br></br><br></br>

        <CalculateColorDetailsDynamic selectedDay="1" render={() => (
            <label>Select the First Day of the Month: </label>
        )}></CalculateColorDetailsDynamic>
    </div>), document.getElementById("carProductionSchedule"));