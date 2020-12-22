import * as React from 'react';
/*import PropTypes from 'prop-types';*/
export interface Props {
  options: string[]
}

export interface State {
  activeOption:number
  filteredOptions: string[]
  showOptions:boolean
  userInput:string
}
export class Autocomplete extends React.Component<Props & State>{
/*  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  }; */
  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ''
  };
  onChange = (e) => {
    console.log('onChanges');

   /* const { options } = this.props.options; */
    const userInput = e.currentTarget.value;

    const filteredOptions = this.props.options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    this.setState({
    userInput: e.currentTarget.innerText,
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
     
    });
   /* const vm = this;
        setTimeout(function () {
            vm.props.parentCallback(vm.state.userInput);
          //  document.getElementById("sbar").value=""
          //e.preventDefault();
        },100) */
        
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
   /*   const vm = this;
      setTimeout(function () {
          vm.props.parentCallback(vm.state.userInput);
        //  document.getElementById("sbar").value=""
        //e.preventDefault();
      },100) */

    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
      
                <li className={className} key={optionName} onClick={onClick} style={{border:"1px solid black",zIndex:101,position:"relative"}}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
          id="sbar"
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder="enter api name"
          />
        </div><br/><br/>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
