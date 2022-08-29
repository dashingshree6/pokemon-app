import React, {Component} from "react";

class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ["React"],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    this.setState({
      options: value,
    });
  }
  
  handleSubmit(event) {
    let alertTexts = "";
    for (var i = 0; i < this.state.options.length; i++) {
      alertTexts += this.state.options[i] + ", ";
    }
    alertTexts = alertTexts.slice(0, -2); 
    alert("You selected " + alertTexts);
    event.preventDefault();
  }
  
  render() {
    const {pokType} = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}>
        <label>
          <select
            multiple={true}
            value={this.state.options}
            onChange={this.handleChange}            
          >
            { pokType.length && pokType.map(item => (
              <option key={item.name} value={item.name}>{(item.name).toUpperCase()}</option>
            ))}  
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FormSelect;