'use strict';

const InputForm = ({sendNewUrl}) => {
    const [value, setValue] = React.useState("");
    return (
        <div className="InputForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <input type="submit" value="Send url" onClick={() => sendNewUrl(value)}></input>
        </div>
    )
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            list: {}
        }
    }

    async componentDidMount() {
        let newList = await this.reloadData();
        this.setState({list : newList})
    }

    reloadData = async () => {
        this.setState( {loading: true} ); 
        const request = await fetch('http://localhost:3000/stats')
        const response = await request.json();
        this.setState( {loading: false} ); 
    }

    postData = async (payload) => {
        try {
            const res = await fetch('http://localhost:3000/stats/track',{
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(!res.ok) {
                throw Error(res.statusText);
            }
        } catch(e) {
            this.handleError (e);
        }
    }

    handleError (e) {
        console.error("Error captured: ", e);
    }

    async saveNewUrl (url) {
        if(url.trim().length === 0) {
            alert('Url can\'t be blank');
        }
        this.setState( {loading: true} ); 
        await this.postData({url})
        this.setState( {loading: false} ); 
    }

    render() {
        return (
            <div className="AppContainer">
                <InputForm sendNewUrl={(url) => this.saveNewUrl(url)}/> {this.state.loading && <div className="loader"/>}
            </div>
        )
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App, {}), domContainer);