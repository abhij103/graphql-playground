import * as React from 'react'
import ColumnDoc from './ColumnDoc'
import SearchResults from './SearchResults'
import GraphDocsRoot from './GraphDocsRoot'
import SearchBox from './SearchBox'
import { styled } from '../../../styled'

export interface Props {
  searchValue: string
  schema: any
  width: number
  handleSearch: (value: string) => void
  sessionId: string
}

export default class RootColumn extends React.PureComponent<Props, {}> {
  componentDidMount(){
    document.getElementById("eg").innerText=localStorage.getItem("example");
  }
  myFunction() {
    /* Get the text field */
    var range = document.createRange();
    range.selectNode(document.getElementById("eg"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
   // alert("Example has been Copied!!!");
   document.getElementById("b1").style.backgroundColor="Red";
   document.getElementById("textcopy").style.backgroundColor="#42f563";
    document.getElementById("textcopy").innerText="Query copied to clipboard"
  }
  render() {
    const { searchValue, schema, width, sessionId, handleSearch } = this.props
    return (
      <div>
      <ColumnDoc width={width} overflow={false}>
        <SearchBox onSearch={handleSearch} />
        <Column>
          {searchValue && (
            <SearchResults
              searchValue={searchValue}
              schema={schema}
              level={0}
              sessionId={sessionId}
            />
          )}
          {!searchValue && (
            <GraphDocsRoot schema={schema} sessionId={sessionId} />
          )}
        </Column>
      </ColumnDoc>
      <p style={{marginLeft:"30px"}}><em><b>EXAMPLE TO START🏁:</b></em><br/><br/></p>
      <div id="eg" style={{marginLeft:"25px",padding:"5px"}}>
      </div>
      <button id="b1" onClick={this.myFunction} style={{cursor:"pointer",marginLeft:"30px",backgroundColor:"#42f563",border:"3px solod black"}}>Copy Example 📋</button>
     <br/><br/> <div id="textcopy" style={{marginLeft:"25px"}}></div>
      </div>
    )
  }
}

const Column = styled.div`
  overflow: auto;
`
