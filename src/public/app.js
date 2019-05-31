'use strict';

const InputForm = ({sendNewUrl}) => {
  const [value, setValue] = React.useState ('');
  return (
    <div className="InputForm">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={e => setValue (e.target.value)}
      />
      <input
        type="submit"
        value="Send url"
        className="btn btn-dark"
        onClick={() => sendNewUrl (value)}
      />
    </div>
  );
};

const TopList = ({rows}) => {
  return (
    <div className="List">
      <table className="table">
        <thead><th>Domain</th><th>Counter</th></thead>
        <tbody>
          {rows.map (r => (
            <tr key={r.id}><td>{r.domain}</td><td>{r.count}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
      list: [],
    };
  }

  async componentDidMount () {
    await this.reloadData ();
  }

  reloadData = async () => {
    this.setState ({loading: true});
    const request = await fetch ('http://localhost:3000/stats');
    const response = await request.json ();
    this.setState ({loading: false, list: response});
  };

  postData = async payload => {
    try {
      const res = await fetch ('http://localhost:3000/stats/track', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (payload),
      });
      if (!res.ok) {
        throw Error (res.statusText);
      }
    } catch (e) {
      this.handleError (e);
    }
  };

  handleError (e) {
    console.error ('Error captured: ', e);
  }

  async saveNewUrl (url) {
    if (url.trim ().length === 0) {
      alert ("Url can't be blank");
    }
    this.setState ({loading: true});
    await this.postData ({url});
    await this.reloadData();
  }

  render () {
    return (
      <div className="AppContainer">
        <InputForm sendNewUrl={url => this.saveNewUrl (url)} />
        <TopList rows={this.state.list}/>
        {this.state.loading && <div className="loader" />}
      </div>
    );
  }
}

const domContainer = document.querySelector ('#root');
ReactDOM.render (React.createElement (App, {}), domContainer);
